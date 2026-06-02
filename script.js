// 🔹 DADOS DA PROGRAMAÇÃO (Edite conforme a rotina da P53)
const programacaoDia = [
    { hora: "05:00", atividade: "Café da manhã" },
    { hora: "09:00", atividade: "Lanche da manhã" },
    { hora: "11:00", atividade: "Almoço" },
    { hora: "15:00", atividade: "Lanche da tarde" },
    { hora: "18:00", atividade: "Jantar" },
    { hora: "21:00", atividade: "Lanche" },
    { hora: "23:30", atividade: "Ceia" },
];

const programacaoSemana = [
    { dia: "Dom", evento: "🥩 Churrasco de 11h ás 13h" },
    { dia: "Seg", evento: "🎤 Karaokê às 19h no cinema" },
    { dia: "Ter", evento: "🏋🏽‍♂️ Dia livre"  },
    { dia: "Qua", evento: "🍕 Pizza de 21h às 22h" },
    { dia: "Qui", evento: "🎬 Cinema às 20h" },
    { dia: "Sex", evento: "🍔 Hambúrguer de 21h às 22h" },
    { dia: "Sab", evento: "🍕 Pizza de 21h às 22h" }
    
];

const configuracoes = {
    urlinteracao: "https://cobelp53.github.io/interacao/",
    intervaloImagens: 10000
};

const destaques = [
    
    { url: "imagens/paltaformanoite1.jpeg", legenda: "Foto do mês - Plataforma P53", tempo: 7000 },
    { titulo:"Bem-Estar e Lazer em Evolução", texto: "<br>Confira as atualizações que estão transformando nossos espaços de convivência:<br><br>🎮 Nossa Sala de Jogos já está disponível! E temos fliperamas, ping-pong e mesa de carteado. Em breve Pebolim. <br><br>⚽ Reforma da Quadra: As obras na quadra estão a todo vapor! Estamos renovando a estrutura para garantir partidas com mais qualidade e segurança.<br><br>", tempo: 10000 },
    { url: "imagens/quadra.jpeg", legenda: "A bola vai voltar a rolar! A reforma da nossa quadra de futebol está a todo vapor.", tempo: 12000  },
    { url: "imagens/salajogos.jpg", legenda: "A Sala de Jogos está ficando cada dia melhor. Novidades a caminho!" /*"Depois do trabalho, Play na diversão. Nossa nova área de lazer está quase pronta." */ , tempo: 10000  },
    { url: "imagens/pipoqueiramontagem.JPG", legenda: "E o Cine Pipoca fez juz ao nome!!", tempo: 10000  }
    ];

// 🔹 FUNÇÕES

// 🔹 ADAPTA O TEXTO DE VOTAÇÃO SE FOR ACESSADO POR CELULAR
function adaptarLinkVotacaoMobile() {
    const linkVotacao = document.getElementById('link-votacao');
    
    if (linkVotacao) {
        // Verifica se a largura da tela é menor ou igual a 768px (Mobile)
        if (window.innerWidth <= 768) {
            linkVotacao.innerText = "📲 Clique aqui para votar!";
            linkVotacao.href = configuracoes.urlinteracao;
            
            // Adiciona um estilo visual amigável para parecer um botão/link clicável
            linkVotacao.style.color = "var(--petro-azul)";
            linkVotacao.style.fontWeight = "bold";
            linkVotacao.style.textDecoration = "underline";
            linkVotacao.style.cursor = "pointer";
        } else {
            // Caso a janela seja redimensionada de volta para o PC
            linkVotacao.innerText = "Use o QR Code acima para votar!";
            linkVotacao.href = "#";
            linkVotacao.style.color = "var(--texto-claro)";
            linkVotacao.style.fontWeight = "normal";
            linkVotacao.style.textDecoration = "none";
            linkVotacao.style.cursor = "default";
        }
    }
}

function renderizarProgramacao() {
    // Renderizar Dia
    const containerDia = document.getElementById('lista-programacao-dia');
    containerDia.innerHTML = programacaoDia.map(item => `
        <li><span class="hora">${item.hora}</span><span class="atividade">${item.atividade}</span></li>
    `).join('');

    // Renderizar Semana
    const containerSemana = document.getElementById('lista-programacao-semana');
    containerSemana.innerHTML = programacaoSemana.map(item => `
        <li><span class="dia">${item.dia}</span><span class="evento">${item.evento}</span></li>
    `).join('');

    destacarEventoAtual();
}

