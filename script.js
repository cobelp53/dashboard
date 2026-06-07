// =========================================================================
// ⚙️ CONFIGURAÇÃO GLOBAL E VARIÁVEIS DO PAINEL (COBEL - P53)
// =========================================================================

/**
 * CONFIGURAÇÃO GLOBAL DO PAINEL
 * Centraliza todos os textos, intervalos de tempo, endpoints e credenciais.
 * Facilitará a integração futura com um painel de administração que altere estes valores.
 */
const CONFIG_GLOBAL = {
    // 🏷️ Textos fixos e títulos exibidos na interface (HTML)
    textos: {
        cabecalhoTitulo: "COBEL - P53",
        cabecalhoSubtitulo: "COMISSÃO DE BEM ESTAR E LAZER",
        tituloProgramacao: "📅 PROGRAMAÇÃO DE BORDO",
        tituloRefeitorio: "🍽️ Refeitório",
        tituloEstaSemana: "🗓️ Esta Semana",
        tituloDestaques: "🖼️ DESTAQUES",
        tituloVotacaoPC: "💬 PARTICIPE DA COBEL",
        tituloVotacaoMobile: "📈 RESULTADO DA VOTAÇÃO",
        subtituloVotacao: "Use o QR Code e fique por dentro",
        rotuloVotacaoFilme: "🗳️ Votação do filme",
        textoVotacaoPCInstrucao: "Use o QR Code acima para votar!",
        textoVotacaoMobileBotao: "📲 CLIQUE AQUI PARA VOTAR!",
        textoVotoSucesso: "✨ Sucesso! O comando de limpeza foi enviado.",
        rodapeTicker: "Sejam bem-vindos à Plataforma P53, boa estadia! | Portal desenvolvido pela Automação de P53 © 2026"
    },

    // 🔑 Credenciais e segurança do painel
    seguranca: {
        senhaAdmin: "1234", // Senha de acesso à tela de controle interna
    },

    // 🌧️ Configuração geográfica para a previsão do tempo (Open-Meteo API)
    clima: {
        latitude: -22.042,                 // Coordenada Latitude para a P53 (Bacia de Campos)
        longitude: -41.051,                // Coordenada Longitude para a P53
        frequenciaAtualizacaoMs: 1800000,  // Tempo entre atualizações do clima (30 minutos)
    },

    // 📊 Integração com Google Sheets (Formulário e Respostas)
    votacao: {
        // Link direto do Formulário de Votação (Google Forms)
        urlInteracaoForm: "https://docs.google.com/forms/d/e/1FAIpQLScHi3wYt85jdh1P2hJXNlt2h2hB6KRbWYrl1PLE49xektVPpA/viewform",

        // ID da Planilha Google obtida das respostas do Google Forms
        sheetId: "12uZTiil0aRZ80rlE3TNEMitlSn8E2cxZk4Srbefozk4",
        sheetName: "Respostas ao formulário 1",
        voteColumnIndex: 1,                // Índice da coluna de votos (0-indexado, 1 = segunda coluna)
        frequenciaAtualizacaoMs: 30000,    // Atualização do gráfico de votos na tela (30 segundos)
        tamanhoQRCode: 185,                // Tamanho em pixels (largura x altura) do QR Code na tela

        // Cores do gráfico de pizza (Chart.js) para cada fatia
        coresGrafico: [
            '#006837', // Verde Petrobras
            '#004B87', // Azul Petrobras
            '#FDB913', // Amarelo Petrobras
            '#FF6384', // Rosa/Vermelho
            '#9966FF', // Roxo
            '#FF9F40', // Laranja
            '#7BC67E', // Verde Claro
            '#E7E9ED'  // Cinza Claro
        ],

        // URL da API do Google Apps Script configurada para ler/salvar legendas e resetar votos
        urlAppsScript: "https://script.google.com/macros/s/AKfycbztMjTKYovMJFVwIkdLFtGj8-Ar6FOxRkhQIKIeTCq0SiMxiuwCJouZ4Z4z4HRe5dAI/exec"
    },

    // ⏱️ Tempos de execução, intervalos e transições internas do sistema
    sistemas: {
        frequenciaRelogioMs: 1000,              // Atualização do relógio no rodapé (1 segundo)
        frequenciaDestaqueProgramacaoMs: 60000, // Checagem do evento atual da programação (1 minuto)
        duracaoDestaqueEventoMinutos: 60,       // Tempo de duração do destaque de um evento (60 minutos)
        intervaloCarrosselPadraoMs: 10000,      // Tempo padrão de exibição de um slide caso não tenha tempo individual
        frequenciaReloadCompletoMs: 14400000,   // Recarregamento forçado da página para prevenção de travamentos (4 horas)
        frequenciaChecagemCommitMs: 180000,     // Checagem de novas versões publicadas no GitHub Pages (3 minutos)
    }
};

// 🔹 DADOS DA ROTINA DIÁRIA (Exibida na coluna "Refeitório")
const programacaoDia = [
    { hora: "05:00", atividade: "Café da manhã" },
    { hora: "09:00", atividade: "Lanche da manhã" },
    { hora: "11:00", atividade: "Almoço" },
    { hora: "15:00", atividade: "Lanche da tarde" },
    { hora: "18:00", atividade: "Jantar" },
    { hora: "21:00", atividade: "Lanche" },
    { hora: "23:30", atividade: "Ceia" },
];

