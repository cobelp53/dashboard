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
    { dia: "Ter", evento: "🍔 Hambúrguer de 21h às 22h"  },
    { dia: "Qua", evento: "🍕 Pizza de 21h às 22h" },
    { dia: "Qui", evento: "🎬 Cinema às 20h" },
    { dia: "Sex", evento: "🍔 Hambúrguer de 21h às 22h" },
    { dia: "Sab", evento: "🍕 Pizza de 21h às 22h" }
    
];

const configuracoes = {
    urlHotelaria: "https://forms.gle/seu-link-hotelaria-p53",
    
    intervaloImagens: 10000
};

const destaques = [
    { src: "/dashboard/imagens/plataformadefrentedia.jpg", legenda: "Foto do mês - Plataforma P53" }
 //       titulo:"Bem-Estar e Lazer em Evolução", texto: "<br>Confira as atualizações que estão transformando nossos espaços de convivência:<br><br>🎮 Novo Espaço de Jogos: Entretenimento garantido com a montagem da área de videogames, fliperamas e ping-pong.<br><br>⚽ Reforma da Quadra: As obras na quadra de futebol estão a todo vapor! Estamos renovando a estrutura para garantir partidas com mais qualidade e segurança.<br><br>💡 Foco no Colaborador: Essas melhorias visam fortalecer a integração do nosso time e proporcionar um descanso mais completo para todos.<br><br>Fiquem atentos: o apito inicial e o 'start' nos jogos estão chegando!"},
 //   { url: "https://petrobrasbr-my.sharepoint.com/:i:/r/personal/s_wesllen_petrobras_com_br/Documents/pag53/33179.jpg?csf=1&web=1&e=9ZhgUC", legenda: "A bola vai voltar a rolar! A reforma da nossa quadra de futebol está a todo vapor." },
//    { url: "https://petrobrasbr-my.sharepoint.com/:i:/r/personal/s_wesllen_petrobras_com_br/Documents/pag53/saladejogos.jpg?csf=1&web=1&e=wWmeZ1", legenda: "Depois do trabalho, Play na diversão. Nossa nova área de lazer está quase pronta." },
 //   { url: "https://github.com/cobelp53/dashboard/blob/main/imagens/plataformadefrentedia.jpg", legenda: "Foto do mês - Plataforma P53" }
    ];

// 🔹 FUNÇÕES


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

function renderizarCarrossel() {
    const container = document.getElementById('carrossel-imagens');
    container.innerHTML = ''; // Limpa container

    destaques.forEach((item, i) => {
        if (item.url) {
            // É uma IMAGEM
            const img = document.createElement('img');
            img.src = item.url;
            img.alt = item.legenda || '';
            img.className = i === 0 ? 'ativa' : '';
            container.appendChild(img);
        } else if (item.texto) {
            // É um SLIDE DE TEXTO
            const div = document.createElement('div');
            div.className = `slide-texto ${i === 0 ? 'ativa' : ''}`;
            
            // Estrutura interna do slide de texto
            let htmlContent = '';
            if (item.titulo) {
                htmlContent += `<h3>${item.titulo}</h3>`;
            }
            htmlContent += `<p>${item.texto}</p>`;
            
            div.innerHTML = htmlContent;
            container.appendChild(div);
        }
    });

    // Atualiza a legenda inicial
    atualizarLegenda(0);
}

let indiceImagem = 0;

function rotacionarImagens() {
    const slides = document.querySelectorAll('#carrossel-imagens > *'); // Seleciona imgs E divs de texto
    if (slides.length === 0) return;

    // Remove classe ativa do atual
    slides[indiceImagem].classList.remove('ativa');

    // Calcula próximo índice
    indiceImagem = (indiceImagem + 1) % slides.length;

    // Adiciona classe ativa ao próximo
    slides[indiceImagem].classList.add('ativa');

    // Atualiza a legenda externa
    atualizarLegenda(indiceImagem);
}

function atualizarLegenda(index) {
    const item = destaques[index];
    const elLegenda = document.getElementById('legenda-imagem');
    
    if (item && item.legenda) {
        elLegenda.textContent = item.legenda;
        elLegenda.style.display = 'inline-block';
    } else {
        elLegenda.style.display = 'none';
    }
}

function gerarQRCodes() {
    const tamanho = 185; // Tamanho ajustado para caber os dois verticalmente
    // QR Hotelaria
    const qrHotelaria = `https://api.qrserver.com/v1/create-qr-code/?size=${tamanho}x${tamanho}&data=${encodeURIComponent(configuracoes.urlHotelaria)}&bgcolor=ffffff&color=006837&margin=6`;
    document.getElementById('qr-hotelaria').innerHTML = `<img src="${qrHotelaria}" alt="QR Hotelaria" width="${tamanho}" height="${tamanho}">`;
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
        sheetId: '1lkY9zEc9Fy8JeQsR9OQIcNkyu7Iq664Tg2dXYB1mAig',
        sheetName: 'resultado_votacao',
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

        const labels = Object.keys(voteCounts);
        const values = Object.values(voteCounts);
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
                        position: 'right',
                        labels: { 
                            font: { size: 12 }, 
                            padding: 10,
                            boxWidth: 20,
                            boxHeight: 20,
                            usePointStyle: true,
                            pointStyle: 'circle',
                            
                            // 🔹 NOVO: Controla largura máxima para quebrar texto longo
                            maxWidth: 130,
                            
                            // 🔹 NOVO: Filtro de segurança para evitar erro com dados vazios
                            filter: function(item, data) {
                                return item.text && item.text.length > 0;
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
                        display: true,
                        text: `Total: ${totalVotes} votos`,
                        font: { size: 16, weight: 'bold' },
                        padding: 5
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
    gerarQRCodes(); // ✅ Substitui a chamada antiga

    // 🔹 Carrega gráfico de votação
    carregarGraficoVotacao();
    setInterval(carregarGraficoVotacao, 30000); // Atualiza a cada 30s

    setInterval(rotacionarImagens, configuracoes.intervaloImagens);
    setInterval(destacarEventoAtual, 60000);
    setTimeout(() => window.location.reload(), 4 * 60 * 60 * 1000);
});