function destacarEventoAtual() {
    const agora = new Date();
    const diaHoje = agora.getDay()

    const minutosAtuais = agora.getHours() * 60 + agora.getMinutes();
    
    const itensDia = document.querySelectorAll('#lista-programacao-dia li');
    let eventoDestacado = false;

    itensDia.forEach((li, index) => {
        li.classList.remove('destaque');
        const [h, m] = programacaoDia[index].hora.split(':').map(Number);
        const minutosEvento = h * 60 + m;

        // Destaca o primeiro evento que ainda não começou ou está em andamento
        if (!eventoDestacado && minutosEvento >= minutosAtuais) {
            li.classList.add('destaque');
            eventoDestacado = true;
        }
    });
  
    const itensSemana = document.querySelectorAll('#lista-programacao-semana li');
    let semanaDestacado = false;

    itensSemana.forEach((li, index) => {
        li.classList.remove('destaque');

        // Destaca o primeiro evento que ainda não começou ou está em andamento
        if (!semanaDestacado && diaHoje == index) {
            li.classList.add('destaque');
            semanaDestacado = true;
        }
    });

    // Se todos já passaram, destaca o último como "encerrado"
    if (!eventoDestacado && itensDia.length > 0) {
        itensDia[itensDia.length - 1].classList.add('destaque');
    }

    if (!semanaDestacado && itensSemana.length > 0) {
        itensSemana[itensSemana.length - 1].classList.add('destaque');
    }

}


let indiceImagem = 0;
let timerCarrossel;

function renderizarCarrossel() {
    const container = document.getElementById('carrossel-imagens');
    if (!container) return;
    container.innerHTML = ''; 

    destaques.forEach((item, i) => {
        if (item.url) {
            const img = document.createElement('img');
            img.src = item.url;
            img.className = i === 0 ? 'ativa' : '';
            container.appendChild(img);
        } else if (item.texto) {
            const div = document.createElement('div');
            div.className = `slide-texto ${i === 0 ? 'ativa' : ''}`;
            div.innerHTML = (item.titulo ? `<h3>${item.titulo}</h3>` : '') + `<p>${item.texto}</p>`;
            container.appendChild(div);
        }
    });
    atualizarLegenda(0);
}


// 🔹 FUNÇÃO PRINCIPAL PARA MOVER O SLIDE (Aceita direção 1 ou -1)
function mudarSlide(direcao) {
    const slides = document.querySelectorAll('#carrossel-imagens > *');
    if (slides.length === 0) return;

    // Remove classe ativa do atual
    slides[indiceImagem].classList.remove('ativa');

    // Calcula próximo índice de forma infinita
    indiceImagem = (indiceImagem + direcao + slides.length) % slides.length;

    // Adiciona classe ativa ao próximo
    slides[indiceImagem].classList.add('ativa');

    // Atualiza a legenda
    atualizarLegenda(indiceImagem);
}

// 🔹 FUNÇÃO PARA CLIQUE MANUAL (Reseta o tempo para não pular rápido)
function mudarSlideManual(direcao) {
    clearTimeout(timerCarrossel); 
    mudarSlide(direcao);          
    iniciarCarrossel();           
}


function iniciarCarrossel() {
    clearTimeout(timerCarrossel);
    const tempoAtual = destaques[indiceImagem].tempo || configuracoes.intervaloImagens;
    
    timerCarrossel = setTimeout(() => {
        mudarSlide(1); // Chama a função correta
        iniciarCarrossel();
    }, tempoAtual);
}

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




function gerarQRCodes() {
    const tamanho = 185; // Tamanho ajustado para caber os dois verticalmente
    // QR interacao
    const qrinteracao = `https://api.qrserver.com/v1/create-qr-code/?size=${tamanho}x${tamanho}&data=${encodeURIComponent(configuracoes.urlinteracao)}&bgcolor=ffffff&color=006837&margin=6`;
    document.getElementById('qr-interacao').innerHTML = `<img src="${qrinteracao}" alt="QR interacao" width="${tamanho}" height="${tamanho}">`;
}

