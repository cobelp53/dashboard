#!/usr/bin/env python3
"""
Script de sincronização de dados do Campeonato Brasileiro Série A.
Executado pelo GitHub Actions periodicamente.
"""

import json
import os
import sys
import urllib.request
from datetime import datetime

CAMINHO_JSON = "brasileirao_data.json"

def carregar_dados_existentes():
    if os.path.exists(CAMINHO_JSON):
        try:
            with open(CAMINHO_JSON, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception as e:
            print(f"Aviso ao ler JSON existente: {e}")
    return None

def atualizar():
    dados = carregar_dados_existentes()
    if not dados:
        print("Arquivo base não encontrado. Mantendo integridade.")
        return

    # Atualiza timestamp da execução
    agora = datetime.now()
    dados["ultima_atualizacao"] = agora.strftime("%d/%m/%Y %H:%M")

    # Tentativa de busca em fontes públicas gratuitas
    # O script preserva a estrutura e dados se a fonte externa estiver indisponível
    try:
        req = urllib.request.Request(
            "https://api.globoesporte.globo.com/tabela/d1a37fa4-e948-43a6-ba53-ab24ab2a45b7/fase/fase-unica-campeonato-brasileiro-2026/classificacao/",
            headers={"User-Agent": "Mozilla/5.0"}
        )
        with urllib.request.urlopen(req, timeout=10) as response:
            if response.status == 200:
                raw = json.loads(response.read().decode())
                if isinstance(raw, list) and len(raw) > 0:
                    nova_tabela = []
                    for idx, item in enumerate(raw, 1):
                        nome_time = item.get("nome_popular") or item.get("nome") or f"Time {idx}"
                        sigla = item.get("sigla") or nome_time[:3].upper()
                        pts = item.get("pontos", 0)
                        jogos = item.get("jogos", 0)
                        vit = item.get("vitorias", 0)
                        emp = item.get("empates", 0)
                        der = item.get("derrotas", 0)
                        sg = item.get("saldo_gols", 0)
                        nova_tabela.append({
                            "posicao": idx,
                            "time": nome_time,
                            "sigla": sigla,
                            "pontos": pts,
                            "jogos": jogos,
                            "vitorias": vit,
                            "empates": emp,
                            "derrotas": der,
                            "sg": sg
                        })
                    if len(nova_tabela) >= 10:
                        dados["tabela"] = nova_tabela
                        print(f"Tabela atualizada com sucesso ({len(nova_tabela)} times).")
    except Exception as e:
        print(f"Não foi possível atualizar tabela externa (usando dados base): {e}")

    # Salva o arquivo atualizado
    with open(CAMINHO_JSON, "w", encoding="utf-8") as f:
        json.dump(dados, f, ensure_ascii=False, indent=2)
    print("brasileirao_data.json atualizado com sucesso.")

if __name__ == "__main__":
    atualizar()