// 🔹 DADOS DA PROGRAMAÇÃO SEMANAL (Exibida na coluna "Esta Semana")
const programacaoSemana = [
    { dia: "Dom", evento: "🥩 Churrasco de 11h as 13h" },
    { dia: "Seg", evento: "🎤 Karaokê as 19h no cinema" },
    { dia: "Ter", evento: "🏋🏽‍♂️ Dia livre" },
    { dia: "Qua", evento: "🍕 Pizza de 21h as 22h" },
    { dia: "Qui", evento: "🎬 Cinema as 20h" },
    { dia: "Sex", evento: "🍔 Hambúrguer de 21h as 22h" },
    { dia: "Sab", evento: "🍕 Pizza de 21h as 22h" }
];

// 🔹 SLIDES DO CARROSSEL DE DESTAQUES (Textos/Imagens e tempos individuais em milissegundos)
const destaques = [
    { url: "imagens/paltaformanoite1.jpeg", legenda: "Foto do mês - Plataforma P53", tempo: 3000 },
    { url: "imagens/quadra.jpeg", legenda: "A bola vai voltar a rolar! A reforma da nossa quadra de futebol está a todo vapor.", tempo: 3000 },
    { url: "imagens/salajogos5.jpg", legenda: "A Sala de Jogos está ficando cada dia melhor. Novidades a caminho!", tempo: 8000 },
    { url: "imagens/pipoqueiramontagem.JPG", legenda: "E o Cine Pipoca fez juz ao nome!!", tempo: 3000 },
    {
        titulo: "Bem-Estar e Lazer em Evolução",
        texto: "<br>Confira as atualizações que estão transformando nossos espaços de convivência:<br><br>🎮 Nossa Sala de Jogos já está disponível! E temos fliperamas, ping-pong e mesa de carteado. Em breve Pebolim. <br><br>⚽ Reforma da Quadra: As obras na quadra estão a todo vapor! Estamos renovando a estrutura para garantir partidas com mais qualidade e segurança.<br><br>",
        tempo: 10000
    }
];


// =========================================================================
// 🖥️ INICIALIZAÇÃO E RENDERIZAÇÃO DA INTERFACE (DOM)
// =========================================================================

/**
 * Injeta dinamicamente os textos e títulos configurados no CONFIG_GLOBAL nos IDs da página.
 */
function inicializarTextosInterface() {
    const mapeamento = {
        'cabecalho-titulo': CONFIG_GLOBAL.textos.cabecalhoTitulo,
        'cabecalho-subtitulo': CONFIG_GLOBAL.textos.cabecalhoSubtitulo,
        'titulo-programacao': CONFIG_GLOBAL.textos.tituloProgramacao,
        'titulo-refeitorio': CONFIG_GLOBAL.textos.tituloRefeitorio,
        'titulo-esta-semana': CONFIG_GLOBAL.textos.tituloEstaSemana,
        'titulo-destaques': CONFIG_GLOBAL.textos.tituloDestaques,
        'titulo-votacao-pc': CONFIG_GLOBAL.textos.tituloVotacaoPC,
        'titulo-votacao-mobile': CONFIG_GLOBAL.textos.tituloVotacaoMobile,
        'qr-subtitulo': CONFIG_GLOBAL.textos.subtituloVotacao,
        'votacao-titulo': CONFIG_GLOBAL.textos.rotuloVotacaoFilme,
        'ticker-msg': CONFIG_GLOBAL.textos.textoVotoSucesso // placeholder para redefinir depois
    };

    // Aplica os textos dinâmicos do objeto de configuração global
    for (const [id, texto] of Object.entries(mapeamento)) {
        const elemento = document.getElementById(id);
        if (elemento) {
            // Se for o ticker, vamos usar a mensagem customizada de rodapé
            if (id === 'ticker-msg') {
                elemento.innerHTML = CONFIG_GLOBAL.textos.rodapeTicker;
            } else {
                elemento.innerHTML = texto;
            }
        }
    }
}

/**
 * Adapta o layout do botão/link de votação do Cinema baseado no dispositivo (Mobile vs Desktop)
 */
function adaptarLinkVotacaoMobile() {
    const linkVotacao = document.getElementById('link-votacao');

    if (linkVotacao) {
        if (window.innerWidth <= 768) {
            // Mobile: Botão clicável de votação (abre o formulário direto)
            linkVotacao.innerText = CONFIG_GLOBAL.textos.textoVotacaoMobileBotao;
            linkVotacao.href = CONFIG_GLOBAL.votacao.urlInteracaoForm;
            linkVotacao.style.color = "var(--petro-azul)";
            linkVotacao.style.fontWeight = "bold";
            linkVotacao.style.textDecoration = "underline";
            linkVotacao.style.cursor = "pointer";
            linkVotacao.style.display = "inline-block";
        } else {
            // Desktop: Apenas texto indicativo para usar o QR Code
            linkVotacao.innerText = CONFIG_GLOBAL.textos.textoVotacaoPCInstrucao;
            linkVotacao.href = "#";
            linkVotacao.style.color = "var(--texto-claro)";
            linkVotacao.style.fontWeight = "normal";
            linkVotacao.style.textDecoration = "none";
            linkVotacao.style.cursor = "default";
        }
    }
}

