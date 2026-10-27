#!/usr/bin/env python3
"""
Script de sincronização do Informativo de Voos (SITAER) da Plataforma P-53 (código 6228).
Executado periodicamente pelo GitHub Actions.
"""

import html as html_lib
import json
import os
import re
import ssl
import subprocess
import tempfile
import time
import urllib.request
from datetime import datetime, timezone, timedelta

CAMINHO_JSON = "voos_data.json"
CODIGO_PLATAFORMA_P53 = "6228"
NOME_PLATAFORMA = "P-53"
URL_SITAER_SERVICE = "https://sitaer-infovoo.petrobras.com.br/InformativoPlataformaService.aspx"
URL_SITAER_BASE = "https://sitaer-infovoo.petrobras.com.br/"

OPENSSL_CNF_CONTENT = """openssl_conf = openssl_init

[openssl_init]
ssl_conf = ssl_sect

[ssl_sect]
system_default = system_default_sect

[system_default_sect]
Options = UnsafeLegacyRenegotiation
CipherString = DEFAULT@SECLEVEL=1
"""


def limpar_texto(texto):
    if not texto:
        return ""
    texto_decodificado = html_lib.unescape(texto)
    texto_sem_tags = re.sub(r"<[^>]+>", "", texto_decodificado)
    texto_limpo = texto_sem_tags.replace("\xa0", " ").strip()
    return re.sub(r"\s+", " ", texto_limpo)


def extrair_campo(bloco_html, classe_css):
    padrao = rf'<td[^>]*class=["\'][^"\']*\b{re.escape(classe_css)}\b[^"\']*["\'][^>]*>(.*?)</td>'
    m = re.search(padrao, bloco_html, re.DOTALL | re.IGNORECASE)
    return limpar_texto(m.group(1)) if m else ""


def parsear_html_sitaer(conteudo_html):
    voos = []
    if not conteudo_html or "Não existem dados para exibição" in conteudo_html:
        return voos

    partes = re.split(
        r'<table[^>]*class=["\'][^"\']*\btableVoo\b[^"\']*["\'][^>]*>',
        conteudo_html,
        flags=re.IGNORECASE,
    )
    tabelas = partes[1:] if len(partes) > 1 else []

    for idx, bloco in enumerate(tabelas, 1):
        m_img = re.search(r'<img[^>]*src=["\']([^"\']*GetCompanyImage\.aspx\?codEmpresa=(\d+))["\']', bloco, re.IGNORECASE)
        cod_empresa = m_img.group(2) if m_img else ""
        logo_empresa = f"{URL_SITAER_BASE}GetCompanyImage.aspx?codEmpresa={cod_empresa}" if cod_empresa else ""

        numero_voo = extrair_campo(bloco, "numeroVooDetalhe")
        prefixo = extrair_campo(bloco, "prefixoAeronave")
        modelo = extrair_campo(bloco, "modelo")
        rota = extrair_campo(bloco, "rota")
        status = extrair_campo(bloco, "newStatus")
        horario_programado = extrair_campo(bloco, "dataHoraProgramacaoSAP")
        previsao_decolagem = extrair_campo(bloco, "previsaodecolagem")
        horario_real = extrair_campo(bloco, "newDecolagem")
        previsao_retorno = extrair_campo(bloco, "newPrevisaoretorno")
        observacao = extrair_campo(bloco, "newObservacaoSemPax") or extrair_campo(bloco, "newObservacao")

        if horario_real == "00:00":
            horario_real = ""

        if numero_voo or prefixo or rota or status:
            voos.append({
                "id": idx,
                "numero_voo": numero_voo,
                "prefixo": prefixo,
                "modelo": modelo,
                "rota": rota or NOME_PLATAFORMA,
                "status": status or "Previsto",
                "horario_programado": horario_programado,
                "previsao_decolagem": previsao_decolagem or "--:--",
                "horario_real": horario_real or "--:--",
                "previsao_retorno": previsao_retorno or "--:--",
                "observacao": observacao,
                "cod_empresa": cod_empresa,
                "logo_empresa": logo_empresa,
            })

    return voos


