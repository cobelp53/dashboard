// =========================================================================
// ⚙️ CONFIGURAÇÃO GLOBAL E VARIÁVEIS DO PAINEL (COBEL - P53)
// =========================================================================

/**
 * CONFIGURAÇÃO GLOBAL DO PAINEL
 * Centraliza todos os textos, intervalos de tempo, endpoints e credenciais.
 * Facilitará a integração futura com um painel de administração que altere estes valores.
 */
let CONFIG_GLOBAL = {
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
        urlBoasVindas: "https://cobelp53.github.io/dashboard/",

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
        limiteTempoVideoMs: 60000,               // Tempo limite de segurança para exibição de um vídeo (60 segundos)
        frequenciaReloadCompletoMs: 14400000,   // Recarregamento forçado da página para prevenção de travamentos (4 horas)
        frequenciaChecagemCommitMs: 180000,     // Checagem de novas versões publicadas no GitHub Pages (3 minutos)
    },

    // 🐙 Configurações públicas do repositório GitHub para sincronização de preenchimento
    github: {
        owner: "cobelp53",
        repo: "dashboard",
        branch: "main"
    }
};

// 🔹 DADOS DA ROTINA DIÁRIA (Exibida na coluna "Refeitório")
let programacaoDia = [
    { hora: "05:00", atividade: "Café da manhã" },
    { hora: "09:00", atividade: "Lanche da manhã" },
    { hora: "11:00", atividade: "Almoço" },
    { hora: "15:00", atividade: "Lanche da tarde" },
    { hora: "18:00", atividade: "Jantar" },
    { hora: "21:00", atividade: "Lanche" },
    { hora: "23:30", atividade: "Ceia" },
];

// 🔹 DADOS DA PROGRAMAÇÃO SEMANAL (Exibida na coluna "Esta Semana")
let programacaoSemana = [
    { dia: "Dom", evento: "🥩 Churrasco de 11h as 13h" },
    { dia: "Seg", evento: "🎤 Karaokê as 19h no cinema" },
    { dia: "Ter", evento: "🏋🏽‍♂️ Dia livre" },
    { dia: "Qua", evento: "🍕 Pizza de 21h as 22h" },
    { dia: "Qui", evento: "🎬 Cinema as 20h" },
    { dia: "Sex", evento: "🍔 Hambúrguer de 21h as 22h" },
    { dia: "Sab", evento: "🍕 Pizza de 21h as 22h" }
];

