#!/usr/bin/env python3
"""
Script de atualização automática da Tabela e Jogos do Brasileirão Série A 2026.
Consulta a API pública da ESPN (site.api.espn.com - GET sem chave, tempo real)
para obter:
  1. Classificação completa atualizada (20 clubes, pontos, jogos, vitórias, empates, derrotas, SG)
  2. Jogos recentes finalizados, jogos ao vivo e próximas partidas agendadas com data (DD/MM) e hora (BRT)
Salva o resultado em brasileirao_data.json.
"""

import json
import os
import urllib.request
from datetime import datetime, timezone, timedelta

CAMINHO_JSON = "brasileirao_data.json"
FUSO_BRT = timezone(timedelta(hours=-3))

URL_STANDINGS = "https://site.api.espn.com/apis/v2/sports/soccer/bra.1/standings"
URL_SCOREBOARD = "https://site.api.espn.com/apis/site/v2/sports/soccer/bra.1/scoreboard"

DIAS_SEMANA_CURTO = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"]

MAPA_CLUBES = {
    "Flamengo": ("Flamengo", "FLA"),
    "Palmeiras": ("Palmeiras", "PAL"),
    "Cruzeiro": ("Cruzeiro", "CRU"),
    "Fluminense": ("Fluminense", "FLU"),
    "Athletico Paranaense": ("Athletico-PR", "CAP"),
    "Athletico-PR": ("Athletico-PR", "CAP"),
    "Bahia": ("Bahia", "BAH"),
    "Atlético-MG": ("Atlético-MG", "CAM"),
    "Atletico-MG": ("Atlético-MG", "CAM"),
    "Santos": ("Santos", "SAN"),
    "Red Bull Bragantino": ("Red Bull Bragantino", "RBB"),
    "Bragantino": ("Red Bull Bragantino", "RBB"),
    "São Paulo": ("São Paulo", "SAO"),
    "Sao Paulo": ("São Paulo", "SAO"),
    "Botafogo": ("Botafogo", "BOT"),
    "Coritiba": ("Coritiba", "CFC"),
    "Vasco da Gama": ("Vasco", "VAS"),
    "Vasco": ("Vasco", "VAS"),
    "Vitória": ("Vitória", "VIT"),
    "Vitoria": ("Vitória", "VIT"),
    "Grêmio": ("Grêmio", "GRE"),
    "Gremio": ("Grêmio", "GRE"),
    "Mirassol": ("Mirassol", "MIR"),
    "Internacional": ("Internacional", "INT"),
    "Corinthians": ("Corinthians", "COR"),
    "Remo": ("Remo", "REM"),
    "Chapecoense": ("Chapecoense", "CHA"),
}

MAPA_SIGLAS = {
    "BRA": "RBB",
    "REMO": "REM",
}


def normalizar_clube(nome_raw, sigla_raw):
    nome_limpo = (nome_raw or "").strip()
    sigla_limpa = (sigla_raw or "").strip().upper()
    if nome_limpo in MAPA_CLUBES:
        return MAPA_CLUBES[nome_limpo]
    sigla_norm = MAPA_SIGLAS.get(sigla_limpa, sigla_limpa)
    for k, (n_padrao, s_padrao) in MAPA_CLUBES.items():
        if s_padrao == sigla_norm:
            return (n_padrao, s_padrao)
    return (nome_limpo or sigla_norm, sigla_norm[:3] if sigla_norm else "TBD")


def requisitar_json(url):
    req = urllib.request.Request(
        url,
        headers={
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/122.0.0.0 Safari/537.36",
            "Accept": "application/json",
        },
    )
    with urllib.request.urlopen(req, timeout=15) as resp:
        if resp.status == 200:
            return json.loads(resp.read().decode("utf-8"))
    return None


