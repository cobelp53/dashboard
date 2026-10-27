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
import http.cookiejar
import urllib.parse
import urllib.request
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
        # Extrai imagem da empresa
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
    ctx = ssl.create_default_context()
    cj = http.cookiejar.CookieJar()
    opener = urllib.request.build_opener(
        urllib.request.HTTPCookieProcessor(cj),
        urllib.request.HTTPSHandler(context=ctx),
    )

    headers_padrao = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
        "Referer": URL_SITAER_BASE,
    }

    # Passo 0: Abre a página inicial para receber os cookies de sessão ASP.NET_SessionId e TS01...
    try:
        req_init = urllib.request.Request(URL_SITAER_BASE, headers=headers_padrao, method="GET")
        with opener.open(req_init, timeout=15) as _:
            pass
    except Exception as e:
        print(f"Aviso ao iniciar sessão SITAER: {e}")

    headers_post = {
        **headers_padrao,
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "X-Requested-With": "XMLHttpRequest",
        "Origin": "https://sitaer-infovoo.petrobras.com.br",
    }

    aeroportos_principais = "4181,4184,4183,4180,4185,7776,6429,8483,7891,8456,8473,7887,8255"

    # 1. Tenta consultar direto pela Plataforma P-53 (6228) sem e com aeroportos
    for filtro_aero in ["", aeroportos_principais]:
        try:
            dados_post = urllib.parse.urlencode({
                "operacao": "LoadData",
                "aeroporto": filtro_aero,
                "plataforma": cod_plataforma,
                "status": "",
            }).encode("utf-8")

            req = urllib.request.Request(
                URL_SITAER_SERVICE,
                data=dados_post,
                headers=headers_post,
                method="POST",
            )

            with opener.open(req, timeout=20) as resp:
                raw_html = resp.read().decode("utf-8", errors="replace")
                voos = parsear_html_sitaer(raw_html)
                if voos:
                    return voos
        except Exception as e:
            print(f"Aviso na consulta direta (aero='{filtro_aero}'): {e}")

    # 2. Se ainda vier vazio, busca nos aeroportos da Bacia de Campos e filtra qualquer voo cuja rota contenha P-53 / P53
    dados_post_aero = urllib.parse.urlencode({
        "operacao": "LoadData",
        "aeroporto": aeroportos_principais,
        "plataforma": "",
        "status": "",
    }).encode("utf-8")

    req_aero = urllib.request.Request(
        URL_SITAER_SERVICE,
        data=dados_post_aero,
        headers=headers_post,
        method="POST",
    )

    with opener.open(req_aero, timeout=20) as resp:
        raw_html = resp.read().decode("utf-8", errors="replace")
        todos_voos = parsear_html_sitaer(raw_html)
        voos_p53 = [
            v for v in todos_voos
            if "P-53" in v.get("rota", "").upper() or "P53" in v.get("rota", "").upper()
        ]
        return voos_p53


def atualizar():
    fuso_br = timezone(timedelta(hours=-3))
    agora = datetime.now(fuso_br)

    resultado = {
        "plataforma": NOME_PLATAFORMA,
        "codigo_plataforma": CODIGO_PLATAFORMA_P53,
        "ultima_atualizacao": agora.strftime("%d/%m/%Y %H:%M"),
        "voos": [],
    }

    try:
        voos = buscar_voos_sitaer(CODIGO_PLATAFORMA_P53)
        resultado["voos"] = voos
        print(f"Consulta SITAER P-53 concluída: {len(voos)} voo(s) encontrado(s).")
    except Exception as e:
        print(f"Aviso ao consultar SITAER P-53: {e}")
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
    print(f"{CAMINHO_JSON} salvo com sucesso.")


if __name__ == "__main__":
    atualizar()