// 🔹 SLIDES DO CARROSSEL DE DESTAQUES (Textos/Imagens e tempos individuais em milissegundos)
// Dica: vídeos (ex: .mp4, .mov) rodam inteiros e passam para o próximo slide automaticamente quando terminam!
let destaques = [
    { tipo: "copa", tempo: 15000, visivel: true },
    { url: "imagens/paltaformanoite1.jpeg", legenda: "Foto do mês - Plataforma P53", tempo: 3000, visivel: true },
    { url: "imagens/quadra.jpeg", legenda: "A bola vai voltar a rolar! A reforma da nossa quadra de futebol está a todo vapor.", tempo: 3000, visivel: true },
    { url: "imagens/salajogos5.jpg", legenda: "A Sala de Jogos está ficando cada dia melhor. Novidades a caminho!", tempo: 8000, visivel: true },
    { url: "imagens/pipoqueiramontagem.JPG", legenda: "E o Cine Pipoca fez juz ao nome!!", tempo: 3000, visivel: true },
    { url: "imagens/karaoke.mov", legenda: "Solte a voz! Karaokê todas as segundas às 19h no cinema.", visivel: true },
    {
        titulo: "Bem-Estar e Lazer em Evolução",
        texto: "<br>Confira as atualizações que estão transformando nossos espaços de convivência:<br><br>🎮 Nossa Sala de Jogos já está disponível! E temos fliperamas, ping-pong e mesa de carteado. Em breve Pebolim. <br><br>⚽ Reforma da Quadra: As obras na quadra estão a todo vapor! Estamos renovando a estrutura para garantir partidas com mais qualidade e segurança.<br><br>",
        tempo: 10000,
        visivel: true
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
let destaquesAtivos = [];

/**
 * Renderiza os slides (Imagens, Vídeos ou Caixa de Textos Informativos) na tela
 */
function renderizarCarrossel() {
    const container = document.getElementById('carrossel-imagens');
    if (!container) return;
    container.innerHTML = '';

    // Sempre reseta para o primeiro slide para consistência com o array carregado
    indiceImagem = 0;

    // Filtra apenas os destaques marcados como visíveis
    destaquesAtivos = destaques.filter(item => item.visivel !== false);

    destaquesAtivos.forEach((item, i) => {
        if (item.tipo === "copa") {
            // Slide da Copa do Mundo 2026 com dados da API
            const div = document.createElement('div');
            div.className = `slide-texto slide-copa-container ${i === 0 ? 'ativa' : ''}`;

            const finalizados = dadosJogosCopa.filter(g => g.finished === "TRUE" || g.time_elapsed === "finished");
            const aoVivo = dadosJogosCopa.filter(g => g.finished === "FALSE" && g.time_elapsed !== "notstarted");
            const proximos = dadosJogosCopa.filter(g => g.finished === "FALSE" && g.time_elapsed === "notstarted");

            finalizados.sort((a, b) => parseInt(b.id) - parseInt(a.id));
            proximos.sort((a, b) => parseInt(a.id) - parseInt(b.id));

            const topResultados = finalizados.slice(0, 3);
            
            // Lógica especial para garantir o próximo jogo do Brasil nas Próximas Partidas
            let topProximos = [];
            const nextBrazilGame = proximos.find(g => g.home_team_name_en === "Brazil" || g.away_team_name_en === "Brazil");
            
            if (nextBrazilGame) {
                const firstTwo = proximos.slice(0, 2);
                const jaEstaNosPrimeiros = firstTwo.some(g => g.id === nextBrazilGame.id);
                
                if (jaEstaNosPrimeiros) {
                    topProximos = proximos.slice(0, 3);
                } else {
                    topProximos = [...firstTwo, nextBrazilGame];
                }
            } else {
                topProximos = proximos.slice(0, 3);
            }

            let htmlJogosAoVivo = '';
            if (aoVivo.length > 0) {
                htmlJogosAoVivo = `
                    <div class="copa-ao-vivo-secao">
                        <span class="copa-badge-aovivo">🔴 AO VIVO</span>
                        <div class="copa-jogos-aovivo-lista">
                            ${aoVivo.map(g => {
                                const isBr = g.home_team_name_en === "Brazil" || g.away_team_name_en === "Brazil";
                                return `
                                    <div class="copa-card-jogo aovivo ${isBr ? 'destaque-br' : ''}">
                                        <div class="copa-time">
                                            <span>${obterBandeiraCopa(g.home_team_name_en)}</span>
                                            <span class="nome-time">${obterAbreviacaoFIFA(g.home_team_name_en)}</span>
                                        </div>
                                        <div class="copa-placar aovivo">
                                            <span class="gols">${g.home_score}</span>
                                            <span class="vs">x</span>
                                            <span class="gols">${g.away_score}</span>
                                            <span class="tempo-jogo">${g.time_elapsed}'</span>
                                        </div>
                                        <div class="copa-time">
                                            <span class="nome-time">${obterAbreviacaoFIFA(g.away_team_name_en)}</span>
                                            <span>${obterBandeiraCopa(g.away_team_name_en)}</span>
                                        </div>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>
                `;
            }

            const htmlResultados = topResultados.map(g => {
                const isBr = g.home_team_name_en === "Brazil" || g.away_team_name_en === "Brazil";
                return `
                    <div class="copa-card-jogo ${isBr ? 'destaque-br' : ''}">
                        <div class="copa-time col-time-home">
                            <span>${obterBandeiraCopa(g.home_team_name_en)}</span>
                            <span class="nome-time">${obterAbreviacaoFIFA(g.home_team_name_en)}</span>
                        </div>
                        <div class="copa-placar">
                            <span class="gols">${g.home_score}</span>
                            <span class="vs">-</span>
                            <span class="gols">${g.away_score}</span>
                        </div>
                        <div class="copa-time col-time-away">
                            <span class="nome-time">${obterAbreviacaoFIFA(g.away_team_name_en)}</span>
                            <span>${obterBandeiraCopa(g.away_team_name_en)}</span>
                        </div>
                    </div>
                `;
            }).join('');

            const htmlProximos = topProximos.map(g => {
                const isBr = g.home_team_name_en === "Brazil" || g.away_team_name_en === "Brazil";
                return `
                    <div class="copa-card-jogo ${isBr ? 'destaque-br' : ''}">
                        <div class="copa-time col-time-home">
                            <span>${obterBandeiraCopa(g.home_team_name_en)}</span>
                            <span class="nome-time">${obterAbreviacaoFIFA(g.home_team_name_en)}</span>
                        </div>
                        <div class="copa-placar agendado">
                            <span class="data-jogo">${formatarDataJogoCopa(g.local_date, g.stadium_id)}</span>
                        </div>
                        <div class="copa-time col-time-away">
                            <span class="nome-time">${obterAbreviacaoFIFA(g.away_team_name_en)}</span>
                            <span>${obterBandeiraCopa(g.away_team_name_en)}</span>
                        </div>
                    </div>
                `;
            }).join('');

            div.innerHTML = `
                <div class="copa-widget-container">
                    <div class="copa-header">
                        <h2>🏆 COPA DO MUNDO FIFA 2026</h2>
                        <p>Acompanhamento de Resultados e Agenda</p>
                    </div>
                    ${htmlJogosAoVivo}
                    <div class="copa-colunas-container">
                        <div class="copa-coluna">
                            <h3>⚽ ÚLTIMOS JOGOS</h3>
                            <div class="copa-lista-jogos">
                                ${htmlResultados || '<p class="sem-jogos">Nenhum resultado recente.</p>'}
                            </div>
                        </div>
                        <div class="copa-coluna">
                            <h3>📅 PRÓXIMAS PARTIDAS</h3>
                            <div class="copa-lista-jogos">
                                ${htmlProximos || '<p class="sem-jogos">Nenhuma partida agendada.</p>'}
                            </div>
                        </div>
                    </div>
                </div>
            `;
            container.appendChild(div);
        } else if (item.tipo === "iframe" || item.tipo === "url") {
            // Slide contendo iframe/URL externa
            const iframe = document.createElement('iframe');
            iframe.src = item.url;
            iframe.className = i === 0 ? 'ativa' : '';
            iframe.style.border = 'none';
            iframe.style.width = '100%';
            iframe.style.height = '100%';
            iframe.style.background = '#ffffff';
            container.appendChild(iframe);
        } else if (item.url) {
            // Slide de vídeo ou imagem/GIF
            const isVideo = /\.(mp4|webm|ogg|mov)$/i.test(item.url);
            if (isVideo) {
                const video = document.createElement('video');
                video.src = item.url;
                video.className = i === 0 ? 'ativa' : '';
                video.autoplay = true;
                video.loop = false;
                video.muted = true;
                video.setAttribute('playsinline', '');
                video.setAttribute('webkit-playsinline', '');
                container.appendChild(video);
            } else {
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
function ajustarAlturaCarrosselMobile(slide) {
    const wrapper = document.querySelector('.carrossel-wrapper');
    if (wrapper) {
        wrapper.style.removeProperty('height');
    }
}

// Ouvinte de resize para ajustar a altura dinamicamente ao redimensionar a tela
window.addEventListener('resize', () => {
    const slides = document.querySelectorAll('#carrossel-imagens > *');
    if (slides.length > 0 && indiceImagem < slides.length) {
        ajustarAlturaCarrosselMobile(slides[indiceImagem]);
    }
});

function mudarSlide(direcao) {
    const slides = document.querySelectorAll('#carrossel-imagens > *');
    if (slides.length === 0) return;

    // Garante que o indiceImagem esteja dentro dos limites
    if (indiceImagem >= slides.length || indiceImagem < 0) {
        indiceImagem = 0;
    }

    // Pausa e limpa o evento onended/onerror do vídeo ativo anterior
    const slideAnterior = slides[indiceImagem];
    if (slideAnterior) {
        if (slideAnterior.tagName === 'VIDEO') {
            slideAnterior.pause();
            slideAnterior.onended = null;
            slideAnterior.onerror = null;
        }
        slideAnterior.classList.remove('ativa');
    }

    indiceImagem = (indiceImagem + direcao + slides.length) % slides.length;
    
    // Checagem de segurança pós-incremento
    if (indiceImagem >= slides.length || indiceImagem < 0) {
        indiceImagem = 0;
    }

    const novoSlide = slides[indiceImagem];
    if (novoSlide) {
        novoSlide.classList.add('ativa');
        ajustarAlturaCarrosselMobile(novoSlide);

        // Se o novo slide for vídeo, reinicia e reproduz
        if (novoSlide.tagName === 'VIDEO') {
            novoSlide.currentTime = 0;
            novoSlide.play().catch(e => console.log("Erro ao reproduzir vídeo:", e));
        }
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
 * Se o slide atual for um vídeo, aguarda sua conclusão natural para avançar.
 */
function iniciarCarrossel() {
    clearTimeout(timerCarrossel);

    const slides = document.querySelectorAll('#carrossel-imagens > *');
    if (slides.length === 0) return;

    if (indiceImagem >= slides.length || indiceImagem < 0) {
        indiceImagem = 0;
    }

    const slideAtual = slides[indiceImagem];
    if (!slideAtual) return;
    
    ajustarAlturaCarrosselMobile(slideAtual);

    if (slideAtual.tagName === 'VIDEO') {
        slideAtual.loop = false;
        slideAtual.onended = () => {
            mudarSlide(1);
            iniciarCarrossel();
        };
        slideAtual.onerror = () => {
            console.warn("Erro ao reproduzir vídeo no carrossel, pulando slide...");
            mudarSlide(1);
            iniciarCarrossel();
        };

        // Fallback de segurança: se o vídeo travar ou for muito longo, muda após o tempo limite
        const tempoSeguranca = CONFIG_GLOBAL.sistemas.limiteTempoVideoMs || 60000;
        timerCarrossel = setTimeout(() => {
            mudarSlide(1);
            iniciarCarrossel();
        }, tempoSeguranca);
    } else {
        // Se for imagem ou texto, usa o temporizador normal do CONFIG_GLOBAL
        const item = destaquesAtivos[indiceImagem];
        const tempoAtual = (item && item.tempo) || CONFIG_GLOBAL.sistemas.intervaloCarrosselPadraoMs || 10000;
        timerCarrossel = setTimeout(() => {
            mudarSlide(1);
            iniciarCarrossel();
        }, tempoAtual);
    }
}

/**
 * Atualiza o painel inferior de legenda com base no slide selecionado
 */
function atualizarLegenda(index) {
    if (index >= destaquesAtivos.length || index < 0) return;
    const item = destaquesAtivos[index];
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
    const urlDestino = CONFIG_GLOBAL.votacao.urlBoasVindas || CONFIG_GLOBAL.votacao.urlInteracaoForm;
    const urlQRCode = `https://api.qrserver.com/v1/create-qr-code/?size=${tamanho}x${tamanho}&data=${encodeURIComponent(urlDestino)}&bgcolor=ffffff&color=006837&margin=6`;

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
 * Fecha a tela de administração e retorna ao painel principal
 */
function cobelSairAdmin() {
    const telaAdmin = document.getElementById('cobel-tela-admin');
    if (telaAdmin) {
        telaAdmin.style.display = 'none';
    }
    // Recarrega a exibição do dashboard para garantir que as alterações salvas apareçam na tela
    inicializarTextosInterface();
    renderizarProgramacao();
    renderizarCarrossel();
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
        telaAdmin.style.display = 'flex'; // Usar flex para que as abas se comportem corretamente no layout vertical e permita rolagem
        cobelPopulaFormularios();
        cobelGerarLogsLocais();
    } else {
        alert('Senha incorreta!');
        campo.value = '';
        campo.focus();
    }
}

/**
 * Controla a navegação das abas da administração
 */
function cobelAbrirAba(evt, tabId) {
    const conteudos = document.querySelectorAll('.cobel-tab-conteudo');
    conteudos.forEach(c => c.classList.remove('active'));

    const links = document.querySelectorAll('.cobel-tab-link');
    links.forEach(l => l.classList.remove('active'));

    const tabElement = document.getElementById(tabId);
    if (tabElement) tabElement.classList.add('active');
    if (evt) evt.currentTarget.classList.add('active');
}

/**
 * Preenche todos os campos do formulário administrativo com a configuração ativa
 */
function cobelPopulaFormularios() {
    // 1. Configurações Gerais
    document.getElementById('cfg-cabecalhoTitulo').value = CONFIG_GLOBAL.textos.cabecalhoTitulo || "";
    document.getElementById('cfg-cabecalhoSubtitulo').value = CONFIG_GLOBAL.textos.cabecalhoSubtitulo || "";
    document.getElementById('cfg-tituloProgramacao').value = CONFIG_GLOBAL.textos.tituloProgramacao || "";
    document.getElementById('cfg-rodapeTicker').value = CONFIG_GLOBAL.textos.rodapeTicker || "";
    document.getElementById('cfg-urlInteracaoForm').value = CONFIG_GLOBAL.votacao.urlInteracaoForm || "";
    document.getElementById('cfg-urlBoasVindas').value = CONFIG_GLOBAL.votacao.urlBoasVindas || "";
    document.getElementById('cfg-sheetId').value = CONFIG_GLOBAL.votacao.sheetId || "";
    document.getElementById('cfg-sheetName').value = CONFIG_GLOBAL.votacao.sheetName || "";
    document.getElementById('cfg-urlAppsScript').value = CONFIG_GLOBAL.votacao.urlAppsScript || "";
    document.getElementById('cfg-tituloVotacaoPC').value = CONFIG_GLOBAL.textos.tituloVotacaoPC || "";
    document.getElementById('cfg-tituloVotacaoMobile').value = CONFIG_GLOBAL.textos.tituloVotacaoMobile || "";
    document.getElementById('cfg-subtituloVotacao').value = CONFIG_GLOBAL.textos.subtituloVotacao || "";
    document.getElementById('cfg-textoVotacaoPCInstrucao').value = CONFIG_GLOBAL.textos.textoVotacaoPCInstrucao || "";
    document.getElementById('cfg-rotuloVotacaoFilme').value = CONFIG_GLOBAL.textos.rotuloVotacaoFilme || "";
    document.getElementById('cfg-intervaloCarrosselPadraoMs').value = CONFIG_GLOBAL.sistemas.intervaloCarrosselPadraoMs || 10000;
    document.getElementById('cfg-senhaAdmin').value = CONFIG_GLOBAL.seguranca.senhaAdmin || "";

    // 2. Credenciais GitHub (Carrega do localStorage ou cai de volta na config global do config.json)
    document.getElementById('git-owner').value = localStorage.getItem('cobel_git_owner') || CONFIG_GLOBAL.github?.owner || "";
    document.getElementById('git-repo').value = localStorage.getItem('cobel_git_repo') || CONFIG_GLOBAL.github?.repo || "";
    document.getElementById('git-branch').value = localStorage.getItem('cobel_git_branch') || CONFIG_GLOBAL.github?.branch || "main";
    document.getElementById('git-token').value = localStorage.getItem('cobel_git_token') || "";

    // 3. Renderiza Listas Dinâmicas
    cobelRefeitorioRenderLista();
    cobelSemanaRenderLista();
    cobelCarrosselRenderLista();
}

/**
 * Renderiza a lista de horários do Refeitório na administração
 */
function cobelRefeitorioRenderLista() {
    const tbody = document.getElementById('refeitorio-lista-rows');
    if (!tbody) return;
    tbody.innerHTML = programacaoDia.map((item, index) => `
        <tr>
            <td>
                <input type="text" class="refeitorio-hora-input" value="${item.hora}" style="text-align: center;" placeholder="hh:mm">
            </td>
            <td>
                <input type="text" class="refeitorio-atividade-input" value="${item.atividade}" style="width: 100%;" placeholder="Atividade">
            </td>
            <td style="text-align:center;">
                <button class="cobel-btn-excluir" onclick="cobelRefeitorioExcluir(${index})">❌</button>
            </td>
        </tr>
    `).join('');
}

function cobelRefeitorioAdicionar() {
    cobelLerListasDaMemoriaHTML();
    programacaoDia.push({ hora: "00:00", atividade: "Nova Refeição" });
    cobelRefeitorioRenderLista();
}

function cobelRefeitorioExcluir(index) {
    cobelLerListasDaMemoriaHTML();
    programacaoDia.splice(index, 1);
    cobelRefeitorioRenderLista();
}

/**
 * Renderiza a lista de eventos semanais na administração
 */
function cobelSemanaRenderLista() {
    const tbody = document.getElementById('semana-lista-rows');
    if (!tbody) return;
    tbody.innerHTML = programacaoSemana.map((item, index) => `
        <tr>
            <td>
                <input type="text" class="semana-dia-input" value="${item.dia}" style="text-align: center;" placeholder="Ex: Seg">
            </td>
            <td>
                <input type="text" class="semana-evento-input" value="${item.evento}" style="width: 100%;" placeholder="Evento">
            </td>
            <td style="text-align:center;">
                <button class="cobel-btn-excluir" onclick="cobelSemanaExcluir(${index})">❌</button>
            </td>
        </tr>
    `).join('');
}

function cobelSemanaAdicionar() {
    cobelLerListasDaMemoriaHTML();
    programacaoSemana.push({ dia: "Seg", evento: "Nova atividade semanal" });
    cobelSemanaRenderLista();
}

function cobelSemanaExcluir(index) {
    cobelLerListasDaMemoriaHTML();
    programacaoSemana.splice(index, 1);
    cobelSemanaRenderLista();
}

/**
 * Renderiza os cards dos slides do Carrossel na administração
 */
function cobelCarrosselRenderLista() {
    const listDiv = document.getElementById('carrossel-lista-cards');
    if (!listDiv) return;
    listDiv.innerHTML = destaques.map((item, index) => {
        const isCopa = item.tipo === "copa";
        const isIframe = item.tipo === "iframe" || item.tipo === "url";
        const isText = (item.texto || item.titulo) && !isCopa && !isIframe;
        const isMedia = !isCopa && !isIframe && !isText;

        const isVideo = isMedia && item.url && /\.(mp4|webm|ogg|mov)$/i.test(item.url);
        const isImage = isMedia && item.url && !isVideo;

        let previewHTML = '';
        if (isImage) {
            previewHTML = `<img src="${item.url}" alt="Preview">`;
        } else if (isVideo) {
            previewHTML = `<video src="${item.url}" muted playsinline></video>`;
        } else if (isIframe) {
            previewHTML = `<span class="cobel-carrossel-card-preview-text">🌐</span>`;
        } else if (isCopa) {
            previewHTML = `<span class="cobel-carrossel-card-preview-text">🏆</span>`;
        } else {
            previewHTML = `<span class="cobel-carrossel-card-preview-text">📝</span>`;
        }

        let selectTipoHTML = `
            <div class="cobel-form-grupo" style="margin-bottom:8px;">
                <label style="font-size:0.8rem; font-weight: bold; color: var(--texto-claro);">Tipo de Slide:</label>
                <select onchange="cobelCarrosselMudarTipo(${index}, this.value)" style="width: 100%; padding: 4px; border-radius: 4px; border: 1px solid #cbd5e1; font-family: inherit; font-size: 0.85rem; background: white; cursor: pointer;">
                    <option value="media" ${isMedia ? 'selected' : ''}>🖼️ Imagem / Vídeo</option>
                    <option value="texto" ${isText ? 'selected' : ''}>📝 Card de Texto</option>
                    <option value="iframe" ${isIframe ? 'selected' : ''}>🌐 URL (Iframe)</option>
                    <option value="copa" ${isCopa ? 'selected' : ''}>🏆 Copa do Mundo 2026 (Automático)</option>
                </select>
            </div>
        `;

        let fieldsHTML = '';
        if (isText) {
            fieldsHTML = `
                <div class="cobel-form-grupo" style="margin-bottom:8px;">
                    <label style="font-size:0.8rem;">Título do Slide:</label>
                    <input type="text" class="carrossel-item-titulo" value="${item.titulo || ''}" placeholder="Título">
                </div>
                <div class="cobel-form-grupo" style="margin-bottom:8px;">
                    <label style="font-size:0.8rem;">Texto do Slide (aceita tags HTML):</label>
                    <textarea class="carrossel-item-texto" rows="2" style="font-family:inherit;" placeholder="Texto">${item.texto || ''}</textarea>
                </div>
            `;
        } else if (isIframe) {
            fieldsHTML = `
                <div class="cobel-form-grupo" style="margin-bottom:8px;">
                    <label style="font-size:0.8rem;">URL da página web (ex: https://previsao.open-meteo.com):</label>
                    <input type="text" class="carrossel-item-url" value="${item.url || ''}" placeholder="https://...">
                </div>
                <div class="cobel-form-grupo" style="margin-bottom:8px;">
                    <label style="font-size:0.8rem;">Legenda:</label>
                    <input type="text" class="carrossel-item-legenda" value="${item.legenda || ''}" placeholder="Legenda do frame">
                </div>
            `;
        } else if (isCopa) {
            fieldsHTML = `
                <div class="cobel-form-grupo" style="margin-bottom:8px; background: #f0fdf4; border: 1px solid #bbf7d0; padding: 10px; border-radius: 6px; flex-direction: column; align-items: flex-start; gap: 4px;">
                    <p style="margin: 0; color: #166534; font-size: 0.85rem; font-weight: bold;">🏆 Painel da Copa do Mundo FIFA 2026</p>
                    <p style="margin: 0; color: #15803d; font-size: 0.8rem; line-height: 1.3;">Este slide atualiza automaticamente com os resultados reais e a agenda de jogos a partir da API pública do torneio. Não é necessário preencher placares manualmente!</p>
                </div>
            `;
        } else {
            fieldsHTML = `
                <div class="cobel-form-grupo" style="margin-bottom:8px;">
                    <label style="font-size:0.8rem;">Caminho da mídia no GitHub (ex: imagens/sua_foto.jpg):</label>
                    <input type="text" class="carrossel-item-url" value="${item.url || ''}" placeholder="ex: imagens/foto.jpg" onchange="cobelCarrosselAtualizarUrl(${index}, this.value)">
                </div>
                <div class="cobel-form-grupo" style="margin-bottom:8px;">
                    <label style="font-size:0.8rem;">Legenda:</label>
                    <input type="text" class="carrossel-item-legenda" value="${item.legenda || ''}" placeholder="Legenda da mídia">
                </div>
            `;
        }

        fieldsHTML = selectTipoHTML + fieldsHTML;

        // Tempo individual + Visível
        fieldsHTML += `
            <div class="cobel-form-grid-2">
                <div class="cobel-form-grupo" style="margin-bottom:0;">
                    <label style="font-size:0.8rem;">Duração Individual (ms - opcional):</label>
                    <input type="number" class="carrossel-item-tempo" value="${item.tempo || ''}" placeholder="Padrão: 10000">
                </div>
                <div class="cobel-form-grupo" style="margin-bottom:0; flex-direction: row; align-items: center; justify-content: space-between; gap: 8px;">
                    <div style="display: flex; align-items: center; gap: 6px;">
                        <input type="checkbox" class="carrossel-item-visivel" ${item.visivel !== false ? 'checked' : ''} style="width: auto; cursor: pointer;">
                        <label style="font-size:0.85rem; font-weight: bold; color: var(--texto); cursor: pointer; margin: 0;">Visível no Painel</label>
                    </div>
                    <span style="font-size: 0.85rem; font-weight: bold; color: var(--petro-azul);">Tipo: ${isText ? "Texto" : isCopa ? "Copa 2026" : isIframe ? "Iframe" : isVideo ? "Vídeo" : "Imagem"}</span>
                </div>
            </div>
        `;

        return `
            <div class="cobel-carrossel-card" data-index="${index}">
                <div class="cobel-carrossel-card-preview">
                    ${previewHTML}
                </div>
                <div class="cobel-carrossel-card-info">
                    ${fieldsHTML}
                </div>
                <div class="cobel-carrossel-card-controles">
                    <div>
                        <button class="cobel-btn-ordenar" onclick="cobelCarrosselMover(${index}, -1)">⬆️</button>
                        <button class="cobel-btn-ordenar" onclick="cobelCarrosselMover(${index}, 1)">⬇️</button>
                    </div>
                    <button class="cobel-btn-excluir" onclick="cobelCarrosselExcluir(${index})" style="margin-top:10px; width:100%;">❌ Excluir</button>
                </div>
            </div>
        `;
    }).join('');
}

function cobelCarrosselMudarTipo(index, novoTipo) {
    cobelLerListasDaMemoriaHTML();
    const item = destaques[index];
    
    // Reseta propriedades
    delete item.titulo;
    delete item.texto;
    delete item.url;
    delete item.legenda;
    delete item.tipo;
    
    if (novoTipo === "texto") {
        item.titulo = "Novo Card";
        item.texto = "Insira o texto aqui...";
    } else if (novoTipo === "iframe") {
        item.url = "https://";
        item.tipo = "iframe";
        item.legenda = "";
    } else if (novoTipo === "copa") {
        item.tipo = "copa";
    } else {
        item.url = "imagens/seu_arquivo.jpg";
        item.legenda = "Legenda do slide";
    }
    
    cobelCarrosselRenderLista();
}

function cobelCarrosselAdicionarTexto() {
    cobelLerListasDaMemoriaHTML();
    destaques.push({ titulo: "Novo Slide", texto: "Insira seu texto informativo aqui...", tempo: 10000 });
    cobelCarrosselRenderLista();
}

function cobelCarrosselAdicionarMidia() {
    cobelLerListasDaMemoriaHTML();
    destaques.push({ url: "imagens/seu_arquivo.jpg", legenda: "Legenda da nova mídia", tempo: 10000 });
    cobelCarrosselRenderLista();
}

function cobelCarrosselAtualizarUrl(index, valor) {
    cobelLerListasDaMemoriaHTML();
    destaques[index].url = valor.trim();
    cobelCarrosselRenderLista();
}

function cobelCarrosselExcluir(index) {
    cobelLerListasDaMemoriaHTML();
    destaques.splice(index, 1);
    cobelCarrosselRenderLista();
}

function cobelCarrosselMover(index, direcao) {
    cobelLerListasDaMemoriaHTML();
    const novoIndex = index + direcao;
    if (novoIndex < 0 || novoIndex >= destaques.length) return;
    
    // Inverte os itens no array
    const temp = destaques[index];
    destaques[index] = destaques[novoIndex];
    destaques[novoIndex] = temp;
    
    cobelCarrosselRenderLista();
}

/**
 * Lê os campos digitados na interface da administração e os salva nas variáveis na memória do JS
 */
function cobelLerListasDaMemoriaHTML() {
    // 1. Lê Refeitório
    const refeitorioRows = document.querySelectorAll('#refeitorio-lista-rows tr');
    const novoRefeitorio = [];
    refeitorioRows.forEach(row => {
        const hora = row.querySelector('.refeitorio-hora-input').value.trim();
        const atividade = row.querySelector('.refeitorio-atividade-input').value.trim();
        if (hora || atividade) {
            novoRefeitorio.push({ hora, atividade });
        }
    });
    if (refeitorioRows.length > 0 || programacaoDia.length === 0) {
        programacaoDia = novoRefeitorio;
    }

    // 2. Lê Semana
    const semanaRows = document.querySelectorAll('#semana-lista-rows tr');
    const novaSemana = [];
    semanaRows.forEach(row => {
        const dia = row.querySelector('.semana-dia-input').value.trim();
        const evento = row.querySelector('.semana-evento-input').value.trim();
        if (dia || evento) {
            novaSemana.push({ dia, evento });
        }
    });
    if (semanaRows.length > 0 || programacaoSemana.length === 0) {
        programacaoSemana = novaSemana;
    }

    // 3. Lê Carrossel
    const carrosselCards = document.querySelectorAll('#carrossel-lista-cards .cobel-carrossel-card');
    const novosDestaques = [];
    carrosselCards.forEach(card => {
        const idx = parseInt(card.getAttribute('data-index'));
        const itemOriginal = destaques[idx];
        const itemNovo = { ...itemOriginal };

        const inputTitulo = card.querySelector('.carrossel-item-titulo');
        const inputTexto = card.querySelector('.carrossel-item-texto');
        const inputUrl = card.querySelector('.carrossel-item-url');
        const inputLegenda = card.querySelector('.carrossel-item-legenda');

        delete itemNovo.titulo;
        delete itemNovo.texto;
        delete itemNovo.url;
        delete itemNovo.legenda;

        if (inputTitulo && inputTexto) {
            itemNovo.titulo = inputTitulo.value.trim();
            itemNovo.texto = inputTexto.value.trim();
            delete itemNovo.tipo;
        } else if (inputUrl && inputLegenda) {
            itemNovo.url = inputUrl.value.trim();
            itemNovo.legenda = inputLegenda.value.trim();
            if (itemOriginal.tipo === "iframe" || itemOriginal.tipo === "url") {
                itemNovo.tipo = "iframe";
            }
        } else if (itemOriginal.tipo === "copa") {
            itemNovo.tipo = "copa";
        } else {
            if (itemOriginal.url) itemNovo.url = itemOriginal.url;
            if (itemOriginal.legenda) itemNovo.legenda = itemOriginal.legenda;
            if (itemOriginal.tipo) itemNovo.tipo = itemOriginal.tipo;
        }

        const inputTempo = card.querySelector('.carrossel-item-tempo');
        if (inputTempo && inputTempo.value.trim()) {
            itemNovo.tempo = parseInt(inputTempo.value.trim());
        } else {
            delete itemNovo.tempo;
        }

        const inputVisivel = card.querySelector('.carrossel-item-visivel');
        if (inputVisivel) {
            itemNovo.visivel = inputVisivel.checked;
        } else {
            itemNovo.visivel = true;
        }

        novosDestaques.push(itemNovo);
    });
    if (carrosselCards.length > 0 || destaques.length === 0) {
        destaques = novosDestaques;
    }
}

/**
 * Função utilitária para fazer commit de arquivos no GitHub usando a REST API
 */
async function cobelGitCommitFile(owner, repo, branch, token, path, contentBase64, message) {
    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
    
    // 1. Tenta pegar o SHA do arquivo anterior se ele existir (obrigatório para updates)
    let sha = null;
    try {
        const getRes = await fetch(`${url}?ref=${branch}`, {
            headers: {
                'Authorization': `token ${token}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });
        if (getRes.ok) {
            const fileInfo = await getRes.json();
            sha = fileInfo.sha;
        }
    } catch (e) {
        console.log("Arquivo não existe no repositório ainda, será criado um novo.");
    }

    // 2. Cria o body do commit
    const body = {
        message: message,
        content: contentBase64,
        branch: branch
    };
    if (sha) body.sha = sha;

    // 3. PUT request para commitar
    const putRes = await fetch(url, {
        method: 'PUT',
        headers: {
            'Authorization': `token ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/vnd.github.v3+json'
        },
        body: JSON.stringify(body)
    });

    if (!putRes.ok) {
        const errText = await putRes.text();
        throw new Error(`Erro na API do GitHub: ${putRes.status} - ${errText}`);
    }
    return await putRes.json();
}

/**
 * Agrupa toda a configuração da tela administrativa e envia para o GitHub Pages (config.json)
 */
async function cobelSalvarConfiguracaoCompleta() {
    // 1. Lê os dados atuais digitados nas tabelas/lists
    cobelLerListasDaMemoriaHTML();
    
    // 2. Lê as configurações gerais dos inputs
    CONFIG_GLOBAL.textos.cabecalhoTitulo = document.getElementById('cfg-cabecalhoTitulo').value.trim();
    CONFIG_GLOBAL.textos.cabecalhoSubtitulo = document.getElementById('cfg-cabecalhoSubtitulo').value.trim();
    CONFIG_GLOBAL.textos.tituloProgramacao = document.getElementById('cfg-tituloProgramacao').value.trim();
    CONFIG_GLOBAL.textos.rodapeTicker = document.getElementById('cfg-rodapeTicker').value.trim();
    CONFIG_GLOBAL.votacao.urlInteracaoForm = document.getElementById('cfg-urlInteracaoForm').value.trim();
    CONFIG_GLOBAL.votacao.urlBoasVindas = document.getElementById('cfg-urlBoasVindas').value.trim();
    CONFIG_GLOBAL.votacao.sheetId = document.getElementById('cfg-sheetId').value.trim();
    CONFIG_GLOBAL.votacao.sheetName = document.getElementById('cfg-sheetName').value.trim();
    CONFIG_GLOBAL.votacao.urlAppsScript = document.getElementById('cfg-urlAppsScript').value.trim();
    CONFIG_GLOBAL.textos.tituloVotacaoPC = document.getElementById('cfg-tituloVotacaoPC').value.trim();
    CONFIG_GLOBAL.textos.tituloVotacaoMobile = document.getElementById('cfg-tituloVotacaoMobile').value.trim();
    CONFIG_GLOBAL.textos.subtituloVotacao = document.getElementById('cfg-subtituloVotacao').value.trim();
    CONFIG_GLOBAL.textos.textoVotacaoPCInstrucao = document.getElementById('cfg-textoVotacaoPCInstrucao').value.trim();
    CONFIG_GLOBAL.textos.rotuloVotacaoFilme = document.getElementById('cfg-rotuloVotacaoFilme').value.trim();
    CONFIG_GLOBAL.sistemas.intervaloCarrosselPadraoMs = parseInt(document.getElementById('cfg-intervaloCarrosselPadraoMs').value.trim()) || 10000;
    CONFIG_GLOBAL.seguranca.senhaAdmin = document.getElementById('cfg-senhaAdmin').value.trim();

    // 3. Lê credenciais do GitHub
    const owner = document.getElementById('git-owner').value.trim();
    const repo = document.getElementById('git-repo').value.trim();
    const branch = document.getElementById('git-branch').value.trim() || 'main';
    const token = document.getElementById('git-token').value.trim();

    const statusDiv = document.getElementById('cobel-status-global');
    const saveBtn = document.getElementById('cobel-btn-salvar-geral');

    if (!owner || !repo || !token) {
        alert("⚠️ ATENÇÃO: Para salvar as configurações de forma persistente, você precisa preencher o Dono, Repositório e Token do GitHub na aba 'Integração GitHub'.");
        cobelAbrirAba(null, 'tab-github');
        const tabGithubLink = document.querySelector('[onclick*="tab-github"]');
        if (tabGithubLink) {
            document.querySelectorAll('.cobel-tab-link').forEach(l => l.classList.remove('active'));
            tabGithubLink.classList.add('active');
        }
        return;
    }

    if (/\s/.test(owner) || /\s/.test(repo)) {
        alert("⚠️ ATENÇÃO: O Dono ou o Repositório do GitHub não podem conter espaços! Por favor, corrija na aba 'Integração GitHub'. (Exemplo correto: Dono: cobelp53 | Repositório: dashboard)");
        cobelAbrirAba(null, 'tab-github');
        const tabGithubLink = document.querySelector('[onclick*="tab-github"]');
        if (tabGithubLink) {
            document.querySelectorAll('.cobel-tab-link').forEach(l => l.classList.remove('active'));
            tabGithubLink.classList.add('active');
        }
        return;
    }

    // Salva as credenciais do GitHub no localStorage do navegador para comodidade
    localStorage.setItem('cobel_git_owner', owner);
    localStorage.setItem('cobel_git_repo', repo);
    localStorage.setItem('cobel_git_branch', branch);
    localStorage.setItem('cobel_git_token', token);

    // Salva na configuração global para compartilhar dados públicos do repositório com outros dispositivos (como celular)
    CONFIG_GLOBAL.github = {
        owner: owner,
        repo: repo,
        branch: branch
    };

    // Feedback visual de salvamento
    if (statusDiv) {
        statusDiv.style.display = 'block';
        statusDiv.style.background = '#dbeafe';
        statusDiv.style.color = '#1e40af';
        statusDiv.style.borderLeft = '4px solid #3b82f6';
        statusDiv.innerText = "⏳ Conectando à API do GitHub e enviando arquivo de configuração config.json...";
    }
    if (saveBtn) {
        saveBtn.disabled = true;
        saveBtn.innerText = "⏳ Salvando...";
    }

    try {
        // Monta o JSON final correspondente
        const configOutput = {
            CONFIG_GLOBAL,
            programacaoDia,
            programacaoSemana,
            destaques
        };
        const configStr = JSON.stringify(configOutput, null, 2);
        // Codifica a string JSON em Base64 de forma segura contra acentos/UTF-8
        const configBase64 = btoa(unescape(encodeURIComponent(configStr)));

        // Realiza o commit no GitHub
        await cobelGitCommitFile(owner, repo, branch, token, "config.json", configBase64, "chore: atualizacao de configuracoes via painel admin");

        if (statusDiv) {
            statusDiv.style.background = '#dcfce7';
            statusDiv.style.color = '#166534';
            statusDiv.style.borderLeft = '4px solid #22c55e';
            statusDiv.innerText = "✨ Configurações salvas e publicadas no GitHub com sucesso! O site principal atualizará sozinho nas telas em cerca de 1 a 2 minutos.";
        }
        if (saveBtn) {
            saveBtn.disabled = false;
            saveBtn.innerText = "💾 Salvar Tudo no GitHub";
        }

        // Atualiza a tela de visualização por trás imediatamente
        inicializarTextosInterface();
        renderizarProgramacao();
        renderizarCarrossel();
        cobelPopulaFormularios(); // Re-popula para garantir índices corretos

        setTimeout(() => {
            if (statusDiv) statusDiv.style.display = 'none';
        }, 8000);

    } catch (erro) {
        console.error("Erro ao commitar config.json no GitHub:", erro);
        if (statusDiv) {
            statusDiv.style.background = '#fee2e2';
            statusDiv.style.color = '#991b1b';
            statusDiv.style.borderLeft = '4px solid #ef4444';
            statusDiv.innerText = `❌ Falha ao tentar salvar no GitHub: ${erro.message}`;
        }
        if (saveBtn) {
            saveBtn.disabled = false;
            saveBtn.innerText = "💾 Salvar Tudo no GitHub";
        }
    }
}

/**
 * Faz upload de imagem/vídeo para a pasta imagens/ do GitHub e adiciona ao carrossel
 */
async function cobelCarrosselFazerUpload(inputElement) {
    const file = inputElement.files[0];
    if (!file) return;

    const owner = document.getElementById('git-owner').value.trim();
    const repo = document.getElementById('git-repo').value.trim();
    const branch = document.getElementById('git-branch').value.trim() || 'main';
    const token = document.getElementById('git-token').value.trim();

    if (!owner || !repo || !token) {
        alert("⚠️ ATENÇÃO: Configure e salve as credenciais do GitHub na aba 'Integração GitHub' antes de fazer upload de arquivos.");
        inputElement.value = '';
        cobelAbrirAba(null, 'tab-github');
        const tabGithubLink = document.querySelector('[onclick*="tab-github"]');
        if (tabGithubLink) {
            document.querySelectorAll('.cobel-tab-link').forEach(l => l.classList.remove('active'));
            tabGithubLink.classList.add('active');
        }
        return;
    }

    if (/\s/.test(owner) || /\s/.test(repo)) {
        alert("⚠️ ATENÇÃO: O Dono ou o Repositório do GitHub não podem conter espaços! Por favor, corrija na aba 'Integração GitHub'. (Exemplo correto: Dono: cobelp53 | Repositório: dashboard)");
        inputElement.value = '';
        cobelAbrirAba(null, 'tab-github');
        const tabGithubLink = document.querySelector('[onclick*="tab-github"]');
        if (tabGithubLink) {
            document.querySelectorAll('.cobel-tab-link').forEach(l => l.classList.remove('active'));
            tabGithubLink.classList.add('active');
        }
        return;
    }

    const statusDiv = document.getElementById('cobel-status-global');
    if (statusDiv) {
        statusDiv.style.display = 'block';
        statusDiv.style.background = '#dbeafe';
        statusDiv.style.color = '#1e40af';
        statusDiv.style.borderLeft = '4px solid #3b82f6';
        statusDiv.innerText = `⏳ Convertendo e enviando o arquivo ${file.name} para a pasta imagens/ no GitHub (isso pode levar alguns segundos dependendo do tamanho)...`;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
        try {
            const dataUrl = e.target.result;
            const base64Content = dataUrl.split(',')[1];
            
            // Corrige o nome do arquivo para evitar acentos e espaços estranhos
            const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '_');
            const path = `imagens/${safeName}`;

            // 1. Commita o arquivo de mídia
            await cobelGitCommitFile(owner, repo, branch, token, path, base64Content, `media: upload do arquivo ${safeName} via painel admin`);

            // 2. Adiciona o slide na memória do carrossel
            cobelLerListasDaMemoriaHTML();
            destaques.push({
                url: path,
                legenda: `Novo Slide - ${safeName.split('.')[0]}`
            });

            // 3. Salva a nova configuração com o slide adicionado no config.json do GitHub
            await cobelSalvarConfiguracaoCompleta();

            alert(`🎉 Sucesso! O arquivo ${safeName} foi enviado e adicionado ao carrossel.`);
        } catch (erro) {
            console.error("Erro no upload do arquivo:", erro);
            alert(`❌ Falha no upload do arquivo de mídia: ${erro.message}`);
            if (statusDiv) statusDiv.style.display = 'none';
        } finally {
            inputElement.value = '';
        }
    };
    
    // Lê o arquivo como DataURL (Base64)
    reader.readAsDataURL(file);
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

/**
 * Tenta carregar a configuração dinâmica do config.json
 */
async function carregarConfiguracao() {
    try {
        const resposta = await fetch('./config.json');
        if (resposta.ok) {
            const config = await resposta.json();
            if (config.CONFIG_GLOBAL) CONFIG_GLOBAL = config.CONFIG_GLOBAL;
            if (config.programacaoDia) programacaoDia = config.programacaoDia;
            if (config.programacaoSemana) programacaoSemana = config.programacaoSemana;
            if (config.destaques) destaques = config.destaques;
            console.log("Configurações dinâmicas carregadas com sucesso.");
        } else {
            console.warn("config.json não pôde ser carregado, usando fallbacks locais.");
        }
    } catch (erro) {
        console.warn("Erro ao ler config.json (isso é normal localmente sem servidor), usando padrões locais:", erro.message);
    }
}

// =========================================================================
// 🏆 LÓGICA E INTEGRAÇÃO DO WIDGET DA COPA DO MUNDO 2026
// =========================================================================

const traducaoPaisesCopa = {
    "Brazil": "Brasil", "Germany": "Alemanha", "Spain": "Espanha", "Argentina": "Argentina", "France": "França",
    "Belgium": "Bélgica", "Portugal": "Portugal", "Croatia": "Croácia", "Netherlands": "Holanda", "England": "Inglaterra",
    "Mexico": "México", "Italy": "Itália", "Uruguay": "Uruguai", "Colombia": "Colômbia", "Morocco": "Marrocos",
    "Switzerland": "Suíça", "Japan": "Japão", "South Korea": "Coreia do Sul", "United States": "Estados Unidos",
    "South Africa": "África do Sul", "Czech Republic": "República Tcheca", "Canada": "Canadá",
    "Bosnia and Herzegovina": "Bósnia e Herzegovina", "Paraguay": "Paraguai", "Haiti": "Haiti", "Scotland": "Escócia",
    "Australia": "Austrália", "Turkey": "Turquia", "Qatar": "Catar", "Ivory Coast": "Costa do Marfim",
    "Ecuador": "Equador", "Curaçao": "Curaçao", "Tunisia": "Tunísia", "Sweden": "Suécia", "Iran": "Irã",
    "New Zealand": "Nova Zelândia", "Saudi Arabia": "Arábia Saudita", "Cape Verde": "Cabo Verde", "Egypt": "Egito",
    "Senegal": "Senegal", "Iraq": "Iraque", "Norway": "Noruega", "Algeria": "Argélia", "Austria": "Áustria",
    "Jordan": "Jordânia", "Democratic Republic of the Congo": "RD do Congo", "Uzbekistan": "Uzbequistão", "Ghana": "Gana",
    "Panama": "Panamá", "Chile": "Chile", "Denmark": "Dinamarca", "Poland": "Polônia", "Ukraine": "Ucrânia",
    "Peru": "Peru", "Venezuela": "Venezuela"
};

const bandeirasPaisesCopa = {
    "Brazil": "🇧🇷", "Germany": "🇩🇪", "Spain": "🇪🇸", "Argentina": "🇦🇷", "France": "🇫🇷",
    "Belgium": "🇧🇪", "Portugal": "🇵🇹", "Croatia": "🇭🇷", "Netherlands": "🇳🇱", "England": "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    "Mexico": "🇲🇽", "Uruguay": "🇺🇾", "Colombia": "🇨🇴", "Morocco": "🇲🇦", "Switzerland": "🇨🇭",
    "Japan": "🇯🇵", "South Korea": "🇰🇷", "United States": "🇺🇸", "South Africa": "🇿🇦",
    "Czech Republic": "🇨🇿", "Canada": "🇨🇦", "Bosnia and Herzegovina": "🇧🇦", "Paraguay": "🇵🇾",
    "Haiti": "🇧🇭", "Scotland": "🏴󠁧󠁢󠁳󠁣󠁴󠁿", "Australia": "🇦🇺", "Turkey": "🇹🇷", "Qatar": "🇶🇦",
    "Ivory Coast": "🇨🇮", "Ecuador": "🇪🇨", "Curaçao": "🇨🇼", "Tunisia": "🇹🇳", "Sweden": "🇸🇪",
    "Iran": "🇮🇷", "New Zealand": "🇳🇿", "Saudi Arabia": "🇸🇦", "Cape Verde": "🇨🇻", "Egypt": "🇪🇬",
    "Senegal": "🇸🇳", "Iraq": "🇮🇶", "Norway": "🇳🇴", "Algeria": "🇩🇿", "Austria": "🇦🇹",
    "Jordan": "🇯🇴", "Democratic Republic of the Congo": "🇨🇩", "Uzbekistan": "🇺🇿", "Ghana": "🇬🇭",
    "Panama": "🇵🇦", "Chile": "🇨🇱", "Denmark": "🇩🇰", "Poland": "🇵🇱", "Ukraine": "🇺🇦",
    "Peru": "🇵🇪", "Venezuela": "🇻🇪"
};

const fifaPaisesCopa = {
    "Canada": "CAN", "Mexico": "MEX", "United States": "USA",
    "Argentina": "ARG", "Brazil": "BRA", "France": "FRA",
    "Spain": "ESP", "England": "ENG", "Portugal": "POR",
    "Belgium": "BEL", "Croatia": "CRO", "Netherlands": "NED",
    "Italy": "ITA", "Germany": "GER", "Uruguay": "URU",
    "Colombia": "COL", "Morocco": "MAR", "Japan": "JPN",
    "Senegal": "SEN", "Ecuador": "ECU", "Switzerland": "SUI",
    "Algeria": "ALG", "Bosnia and Herzegovina": "BIH",
    "Democratic Republic of the Congo": "COD", "Ukraine": "UKR",
    "Poland": "POL", "Denmark": "DEN", "Chile": "CHI",
    "Panama": "PAN", "Ghana": "GHA", "Uzbekistan": "UZB",
    "Jordan": "JOR", "Peru": "PER", "Venezuela": "VEN",
    "Republic of Korea": "KOR", "South Korea": "KOR",
    "Czech Republic": "CZE", "South Africa": "RSA",
    "Qatar": "QAT", "Austria": "AUT"
};

let dadosJogosCopa = [];

function obterAbreviacaoFIFA(nome) {
    if (!nome) return "TBD";
    return fifaPaisesCopa[nome] || nome.substring(0, 3).toUpperCase();
}

function traduzirPaisCopa(nome) {
    if (!nome) return "TBD";
    return traducaoPaisesCopa[nome] || nome;
}

function obterBandeiraCopa(nome) {
    if (!nome) return "🏳️";
    return bandeirasPaisesCopa[nome] || "🏳️";
}

function formatarDataJogoCopa(localDateStr, stadiumId) {
    if (!localDateStr) return "";
    
    // Parse da data local: "DD/MM/YYYY HH:MM"
    const partes = localDateStr.split(" ");
    if (partes.length < 2) return localDateStr;
    const dataPartes = partes[0].split("/");
    const horaPartes = partes[1].split(":");
    if (dataPartes.length < 3 || horaPartes.length < 2) return localDateStr;
    
    const mes = parseInt(dataPartes[0]) - 1; // 0-based (Mês primeiro no formato MM/DD/YYYY da API)
    const dia = parseInt(dataPartes[1]);     // Dia segundo
    const ano = parseInt(dataPartes[2]);
    const hora = parseInt(horaPartes[0]);
    const minuto = parseInt(horaPartes[1]);
    
    const dataRef = new Date(ano, mes, dia, hora, minuto);
    
    // Converte o horário do estádio para o Horário de Brasília (UTC-3)
    let offsetHoras = 0;
    const sId = String(stadiumId);
    
    if (["1", "2", "3"].includes(sId)) {
        // México (CDMX, Guadalajara, Monterrey): CST (UTC-6) -> BRT (UTC-3) = +3h
        offsetHoras = 3;
    } else if (["4", "5", "6"].includes(sId)) {
        // EUA Central (Dallas, Houston, Kansas City): CDT (UTC-5) -> BRT (UTC-3) = +2h
        offsetHoras = 2;
    } else if (["7", "8", "9", "10", "11", "12"].includes(sId)) {
        // Costa Leste (Miami, New York, Boston, Philadelphia, Atlanta, Toronto): EDT (UTC-4) -> BRT (UTC-3) = +1h
        offsetHoras = 1;
    } else if (["13", "14", "15", "16"].includes(sId)) {
        // Costa Oeste (Los Angeles, San Francisco, Seattle, Vancouver): PDT (UTC-7) -> BRT (UTC-3) = +4h
        offsetHoras = 4;
    }
    
    dataRef.setHours(dataRef.getHours() + offsetHoras);
    
    const dd = String(dataRef.getDate()).padStart(2, '0');
    const mm = String(dataRef.getMonth() + 1).padStart(2, '0');
    const hh = String(dataRef.getHours()).padStart(2, '0');
    const min = String(dataRef.getMinutes()).padStart(2, '0');
    
    return `${dd}/${mm} - ${hh}:${min}`;
}

async function buscarDadosCopa() {
    const url = "https://worldcup26.ir/get/games";
    try {
        const res = await fetch(url);
        if (res.ok) {
            const data = await res.json();
            if (data && data.games && Array.isArray(data.games)) {
                dadosJogosCopa = data.games;
                localStorage.setItem('cobel_copa_jogos', JSON.stringify(dadosJogosCopa));
                console.log("Dados da Copa do Mundo 2026 atualizados via API.");
                return;
            }
        }
    } catch (e) {
        console.warn("Erro ao buscar API da Copa, usando cache local:", e.message);
    }

    const cached = localStorage.getItem('cobel_copa_jogos');
    if (cached) {
        dadosJogosCopa = JSON.parse(cached);
    } else {
        // Fallback inicial estático
        dadosJogosCopa = [
            { id: "83", home_team_name_en: "Portugal", away_team_name_en: "Croatia", home_score: "0", away_score: "0", finished: "FALSE", time_elapsed: "notstarted", local_date: "07/02/2026 19:00", stadium_id: "12", type: "r32" },
            { id: "84", home_team_name_en: "Spain", away_team_name_en: "Austria", home_score: "0", away_score: "0", finished: "FALSE", time_elapsed: "notstarted", local_date: "07/02/2026 12:00", stadium_id: "16", type: "r32" },
            { id: "85", home_team_name_en: "Switzerland", away_team_name_en: "Algeria", home_score: "0", away_score: "0", finished: "FALSE", time_elapsed: "notstarted", local_date: "07/02/2026 20:00", stadium_id: "13", type: "r32" },
            { id: "82", home_team_name_en: "Belgium", away_team_name_en: "Senegal", home_score: "3", away_score: "2", finished: "TRUE", time_elapsed: "finished", local_date: "07/01/2026 13:00", stadium_id: "14", type: "r32" },
            { id: "81", home_team_name_en: "United States", away_team_name_en: "Bosnia and Herzegovina", home_score: "2", away_score: "0", finished: "TRUE", time_elapsed: "finished", local_date: "07/01/2026 17:00", stadium_id: "15", type: "r32" }
        ];
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    // 0. Carrega a configuração dinâmica externa
    await carregarConfiguracao();

    // Busca dados da Copa do Mundo 2026
    await buscarDadosCopa();
    setInterval(buscarDadosCopa, 900000); // Atualiza a cada 15 minutos

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
    iniciarVerificadorAtualizacoes();
});