/**
 * Cria a estrutura HTML e preenche a programação (Rotina diária e Programação semanal)
 */
function renderizarProgramacao() {
    // 1. Renderiza a Programação Diária (Refeitório)
    const containerDia = document.getElementById('lista-programacao-dia');
    if (containerDia) {
        containerDia.innerHTML = programacaoDia.map(item => `
            <li><span class="hora">${item.hora}</span><span class="atividade">${item.atividade}</span></li>
        `).join('');
    }

    // 2. Renderiza a Programação Semanal
    const containerSemana = document.getElementById('lista-programacao-semana');
    if (containerSemana) {
        containerSemana.innerHTML = programacaoSemana.map(item => `
            <li><span class="dia">${item.dia}</span><span class="evento">${item.evento}</span></li>
        `).join('');
    }

    // Aplica o destaque inicial
    destacarEventoAtual();
}


// =========================================================================
// ⏰ LÓGICA DE EVENTOS, DATA E DESTAQUES TEMPORAIS
// =========================================================================

/**
 * Atualiza dinamicamente as classes CSS para destacar o evento atual ou o próximo da programação
 */
function destacarEventoAtual() {
    const agora = new Date();
    const diaHoje = agora.getDay();
    const minutosAtuais = agora.getHours() * 60 + agora.getMinutes();

    const itensDia = document.querySelectorAll('#lista-programacao-dia li');
    let indiceDestacado = -1;

    // 1. Procura por um evento ativo recente (que iniciou há menos de 1 hora)
    const duracaoLimiteMinutos = CONFIG_GLOBAL.sistemas.duracaoDestaqueEventoMinutos;
    for (let i = 0; i < programacaoDia.length; i++) {
        const [h, m] = programacaoDia[i].hora.split(':').map(Number);
        const minutosEvento = h * 60 + m;
        if (minutosAtuais >= minutosEvento && minutosAtuais < minutosEvento + duracaoLimiteMinutos) {
            indiceDestacado = i; // Define como o evento ativo
        }
    }

    // 2. Se não houver evento ativo (entre janelas), destaca o próximo evento da programação
    if (indiceDestacado === -1) {
        for (let i = 0; i < programacaoDia.length; i++) {
            const [h, m] = programacaoDia[i].hora.split(':').map(Number);
            const minutosEvento = h * 60 + m;
            if (minutosEvento > minutosAtuais) {
                indiceDestacado = i;
                break;
            }
        }
    }

    // Aplica visualmente o destaque no refeitório
    itensDia.forEach((li, index) => {
        if (index === indiceDestacado) {
            li.classList.add('destaque');
        } else {
            li.classList.remove('destaque');
        }
    });

    // 3. Aplica visualmente o destaque no dia da semana correspondente
    const itensSemana = document.querySelectorAll('#lista-programacao-semana li');
    let semanaDestacado = false;

    itensSemana.forEach((li, index) => {
        li.classList.remove('destaque');
        if (!semanaDestacado && diaHoje == index) {
            li.classList.add('destaque');
            semanaDestacado = true;
        }
    });

    // Fallbacks de segurança se toda a rotina do dia ou da semana já tiver passado
    if (indiceDestacado === -1 && itensDia.length > 0) {
        itensDia[itensDia.length - 1].classList.add('destaque');
    }
    if (!semanaDestacado && itensSemana.length > 0) {
        itensSemana[itensSemana.length - 1].classList.add('destaque');
    }
}

/**
 * Atualiza o relógio digital no canto inferior direito a cada segundo
 */
function atualizarDataHora() {
    const agora = new Date();
    const dd = String(agora.getDate()).padStart(2, '0');
    const mm = String(agora.getMonth() + 1).padStart(2, '0');
    const yyyy = agora.getFullYear();
    const hh = String(agora.getHours()).padStart(2, '0');
    const min = String(agora.getMinutes()).padStart(2, '0');
    const ss = String(agora.getSeconds()).padStart(2, '0');

    const completo = `${dd}/${mm}/${yyyy} ${hh}:${min}:${ss}`;

    const elTickerHora = document.getElementById('data-hora-ticker');
    if (elTickerHora) {
        elTickerHora.textContent = completo;
    }
}


// =========================================================================
// 🎠 CARROSSEL DE IMAGENS E DESTAQUES (AUTOMÁTICO E MANUAL)
// =========================================================================

let indiceImagem = 0;
let timerCarrossel;

/**
 * Renderiza os slides (Imagens, Vídeos ou Caixa de Textos Informativos) na tela
 */