def buscar_classificacao_espn():
    dados = requisitar_json(URL_STANDINGS)
    if not dados:
        return []

    children = dados.get("children", [])
    if not children:
        return []

    entries = children[0].get("standings", {}).get("entries", [])
    tabela = []

    for idx, entry in enumerate(entries, start=1):
        team = entry.get("team", {})
        nome_time, sigla_time = normalizar_clube(
            team.get("displayName") or team.get("name"),
            team.get("abbreviation"),
        )
        stats_map = {}
        for st in entry.get("stats", []):
            if "name" in st and "value" in st:
                try:
                    stats_map[st["name"]] = int(round(float(st["value"])))
                except Exception:
                    pass

        tabela.append(
            {
                "posicao": stats_map.get("rank", idx),
                "time": nome_time,
                "sigla": sigla_time,
                "pontos": stats_map.get("points", 0),
                "jogos": stats_map.get("gamesPlayed", 0),
                "vitorias": stats_map.get("wins", 0),
                "empates": stats_map.get("ties", 0),
                "derrotas": stats_map.get("losses", 0),
                "sg": stats_map.get("pointDifferential", 0),
            }
        )

    tabela.sort(key=lambda x: x["posicao"])
    return tabela


def formatar_data_evento_brt(iso_str):
    try:
        dt_utc = datetime.fromisoformat(iso_str.replace("Z", "+00:00"))
        dt_brt = dt_utc.astimezone(FUSO_BRT)
        dia_sem = DIAS_SEMANA_CURTO[dt_brt.weekday()]
        dd_mm = dt_brt.strftime("%d/%m")
        hh_mm = dt_brt.strftime("%H:%M")
        return f"{dia_sem} {dd_mm} • {hh_mm}", dd_mm, dt_brt.timestamp()
    except Exception:
        return "A definir", "", 0


def buscar_jogos_espn():
    sb_base = requisitar_json(URL_SCOREBOARD)
    if not sb_base:
        return []

    agora_brt = datetime.now(FUSO_BRT)
    hoje_date = agora_brt.date()

    calendario_raw = sb_base.get("leagues", [{}])[0].get("calendar", [])
    datas_consulta = []

    for item_cal in calendario_raw:
        try:
            dt_str = item_cal[:10]
            dt_obj = datetime.strptime(dt_str, "%Y-%m-%d").date()
            delta_dias = (dt_obj - hoje_date).days
            if -7 <= delta_dias <= 12:
                datas_consulta.append(dt_str.replace("-", ""))
        except Exception:
            pass

    if not datas_consulta:
        for d_off in range(-4, 8):
            d_alvo = hoje_date + timedelta(days=d_off)
            datas_consulta.append(d_alvo.strftime("%Y%m%d"))

    eventos_por_id = {}
    for d_ymd in datas_consulta:
        try:
            dados_dia = requisitar_json(f"{URL_SCOREBOARD}?dates={d_ymd}")
            if dados_dia and "events" in dados_dia:
                for ev in dados_dia["events"]:
                    ev_id = ev.get("id")
                    if ev_id:
                        eventos_por_id[ev_id] = ev
        except Exception as e:
            print(f"Aviso ao consultar data {d_ymd}: {e}")

    finalizados = []
    aovivo = []
    agendados = []

    for ev_id, ev in eventos_por_id.items():
        comps = ev.get("competitions", [])
        if not comps:
            continue
        comp = comps[0]
        competitors = comp.get("competitors", [])
        if len(competitors) < 2:
            continue

        c_home = next((c for c in competitors if c.get("homeAway") == "home"), competitors[0])
        c_away = next((c for c in competitors if c.get("homeAway") == "away"), competitors[1])

        mandante, mandante_sigla = normalizar_clube(
            c_home.get("team", {}).get("displayName"),
            c_home.get("team", {}).get("abbreviation"),
        )
        visitante, visitante_sigla = normalizar_clube(
            c_away.get("team", {}).get("displayName"),
            c_away.get("team", {}).get("abbreviation"),
        )

        st_type = ev.get("status", {}).get("type", {})
        state = st_type.get("state", "pre")
        short_detail = st_type.get("shortDetail", "")

        data_fmt, data_curta, ts_jogo = formatar_data_evento_brt(ev.get("date", ""))
        estadio = comp.get("venue", {}).get("fullName", "")

        try:
            gols_m = int(c_home.get("score", 0))
            gols_v = int(c_away.get("score", 0))
        except Exception:
            gols_m, gols_v = 0, 0

        if state == "post":
            finalizados.append(
                {
                    "id": int(ev_id) if str(ev_id).isdigit() else ev_id,
                    "mandante": mandante,
                    "mandante_sigla": mandante_sigla,
                    "visitante": visitante,
                    "visitante_sigla": visitante_sigla,
                    "gols_mandante": gols_m,
                    "gols_visitante": gols_v,
                    "status": "finalizado",
                    "tempo": "FIM",
                    "data": data_fmt,
                    "data_curta": data_curta,
                    "estadio": estadio,
                    "_ts": ts_jogo,
                }
            )
        elif state == "in":
            aovivo.append(
                {
                    "id": int(ev_id) if str(ev_id).isdigit() else ev_id,
                    "mandante": mandante,
                    "mandante_sigla": mandante_sigla,
                    "visitante": visitante,
                    "visitante_sigla": visitante_sigla,
                    "gols_mandante": gols_m,
                    "gols_visitante": gols_v,
                    "status": "aovivo",
                    "tempo": short_detail or "AO VIVO",
                    "data": data_fmt,
                    "data_curta": data_curta,
                    "estadio": estadio,
                    "_ts": ts_jogo,
                }
            )
        else:
            agendados.append(
                {
                    "id": int(ev_id) if str(ev_id).isdigit() else ev_id,
                    "mandante": mandante,
                    "mandante_sigla": mandante_sigla,
                    "visitante": visitante,
                    "visitante_sigla": visitante_sigla,
                    "gols_mandante": None,
                    "gols_visitante": None,
                    "status": "agendado",
                    "tempo": "AGENDADO",
                    "data": data_fmt,
                    "data_curta": data_curta,
                    "estadio": estadio,
                    "_ts": ts_jogo,
                }
            )

    # Ordena: próximos em ordem cronológica (mais próximos primeiro), finalizados dos mais recentes para trás
    agendados.sort(key=lambda x: x["_ts"])
    finalizados.sort(key=lambda x: x["_ts"], reverse=True)
    aovivo.sort(key=lambda x: x["_ts"])

    jogos_selecionados = aovivo + agendados[:8] + finalizados[:8]
    for j in jogos_selecionados:
        j.pop("_ts", None)

    return jogos_selecionados