// 🔹 FUNÇÃO DE PREVISÃO DO TEMPO (COMPACTA)
async function buscarPrevisaoHorizontal() {
    const lat = -22.042;
    const lon = -41.051;
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=America%2FSao_Paulo`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        // 1. Atualiza o bloco "HOJE" (primeiro slot)
        const hojeEl = document.querySelector('.item-clima.hoje') || document.querySelector('.item-clima'); // Fallback
        if(hojeEl) {
            hojeEl.classList.add('hoje'); // Adiciona destaque visual
            document.getElementById('data-hoje').innerText = new Date().toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', '').toUpperCase();
            document.getElementById('icone-atual').innerText = traduzirWMO(data.current.weather_code).icone;
            // Mostra a temperatura atual no bloco de hoje
            document.getElementById('temp-atual').innerHTML = `${Math.round(data.current.temperature_2m)}°`;
        }

        // 2. Gera a lista dos PRÓXIMOS 4 dias (para não ficar muito longo)
        const containerSemana = document.getElementById('previsao-semana');
        containerSemana.innerHTML = '';

        // Começa do índice 1 (amanhã) até 4
        for (let i = 1; i <= 6; i++) {
            if (!data.daily.time[i]) break;
            
            const dataDia = new Date(data.daily.time[i] + "T00:00:00");
            const diaSemana = dataDia.toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', '').toUpperCase();
            const max = Math.round(data.daily.temperature_2m_max[i]);
            const min = Math.round(data.daily.temperature_2m_min[i]);
            const infoClima = traduzirWMO(data.daily.weather_code[i]);

            // Criação do bloco compacto
            const div = document.createElement('div');
            div.className = 'item-clima';
            div.innerHTML = `
                <span class="dia-nome">${diaSemana}</span>
                <span class="icone">${infoClima.icone}</span>
                <span class="temps">${max}° <span>/ ${min}°</span></span>
            `;
            containerSemana.appendChild(div);
        }

    } catch (error) {
        console.error("Erro ao buscar previsão:", error);
    }
}

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


function atualizarDataHora() {
    const agora = new Date();
    
    // Formatação completa para o Header (se ainda existir) ou uso geral
    const dd = String(agora.getDate()).padStart(2, '0');
    const mm = String(agora.getMonth() + 1).padStart(2, '0');
    const yyyy = agora.getFullYear();
    const hh = String(agora.getHours()).padStart(2, '0');
    const min = String(agora.getMinutes()).padStart(2, '0');
    const ss = String(agora.getSeconds()).padStart(2, '0');
    
    const dataFormatada = `${dd}/${mm}/${yyyy}`;
    const horaFormatada = `${hh}:${min}:${ss}`;
    const completo = `${dataFormatada} ${horaFormatada}`;

    // Atualiza o elemento do Ticker (Rodapé)
    const elTickerHora = document.getElementById('data-hora-ticker');
    if (elTickerHora) {
        elTickerHora.textContent = completo;
    }

    // Atualiza o elemento do Header (se ainda existir no HTML antigo)
    const elHeaderHora = document.getElementById('data-hora');
    if (elHeaderHora) {
        elHeaderHora.textContent = completo;
    }
}

// 🔹 GRÁFICO DE PIZZA - VOTAÇÃO GOOGLE FORMS
async function carregarGraficoVotacao() {
    Chart.register(ChartDataLabels);
    
    const CONFIG = {
        sheetId: '12uZTiil0aRZ80rlE3TNEMitlSn8E2cxZk4Srbefozk4',
        sheetName: 'Cine_pipoca_votacao',
        voteColumnIndex: 1
    };

    const url = `https://docs.google.com/spreadsheets/d/${CONFIG.sheetId}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(CONFIG.sheetName)}`;
    const loadingEl = document.getElementById('grafico-loading');
    const errorEl = document.getElementById('grafico-error');
    const canvas = document.getElementById('pieChart');

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Não foi possível acessar a planilha.');
        
        const text = await response.text();
        const jsonString = text.substring(47).slice(0, -2);
        const data = JSON.parse(jsonString);
        const rows = data.table.rows;
        
        if (!rows || rows.length === 0) throw new Error('Nenhuma resposta encontrada.');

        // Contagem dos votos
        const voteCounts = {};
        rows.forEach(row => {
            const cell = row.c[CONFIG.voteColumnIndex];
            if (cell && cell.v !== null && cell.v !== undefined) {
                const vote = String(cell.v).trim();
                if (vote) voteCounts[vote] = (voteCounts[vote] || 0) + 1;
            }
        });

        //const labels = Object.keys(voteCounts);
        //const values = Object.values(voteCounts);

        // Ordena do mais votado para o menos votado
        const ranking = Object.entries(voteCounts)
        .sort((a, b) => b[1] - a[1]);
        const labels = ranking.map(item => item[0]);
        const values = ranking.map(item => item[1]);

        // Apenas os 3 primeiros para a legenda
        const top3 = ranking.slice(0, 3).map(item => item[0]);


        const totalVotes = values.reduce((a, b) => a + b, 0);

        if (labels.length === 0) throw new Error('Nenhum voto válido encontrado.');

        // Destroi gráfico anterior se existir
        if (window.pieChartInstance) {
            window.pieChartInstance.destroy();
        }

        loadingEl.style.display = 'none';
        canvas.style.display = 'block';

        // Cria o gráfico
        window.pieChartInstance = new Chart(canvas, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    data: values,
                    backgroundColor: ['#006837', '#004B87', '#FDB913', '#FF6384', '#9966FF', '#FF9F40', '#7BC67E', '#E7E9ED'],
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
                        color: '#fff', // Cor do texto
                        anchor: 'center', // Onde o label se ancora (center, end, start)
                        align: 'end',  // Alinhamento em relação à âncora
                        font: {
                            size: 12,
                            weight: 'bold'
                        },
                        formatter: (value, ctx) => {
                            let sum = 0;
                            let dataArr = ctx.chart.data.datasets[0].data;
                            dataArr.map(data => {
                                sum += data;
                            });
                            let percentage = value;
                            
                            // Só mostra se for maior que 5% para não poluir
                            return value > 0 ? percentage : ''; 
                        }
                    },
                    legend: { 
                    position: window.innerWidth < 768 ? 'bottom' : 'bottom', // Mantém embaixo
                    align: 'center', // Centraliza a legenda no mobile para não cortar
                    labels: { 
                    font: { size: window.innerWidth < 768 ? 10 : 12 }, // Diminui a fonte no celular
                    padding: 8,
                    boxWidth: 12,
                    boxHeight: 12,
                    usePointStyle: true,
                    pointStyle: 'circle',
                    maxWidth: window.innerWidth < 768 ? 90 : 130, // Reduz a largura máxima do texto da legenda no mobile
                    filter: function(item, data) {
                    return top3.includes(item.text);
                            }
                            }
                    },
                    tooltip: {
                        callbacks: {
                            label: (ctx) => {
                                const label = ctx.label || '';
                                const value = ctx.raw || 0;
                                const percentage = totalVotes > 0 ? Math.round((value / totalVotes) * 100) : 0;
                                return `${label}: ${value} (${percentage}%)`;
                            }
                        }
                    },
                    title: {
                        display: totalVotes > 1,
                        text: `${totalVotes} votos`,
                        font: { size: 16, weight: 'bold' },
                        padding: 0
                    }
                },
                layout: { 
                    padding: { top: 1, bottom: 1, right: 1 } // 🔹 Espaço extra para a legenda
                }
            }
        });

    } catch (err) {
        console.error(err);
        loadingEl.style.display = 'none';
        canvas.style.display = 'none';
        errorEl.style.display = 'block';
        errorEl.textContent = 'Erro ao carregar gráfico.';
    }
}

// 🔹 INICIALIZAÇÃO
document.addEventListener('DOMContentLoaded', () => {
    // 🔹 PREVISÃO DO TEMPO
    buscarPrevisaoHorizontal();
    setInterval(buscarPrevisaoHorizontal, 1800000); // Atualiza a cada 30 min

    atualizarDataHora();
    setInterval(atualizarDataHora, 1000); // Atualiza a cada segundo
    
    renderizarProgramacao();
    renderizarCarrossel();
    gerarQRCodes(); 

    // Adaptar o link para mobile na inicialização e caso mude o tamanho da janela
    adaptarLinkVotacaoMobile();
    window.addEventListener('resize', adaptarLinkVotacaoMobile);

    // 🔹 Carrega gráfico de votação
    carregarGraficoVotacao();
    setInterval(carregarGraficoVotacao, 30000); // Atualiza a cada 30s

    iniciarCarrossel(); 
    setInterval(destacarEventoAtual, 60000);
    setTimeout(() => window.location.reload(), 4 * 60 * 60 * 1000);
});