function renderizarCarrossel() {
    const container = document.getElementById('carrossel-imagens');
    if (!container) return;
    container.innerHTML = '';

    destaques.forEach((item, i) => {
        if (item.url) {
            // Verifica se o arquivo é um vídeo curto com base na extensão
            const isVideo = /\.(mp4|webm|ogg|mov)$/i.test(item.url);
            if (isVideo) {
                // Slide de vídeo curto / looping
                const video = document.createElement('video');
                video.src = item.url;
                video.className = i === 0 ? 'ativa' : '';
                video.autoplay = true;
                video.loop = true;
                video.muted = true;
                video.setAttribute('playsinline', '');
                video.setAttribute('webkit-playsinline', '');
                container.appendChild(video);
            } else {
                // Slide de imagem ou GIF tradicional
                const img = document.createElement('img');
                img.src = item.url;
                img.className = i === 0 ? 'ativa' : '';
                container.appendChild(img);
            }
        } else if (item.texto) {
            // Slide de texto puro estilizado
            const div = document.createElement('div');
            div.className = `slide-texto ${i === 0 ? 'ativa' : ''}`;
            div.innerHTML = (item.titulo ? `<h3>${item.titulo}</h3>` : '') + `<p>${item.texto}</p>`;
            container.appendChild(div);
        }
    });
    atualizarLegenda(0);

    // Se o primeiro slide for vídeo, inicia a reprodução do início
    const primeiroSlide = container.firstElementChild;
    if (primeiroSlide && primeiroSlide.tagName === 'VIDEO') {
        primeiroSlide.currentTime = 0;
        primeiroSlide.play().catch(e => console.log("Erro ao reproduzir primeiro vídeo:", e));
    }
}

/**
 * Altera o slide ativo na tela infinitamente na direção escolhida
 * @param {number} direcao - Direção do slide (1 para frente, -1 para trás)
 */
function mudarSlide(direcao) {
    const slides = document.querySelectorAll('#carrossel-imagens > *');
    if (slides.length === 0) return;

    // Pausa o vídeo ativo anterior se for um elemento de vídeo
    if (slides[indiceImagem] && slides[indiceImagem].tagName === 'VIDEO') {
        slides[indiceImagem].pause();
    }

    slides[indiceImagem].classList.remove('ativa');
    indiceImagem = (indiceImagem + direcao + slides.length) % slides.length;
    slides[indiceImagem].classList.add('ativa');

    // Se o novo slide for vídeo, reinicia e reproduz
    if (slides[indiceImagem] && slides[indiceImagem].tagName === 'VIDEO') {
        slides[indiceImagem].currentTime = 0;
        slides[indiceImagem].play().catch(e => console.log("Erro ao reproduzir vídeo:", e));
    }

    atualizarLegenda(indiceImagem);
}

/**
 * Realiza a mudança manual de slide ao clicar nas setas de navegação
 */
function mudarSlideManual(direcao) {
    clearTimeout(timerCarrossel);
    mudarSlide(direcao);
    iniciarCarrossel();
}

/**
 * Gerencia o loop temporal do carrossel considerando o tempo configurado por slide
 */
function iniciarCarrossel() {
    clearTimeout(timerCarrossel);
    const tempoAtual = destaques[indiceImagem].tempo || CONFIG_GLOBAL.sistemas.intervaloCarrosselPadraoMs;

    timerCarrossel = setTimeout(() => {
        mudarSlide(1);
        iniciarCarrossel();
    }, tempoAtual);
}

/**
 * Atualiza o painel inferior de legenda com base no slide selecionado
 */
function atualizarLegenda(index) {
    const item = destaques[index];
    const elLegenda = document.getElementById('legenda-imagem');
    if (elLegenda) {
        if (item && item.legenda) {
            elLegenda.textContent = item.legenda;
            elLegenda.style.display = 'block';
        } else {
            elLegenda.style.display = 'none';
        }
    }
}


// =========================================================================
// 🌦️ INTEGRAÇÃO DA PREVISÃO DO TEMPO (API OPEN-METEO)
// =========================================================================

/**
 * Consulta a API climática aberta com base nas coordenadas globais e preenche o widget
 */