def atualizar_json():
    dados_atuais = {}
    if os.path.exists(CAMINHO_JSON):
        try:
            with open(CAMINHO_JSON, "r", encoding="utf-8") as f:
                dados_atuais = json.load(f)
        except Exception as e:
            print(f"Erro ao ler {CAMINHO_JSON}: {e}")

    agora_str = datetime.now(FUSO_BRT).strftime("%d/%m/%Y %H:%M")
    dados_atuais["campeonato"] = "Campeonato Brasileiro Série A 2026"
    dados_atuais["ultima_atualizacao"] = agora_str

    try:
        nova_tabela = buscar_classificacao_espn()
        if len(nova_tabela) >= 10:
            dados_atuais["tabela"] = nova_tabela
            max_jogos = max((t.get("jogos", 0) for t in nova_tabela), default=33)
            dados_atuais["rodada_atual"] = min(38, max(1, max_jogos))
            print(f"Tabela atualizada com sucesso ({len(nova_tabela)} clubes, rodada {dados_atuais['rodada_atual']}).")
    except Exception as e:
        print(f"Erro ao buscar classificação na ESPN: {e}")

    try:
        novos_jogos = buscar_jogos_espn()
        if novos_jogos:
            dados_atuais["jogos"] = novos_jogos
            print(f"Jogos atualizados com sucesso ({len(novos_jogos)} partidas sincronizadas).")
    except Exception as e:
        print(f"Erro ao buscar jogos na ESPN: {e}")

    with open(CAMINHO_JSON, "w", encoding="utf-8") as f:
        json.dump(dados_atuais, f, ensure_ascii=False, indent=2)
    print(f"Arquivo {CAMINHO_JSON} salvo com ultima_atualizacao = {agora_str}.")


if __name__ == "__main__":
    atualizar_json()
