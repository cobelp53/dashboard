#!/usr/bin/env python3
"""
Script de sincronização do Informativo de Voos (SITAER) da Plataforma P-53 (código 6228).
Executado periodicamente pelo GitHub Actions.
"""

import html as html_lib
import json
import os
import re
import subprocess
from datetime import datetime, timezone, timedelta

CAMINHO_JSON = "voos_data.json"
CODIGO_PLATAFORMA_P53 = "6228"
NOME_PLATAFORMA = "P-53"
URL_SITAER_SERVICE = "https://sitaer-infovoo.petrobras.com.br/InformativoPlataformaService.aspx"
URL_SITAER_BASE = "https://sitaer-infovoo.petrobras.com.br/"


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


def buscar_voos_sitaer(cod_plataforma=CODIGO_PLATAFORMA_P53):
    post_data = f"operacao=LoadData&aeroporto=&plataforma={cod_plataforma}&status="

    # 1. Tenta via curl_cffi emulando o fingerprint TLS (BoringSSL JA3/JA4) do Google Chrome
    try:
        from curl_cffi import requests as cffi_requests
        resp = cffi_requests.post(
            URL_SITAER_SERVICE,
            data=post_data,
            headers={"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"},
            impersonate="chrome120",
            verify=False,
            timeout=15,
        )
        raw_html = resp.text or ""
        if "tableVoo" in raw_html or "Não existem dados para exibição" in raw_html:
            return parsear_html_sitaer(raw_html), True
    except Exception as e:
        print(f"Aviso curl_cffi: {e}")

    # 2. Tentativa única e limpa via curl nativo (-k -sL) sem loops agressivos que ativam bloqueio de IP no WAF
    try:
        proc = subprocess.run(
            [
                "curl",
                "-k",
                "-sL",
                "-m", "12",
                "-d", post_data,
                URL_SITAER_SERVICE,
            ],
            capture_output=True,
            text=True,
            timeout=15,
        )
        raw_html = proc.stdout or ""
        if "tableVoo" in raw_html or "Não existem dados para exibição" in raw_html:
            return parsear_html_sitaer(raw_html), True
        print(f"Aviso curl nativo: código {proc.returncode}.")
    except Exception as e:
        print(f"Aviso curl nativo: {e}")

    return [], False


def atualizar():
    fuso_br = timezone(timedelta(hours=-3))
    agora = datetime.now(fuso_br)
    agora_str = agora.strftime("%d/%m/%Y %H:%M")

    resultado = {
        "plataforma": NOME_PLATAFORMA,
        "codigo_plataforma": CODIGO_PLATAFORMA_P53,
        "ultima_atualizacao": agora_str,
        "voos": [],
    }

    voos, sucesso_conexao = buscar_voos_sitaer(CODIGO_PLATAFORMA_P53)
    if sucesso_conexao:
        resultado["voos"] = voos
        print(f"Consulta SITAER P-53 concluída com sucesso ({agora_str}): {len(voos)} voo(s) encontrado(s).")
    else:
        print(f"WAF/Conexão SITAER indisponível a partir deste IP ({agora_str}). Mantendo lista de voos e atualizando horário de checagem.")
        if os.path.exists(CAMINHO_JSON):
            try:
                with open(CAMINHO_JSON, "r", encoding="utf-8") as f:
                    existente = json.load(f)
                    if existente and "voos" in existente:
                        resultado["voos"] = existente["voos"]
            except Exception:
                pass

    with open(CAMINHO_JSON, "w", encoding="utf-8") as f:
        json.dump(resultado, f, ensure_ascii=False, indent=2)
    print(f"{CAMINHO_JSON} salvo com sucesso ({agora_str}).")


if __name__ == "__main__":
    atualizar()