async function buscarPrevisaoHorizontal() {
    const lat = CONFIG_GLOBAL.clima.latitude;
    const lon = CONFIG_GLOBAL.clima.longitude;
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,wind_speed_10m_max&timezone=America%2FSao_Paulo`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        // 1. Atualiza as informações climáticas de hoje (bloco principal)
        const hojeEl = document.querySelector('.item-clima.hoje') || document.querySelector('.item-clima');
        if (hojeEl) {
            hojeEl.classList.add('hoje');
            document.getElementById('data-hoje').innerText = new Date().toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', '').toUpperCase();
            document.getElementById('icone-atual').innerText = traduzirWMO(data.current.weather_code).icone;
            document.getElementById('temp-atual').innerHTML = `${Math.round(data.current.temperature_2m)}°`;

            const ventoAtualEl = document.getElementById('vento-atual');
            if (ventoAtualEl) {
                ventoAtualEl.innerHTML = `💨 ${Math.round(data.current.wind_speed_10m)} km/h`;
            }
        }

        // 2. Renderiza a previsão compacta horizontal para os próximos 6 dias
        const containerSemana = document.getElementById('previsao-semana');
        if (containerSemana) {
            containerSemana.innerHTML = '';
            for (let i = 1; i <= 6; i++) {
                if (!data.daily.time[i]) break;

                const dataDia = new Date(data.daily.time[i] + "T00:00:00");
                const diaSemana = dataDia.toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', '').toUpperCase();
                const max = Math.round(data.daily.temperature_2m_max[i]);
                const min = Math.round(data.daily.temperature_2m_min[i]);
                const windMax = Math.round(data.daily.wind_speed_10m_max[i]);
                const infoClima = traduzirWMO(data.daily.weather_code[i]);

                const div = document.createElement('div');
                div.className = 'item-clima';
                div.innerHTML = `
                    <span class="dia-nome">${diaSemana}</span>
                    <span class="icone">${infoClima.icone}</span>
                    <span class="temps">${max}° <span>/ ${min}°</span></span>
                    <span class="vento">💨 ${windMax} km/h</span>
                `;
                containerSemana.appendChild(div);
            }
        }

    } catch (error) {
        console.error("Erro ao buscar previsão do tempo:", error);
    }
}

/**
 * Traduz o código WMO retornado pela API climática para um texto e um emoji visual condizente
 * @param {number} code - Código climático oficial WMO
 * @returns {object} Objeto com o texto descritivo e o emoji (ícone) do clima correspondente
 */
function traduzirWMO(code) {
    const mapa = {
        0: { texto: "Limpo", icone: "☀️" },
        1: { texto: "Parc. Nublado", icone: "🌤️" },
        2: { texto: "Nublado", icone: "⛅" },
        3: { texto: "Encoberto", icone: "☁️" },
        45: { texto: "Nevoeiro", icone: "🌫️" },
        51: { texto: "Garoa", icone: "🌦️" },
        61: { texto: "Chuva", icone: "🌧️" },
        80: { texto: "Pancadas", icone: "🚿" },
        95: { texto: "Tempestade", icone: "⛈️" }
    };
    return mapa[code] || { texto: "--", icone: "🌥️" };
}


// =========================================================================
// 📊 GRÁFICO E INTEGRAÇÃO DE VOTOS (GOOGLE SHEETS)
// =========================================================================

/**
 * Gera os QR codes necessários para interações a partir do link no CONFIG_GLOBAL
 */
function gerarQRCodes() {
    const tamanho = CONFIG_GLOBAL.votacao.tamanhoQRCode;
    const urlQRCode = `https://api.qrserver.com/v1/create-qr-code/?size=${tamanho}x${tamanho}&data=${encodeURIComponent(CONFIG_GLOBAL.votacao.urlInteracaoForm)}&bgcolor=ffffff&color=006837&margin=6`;

    const containerQR = document.getElementById('qr-interacao');
    if (containerQR) {
        containerQR.innerHTML = `<img src="${urlQRCode}" alt="QR Code Votação" width="${tamanho}" height="${tamanho}">`;
    }
}

/**
 * Consulta a Planilha Google estruturada via biblioteca gviz e renderiza o gráfico de pizza dos votos
 */