def tentar_urllib_sitaer(post_data):
    """Fallback nativo em Python com SSL permissivo e suporte a Legacy Renegotiation (OpenSSL 3)."""
    try:
        ctx = ssl.create_default_context()
        ctx.check_hostname = False
        ctx.verify_mode = ssl.CERT_NONE
        ctx.options |= getattr(ssl, "OP_LEGACY_SERVER_CONNECT", 0x4)
        try:
            ctx.set_ciphers("DEFAULT@SECLEVEL=1")
        except Exception:
            pass

        req = urllib.request.Request(
            URL_SITAER_SERVICE,
            data=post_data.encode("utf-8"),
            headers={
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
                "Origin": "https://sitaer-infovoo.petrobras.com.br",
                "Referer": "https://sitaer-infovoo.petrobras.com.br/InformativoPlataforma.aspx",
            },
            method="POST",
        )
        with urllib.request.urlopen(req, timeout=15, context=ctx) as resp:
            raw_html = resp.read().decode("utf-8", errors="ignore")
            if "tableVoo" in raw_html or "Não existem dados para exibição" in raw_html:
                return raw_html
    except Exception as e:
        print(f"Aviso no fallback urllib: {e}")
    return ""


def buscar_voos_sitaer(cod_plataforma=CODIGO_PLATAFORMA_P53):
    post_data = f"operacao=LoadData&aeroporto=&plataforma={cod_plataforma}&status="

    # Prepara configuração OpenSSL compatível com servidores IIS legados no Ubuntu 24.04 (OpenSSL 3)
    openssl_cnf_path = os.path.join(tempfile.gettempdir(), "openssl_sitaer.cnf")
    try:
        with open(openssl_cnf_path, "w", encoding="utf-8") as f:
            f.write(OPENSSL_CNF_CONTENT)
    except Exception:
        openssl_cnf_path = None

    for tentativa in range(1, 5):
        # 1. Tenta com curl (-k para ignorar cadeia intermediária ausente no Ubuntu, --http1.1)
        for usar_openssl_cnf in ([True, False] if openssl_cnf_path else [False]):
            try:
                env = os.environ.copy()
                if usar_openssl_cnf and openssl_cnf_path:
                    env["OPENSSL_CONF"] = openssl_cnf_path

                cmd = [
                    "curl",
                    "-k",
                    "-sL",
                    "--http1.1",
                    "-m", "15",
                    "-A", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
                    "-H", "Content-Type: application/x-www-form-urlencoded; charset=UTF-8",
                    "-H", "Origin: https://sitaer-infovoo.petrobras.com.br",
                    "-H", "Referer: https://sitaer-infovoo.petrobras.com.br/InformativoPlataforma.aspx",
                    "-d", post_data,
                    URL_SITAER_SERVICE,
                ]
                proc = subprocess.run(
                    cmd,
                    capture_output=True,
                    text=True,
                    timeout=20,
                    env=env,
                )
                raw_html = proc.stdout or ""
                if "tableVoo" in raw_html or "Não existem dados para exibição" in raw_html:
                    return parsear_html_sitaer(raw_html), True
                err_msg = (proc.stderr or "").strip()
                print(f"Tentativa {tentativa} (curl cnf={usar_openssl_cnf}): código {proc.returncode}. {err_msg[:160]}")
            except Exception as e:
                print(f"Tentativa {tentativa} (curl) falhou: {e}")

        # 2. Tenta via urllib com SSLContext customizado
        raw_urllib = tentar_urllib_sitaer(post_data)
        if raw_urllib:
            return parsear_html_sitaer(raw_urllib), True

        time.sleep(2)

    return [], False


def atualizar():
    fuso_br = timezone(timedelta(hours=-3))
    agora = datetime.now(fuso_br)

    resultado = {
        "plataforma": NOME_PLATAFORMA,
        "codigo_plataforma": CODIGO_PLATAFORMA_P53,
        "ultima_atualizacao": agora.strftime("%d/%m/%Y %H:%M"),
        "voos": [],
    }

    voos, sucesso_conexao = buscar_voos_sitaer(CODIGO_PLATAFORMA_P53)
    if sucesso_conexao:
        resultado["voos"] = voos
        print(f"Consulta SITAER P-53 concluída com sucesso: {len(voos)} voo(s) encontrado(s).")
    else:
        print("Não foi possível conectar ao SITAER nesta execução. Preservando últimos voos conhecidos.")
        if os.path.exists(CAMINHO_JSON):
            try:
                with open(CAMINHO_JSON, "r", encoding="utf-8") as f:
                    existente = json.load(f)
                    if existente and "voos" in existente:
                        resultado["voos"] = existente["voos"]
                        resultado["ultima_atualizacao"] = existente.get("ultima_atualizacao", resultado["ultima_atualizacao"])
            except Exception:
                pass

    with open(CAMINHO_JSON, "w", encoding="utf-8") as f:
        json.dump(resultado, f, ensure_ascii=False, indent=2)
    print(f"{CAMINHO_JSON} salvo com sucesso.")


if __name__ == "__main__":
    atualizar()