async function carregarGraficoVotacao() {
    // Registra o plugin de labels para o ChartJS
    Chart.register(ChartDataLabels);

    const sheetId = CONFIG_GLOBAL.votacao.sheetId;
    const sheetName = CONFIG_GLOBAL.votacao.sheetName;
    const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(sheetName)}`;

    const loadingEl = document.getElementById('grafico-loading');
    const canvas = document.getElementById('pieChart');

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Falha no acesso à planilha.');

        const text = await response.text();
        // Remove a casca Javascript inserida pelo Google gviz para ler o JSON puro
        const jsonString = text.substring(47).slice(0, -2);
        const data = JSON.parse(jsonString);
        const rows = data.table.rows;

        if (!rows || rows.length === 0) throw new Error('Nenhuma resposta ativa na planilha.');

        // Executa a contagem simples de votos acumulados por opção
        const contagemVotos = {};
        const indexColunaVoto = CONFIG_GLOBAL.votacao.voteColumnIndex;

        rows.forEach(row => {
            const cell = row.c[indexColunaVoto];
            if (cell && cell.v !== null && cell.v !== undefined) {
                const voto = String(cell.v).trim();
                if (voto) {
                    contagemVotos[voto] = (contagemVotos[voto] || 0) + 1;
                }
            }
        });

        // Ordena o ranking por maior número de votos
        const ranking = Object.entries(contagemVotos).sort((a, b) => b[1] - a[1]);

        // Mapeia o ranking adicionando a classificação (1º, 2º, 3º...) para exibição no gráfico/legenda
        const rankingPosicionado = ranking.map((item, index) => {
            const pos = index + 1;
            return [`${pos}º ${item[0]}`, item[1]];
        });

        const labels = rankingPosicionado.map(item => item[0]);
        const values = rankingPosicionado.map(item => item[1]);

        // Mantém apenas os 3 itens mais votados para exibição na legenda
        const top3 = labels.slice(0, 3);
        const totalVotos = values.reduce((a, b) => a + b, 0);

        if (labels.length === 0) throw new Error('Nenhum voto elegível encontrado.');

        // Reseta o canvas destruindo a instância de gráfico antiga para evitar bugs de hover
        if (window.pieChartInstance) {
            window.pieChartInstance.destroy();
        }

        if (loadingEl) loadingEl.style.display = 'none';
        if (canvas) canvas.style.display = 'block';

        // Atualiza o título do card para incluir a contagem total de votos de forma limpa e sem ocupar espaço do canvas
        const elTitulo = document.getElementById('votacao-titulo');
        if (elTitulo) {
            elTitulo.innerText = `${CONFIG_GLOBAL.textos.rotuloVotacaoFilme} (${totalVotos} votos)`;
        }

        // Inicializa o novo gráfico de pizza
        window.pieChartInstance = new Chart(canvas, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    data: values,
                    backgroundColor: CONFIG_GLOBAL.votacao.coresGrafico,
                    borderWidth: 2,
                    borderColor: '#ffffff',
                    hoverOffset: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    datalabels: {
                        color: '#fff',
                        anchor: 'center',
                        align: 'center',
                        font: { size: 12, weight: 'bold' },
                        formatter: (value, ctx) => {
                            // Exibe o número de votos diretamente na fatia correspondente
                            return value > 0 ? value : '';
                        }
                    },
                    legend: {
                        display: false // Oculta a legenda interna do Chart.js para usarmos nossa legenda HTML customizada e responsiva
                    },
                    tooltip: {
                        callbacks: {
                            label: (ctx) => {
                                const label = ctx.label || '';
                                const value = ctx.raw || 0;
                                const porcentagem = totalVotos > 0 ? Math.round((value / totalVotos) * 100) : 0;
                                return `${label}: ${value} (${porcentagem}%)`;
                            }
                        }
                    },
                    title: {
                        display: false // Oculta o título do ChartJS pois já atualizamos o título do card HTML principal
                    }
                },
                layout: {
                    padding: { top: 2, bottom: 2, right: 2, left: 2 }
                }
            }
        });

        // Gera e injeta a legenda HTML customizada (empilhada verticalmente no mobile, horizontal no PC)
        const containerLegenda = document.getElementById('grafico-legenda-custom');
        if (containerLegenda) {
            containerLegenda.innerHTML = '';
            top3.forEach((label) => {
                const idxOriginal = labels.indexOf(label);
                if (idxOriginal !== -1) {
                    const cor = CONFIG_GLOBAL.votacao.coresGrafico[idxOriginal % CONFIG_GLOBAL.votacao.coresGrafico.length];

                    const item = document.createElement('div');
                    item.className = 'legenda-item';

                    const spanCor = document.createElement('span');
                    spanCor.className = 'legenda-cor';
                    spanCor.style.backgroundColor = cor;

                    const spanTexto = document.createElement('span');
                    spanTexto.className = 'legenda-texto';
                    spanTexto.innerText = label;

                    item.appendChild(spanCor);
                    item.appendChild(spanTexto);
                    containerLegenda.appendChild(item);
                }
            });
        }

    } catch (err) {
        console.warn("Monitoramento de votos:", err.message);
    }
}


// =========================================================================
// 🔐 CONTROLE DA ÁREA ADMINISTRATIVA (COBEL ADMIN)
// =========================================================================

/**
 * Abre o popup solicitando a senha de administração desfocando o fundo do painel
 */
function cobelAbrirAcesso() {
    const popup = document.getElementById('cobel-popup-senha');
    const campo = document.getElementById('cobel-campo-senha');
    const painel = document.getElementById('cobel-painel-principal');

    if (popup && painel) {
        popup.style.display = 'flex';
        painel.style.filter = 'blur(6px)';
        if (campo) {
            campo.value = '';
            campo.focus();
        }
    }
}

/**
 * Fecha o popup de senha restaurando o foco visual da página principal
 */
function cobelFecharAcesso() {
    const popup = document.getElementById('cobel-popup-senha');
    const painel = document.getElementById('cobel-painel-principal');

    if (popup && painel) {
        popup.style.display = 'none';
        painel.style.filter = 'none';
    }
}

/**
 * Valida a senha inserida contra o hash da configuração global e ativa a tela administrativa
 */
function cobelVerificarSenha() {
    const campo = document.getElementById('cobel-campo-senha');
    const telaAdmin = document.getElementById('cobel-tela-admin');

    if (!campo || !telaAdmin) return;

    if (campo.value === CONFIG_GLOBAL.seguranca.senhaAdmin) {
        cobelFecharAcesso();
        telaAdmin.style.display = 'block';
        cobelGerarLogsLocais(); // Popula o painel de status local da administração
    } else {
        alert('Senha incorreta!');
        campo.value = '';
        campo.focus();
    }
}

/**
 * Oculta a janela de administração, voltando ao dashboard normal
 */
function cobelSairAdmin() {
    const telaAdmin = document.getElementById('cobel-tela-admin');
    if (telaAdmin) {
        telaAdmin.style.display = 'none';
    }
}

/**
 * Exibe logs e diagnósticos rápidos de funcionamento interno no bloco de logs da administração
 */
function cobelGerarLogsLocais() {
    const caixaLog = document.getElementById('cobel-status-log');
    if (!caixaLog) return;

    const agora = new Date().toLocaleTimeString('pt-BR');
    caixaLog.innerHTML = `
        <p class="cobel-log-sucesso">[${agora}] SUCESSO: Gráfico da Planilha carregado (${document.getElementById('pieChart') ? 'Ativo' : 'Inativo'}).</p>
        <p class="cobel-log-info">[${agora}] INFO: Carrossel rodando com ${destaques.length} slides.</p>
        <p class="cobel-log-info">[${agora}] INFO: Agenda sincronizada (${programacaoDia.length} eventos de rotina).</p>
        <p class="cobel-log-sucesso">[${agora}] SUCESSO: Widget do clima Open-Meteo online.</p>
        <p class="cobel-log-alerta">[${agora}] MONITOR: Atualização preventiva de 4 horas ativa.</p>
    `;
}

/**
 * Consulta a API Apps Script via GET para carregar legendas remotas salvas na planilha
 */
async function carregarLegendasDinamicas() {
    const scriptUrl = CONFIG_GLOBAL.votacao.urlAppsScript;
    if (!scriptUrl || scriptUrl.includes("COLE_AQUI_A_SUA_NOVA_URL")) return;

    try {
        const resposta = await fetch(scriptUrl, { method: 'GET', cache: 'no-cache' });
        const configuracoesPlanilha = await resposta.json();

        // 1. Popula as inputs de edição no HTML se a tela de admin estiver aberta
        if (document.getElementById('edit-legenda-1')) document.getElementById('edit-legenda-1').value = configuracoesPlanilha.legenda_foto1 || "";
        if (document.getElementById('edit-legenda-2')) document.getElementById('edit-legenda-2').value = configuracoesPlanilha.legenda_foto2 || "";
        if (document.getElementById('edit-legenda-3')) document.getElementById('edit-legenda-3').value = configuracoesPlanilha.legenda_foto3 || "";

        // 2. Transfere os textos da planilha para o array de destaques na memória local
        if (destaques[0]) destaques[0].legenda = configuracoesPlanilha.legenda_foto1 || destaques[0].legenda;
        if (destaques[1]) destaques[1].legenda = configuracoesPlanilha.legenda_foto2 || destaques[1].legenda;
        if (destaques[2]) destaques[2].legenda = configuracoesPlanilha.legenda_foto3 || destaques[2].legenda;

        // 3. Força a atualização da legenda na tela
        atualizarLegenda(indiceImagem);

    } catch (erro) {
        console.error("Falha ao sincronizar legendas dinâmicas:", erro);
    }
}

/**
 * Salva as novas legendas digitadas na administração enviando-as de volta à planilha do Google
 */
async function cobelSalvarLegendas() {
    const botao = document.getElementById('cobel-btn-salvar-legendas');
    const statusTxt = document.getElementById('cobel-status-salvar');
    const scriptUrl = CONFIG_GLOBAL.votacao.urlAppsScript;

    if (!botao || !statusTxt) return;

    if (!scriptUrl || scriptUrl.includes("COLE_AQUI_A_SUA_NOVA_URL")) {
        alert("Erro: Configure a URL do Apps Script nas configurações globais.");
        return;
    }

    const l1 = document.getElementById('edit-legenda-1') ? document.getElementById('edit-legenda-1').value : "";
    const l2 = document.getElementById('edit-legenda-2') ? document.getElementById('edit-legenda-2').value : "";
    const l3 = document.getElementById('edit-legenda-3') ? document.getElementById('edit-legenda-3').value : "";

    botao.disabled = true;
    botao.innerText = "⏳ Salvando...";
    statusTxt.style.color = "#2563eb";
    statusTxt.innerText = "Gravando na planilha...";

    try {
        // Envia as legendas como parâmetros GET burlados para evitar qualquer bloqueio de CORS
        const urlMontada = `${scriptUrl}?acao=salvar_legendas&legenda_foto1=${encodeURIComponent(l1)}&legenda_foto2=${encodeURIComponent(l2)}&legenda_foto3=${encodeURIComponent(l3)}`;
        await fetch(urlMontada, { method: 'GET', mode: 'no-cors', cache: 'no-cache' });

        statusTxt.style.color = "#16a34a";
        statusTxt.innerText = "✨ Salvo com sucesso!";
        botao.innerText = "💾 Salvar Legendas";
        botao.disabled = false;

        // Atualiza a memória de destaques local imediatamente
        if (destaques[0]) destaques[0].legenda = l1;
        if (destaques[1]) destaques[1].legenda = l2;
        if (destaques[2]) destaques[2].legenda = l3;

        atualizarLegenda(indiceImagem);
        setTimeout(() => { statusTxt.innerText = ""; }, 3000);

    } catch (erro) {
        console.error("Falha ao salvar legendas:", erro);
        statusTxt.style.color = "#dc2626";
        statusTxt.innerText = "❌ Falha ao tentar salvar.";
        botao.innerText = "💾 Salvar Legendas";
        botao.disabled = false;
    }
}

/**
 * Envia um sinal para o Google Apps Script instruindo a limpeza de todas as linhas de votação da planilha
 */
async function cobelLimparPlanilhaVotos() {
    const botao = document.getElementById('cobel-btn-limpar');
    const statusTxt = document.getElementById('cobel-status-acao');
    const caixaLog = document.getElementById('cobel-status-log');
    const scriptUrl = CONFIG_GLOBAL.votacao.urlAppsScript;

    if (!confirm("⚠️ ATENÇÃO: Deseja realmente zerar todos os votos coletados na planilha? Esta ação é irreversível.")) {
        return;
    }

    if (!scriptUrl || scriptUrl.includes("COLE_AQUI_A_SUA_NOVA_URL")) {
        alert("Erro: Configure a URL do Apps Script primeiro.");
        return;
    }

    if (botao) {
        botao.disabled = true;
        botao.innerText = "⏳ Limpando planilha, aguarde...";
    }
    if (statusTxt) {
        statusTxt.style.color = "#2563eb";
        statusTxt.innerText = "Conectando ao servidor Google...";
    }

    try {
        const urlLimpeza = `${scriptUrl}?acao=limpar_votacao`;
        await fetch(urlLimpeza, { method: 'GET', mode: 'no-cors', cache: 'no-cache' });

        if (statusTxt) {
            statusTxt.style.color = "#16a34a";
            statusTxt.innerText = "✨ Sucesso! O comando de limpeza foi enviado.";
        }
        if (botao) {
            botao.innerText = "🗑️ Limpar Todos os Votos Atuais";
            botao.disabled = false;
        }

        const agora = new Date().toLocaleTimeString('pt-BR');
        if (caixaLog) {
            caixaLog.innerHTML = `<p style="color:#16a34a; margin: 4px 0;">[${agora}] SUCESSO: Comando de limpeza enviado à nuvem do Google.</p>` + caixaLog.innerHTML;
        }

        // Aguarda animação e recarrega o gráfico limpo
        setTimeout(() => {
            if (statusTxt) statusTxt.innerText = "";
            carregarGraficoVotacao();
        }, 3000);

    } catch (erro) {
        console.error("Falha ao limpar planilha:", erro);
        if (statusTxt) {
            statusTxt.style.color = "#dc2626";
            statusTxt.innerText = "❌ Falha na conexão local.";
        }
        if (botao) {
            botao.innerText = "🗑️ Limpar Todos os Votos Atuais";
            botao.disabled = false;
        }
    }
}


// =========================================================================
// 🔄 SISTEMA AUTO-ATUALIZADOR DE CÓDIGO (ETAG/LAST-MODIFIED POLLING)
// =========================================================================

let currentVersionTag = '';

/**
 * Consulta cabeçalhos ETag/Last-Modified do arquivo index.html no servidor para autodetectar commits/deploys
 */
async function verificarAtualizacoes() {
    try {
        // Envia requisição do tipo HEAD sem corpo, com timestamp na query para contornar qualquer CDN
        const resposta = await fetch(`./index.html?_cb=${Date.now()}`, { method: 'HEAD' });
        const etag = resposta.headers.get('etag');
        const lastModified = resposta.headers.get('last-modified');
        const versaoNoServidor = etag || lastModified;

        if (versaoNoServidor) {
            if (!currentVersionTag) {
                currentVersionTag = versaoNoServidor;
            } else if (currentVersionTag !== versaoNoServidor) {
                console.log('Nova versão de código detectada no servidor! Reiniciando painel...');
                window.location.reload();
            }
        }
    } catch (erro) {
        console.warn('Não foi possível verificar atualizações de deploy:', erro.message);
    }
}

/**
 * Inicia os temporizadores para verificação automática de updates no GitHub
 */
function iniciarVerificadorAtualizacoes() {
    setTimeout(verificarAtualizacoes, 30000);
    setInterval(verificarAtualizacoes, CONFIG_GLOBAL.sistemas.frequenciaChecagemCommitMs);
}


// =========================================================================
// 🚦 DISPARADOR PRINCIPAL DO CARREGAMENTO DO PAINEL (ON-LOAD)
// =========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // 1. Inicializa todos os textos dinâmicos da interface
    inicializarTextosInterface();

    // 2. Previsão do Tempo
    buscarPrevisaoHorizontal();
    setInterval(buscarPrevisaoHorizontal, CONFIG_GLOBAL.clima.frequenciaAtualizacaoMs);

    // 3. Relógio digital do rodapé
    atualizarDataHora();
    setInterval(atualizarDataHora, CONFIG_GLOBAL.sistemas.frequenciaRelogioMs);

    // 4. Renderização dinâmica de layouts
    renderizarProgramacao();
    renderizarCarrossel();
    gerarQRCodes();

    // 5. Adaptabilidade Responsiva
    adaptarLinkVotacaoMobile();
    window.addEventListener('resize', adaptarLinkVotacaoMobile);

    // 6. Integração da votação do cinema
    carregarGraficoVotacao();
    setInterval(carregarGraficoVotacao, CONFIG_GLOBAL.votacao.frequenciaAtualizacaoMs);

    // 7. loops de execução de Destaques e Destaque temporal da agenda
    iniciarCarrossel();
    setInterval(destacarEventoAtual, CONFIG_GLOBAL.sistemas.frequenciaDestaqueProgramacaoMs);

    // 8. Reinicialização preventiva de 4 horas
    setTimeout(() => window.location.reload(), CONFIG_GLOBAL.sistemas.frequenciaReloadCompletoMs);
});

// Evento disparado quando todos os recursos do painel estiverem prontos
window.addEventListener('load', () => {
    carregarLegendasDinamicas();
    iniciarVerificadorAtualizacoes();
});