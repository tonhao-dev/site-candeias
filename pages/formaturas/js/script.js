AOS.init();
// Menu  hamburger
const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector(".nav");

 hamburger.addEventListener('click', function() {
        // Obtenha a posição atual antes de qualquer mudança
        const rect = hamburger.getBoundingClientRect();
        const topPosition = rect.top;
        const rightPosition = window.innerWidth - rect.right;
        
        // Toggle a classe active
        nav.classList.toggle('active');
        
        // Se o menu estiver ativo, fixe o botão na posição exata onde estava
        if (nav.classList.contains('active')) {
            hamburger.style.position = 'fixed';
            hamburger.style.top = topPosition + 'px';
            hamburger.style.right = rightPosition + 'px';
        } else {
            // Quando fechado, remove os estilos inline
            hamburger.style.position = '';
            hamburger.style.top = '';
            hamburger.style.right = '';
        }
    });

    // Button Voltar ao topo
document.addEventListener('DOMContentLoaded', function () {
    const backToTopButton = document.getElementById('backToTop');

    // Mostrar/esconder botão baseado na posição do scroll
    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 300) { // Mostra depois de 300px de scroll
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });

    // Função para rolar suavemente para o topo
    backToTopButton.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
// Dados dos mestres
const mestres = {
    sarara: {
        nome: "Mestre Sapin",
        apelido: "Nome",
        atuacao: "Rio Branco - Acre - (Brasil)",
        nacionalidade: "Nacionalidade",
        img: "#",
        bandeira: "../../assets/images/conselho-mestres/Nacionalidades/Bandeira-Brasil.png",
        historia: "Mestre Vento é um capoeirista renomado, atuando há anos no desenvolvimento da cultura da capoeira no Acre e em todo o Brasil.",
        inicio: "Ano ou data de início",
        nucleo: "Nome do núcleo"
    },
    xoroquinho: {
        nome: "Mestre Joia",
        apelido: "Nome",
        atuacao: "Rio Branco - Acre - (Brasil)",
        nacionalidade: "Nacionalidade",
        img: "#",
        bandeira: "../../assets/images/conselho-mestres/Nacionalidades/Bandeira-Brasil.png",
        historia: "Cortramestre Riquinho é um capoeirista renomado, atuando há anos no desenvolvimento da cultura da capoeira no Acre e em todo o Brasil.",
        inicio: "Ano ou data de início",
        nucleo: "Nome do núcleo"
    },
    piau: {
        nome: "Mestre Darlan",
        apelido: "Nome",
        atuacao: "Rio Branco - Acre - (Brasil)",
        nacionalidade: "Nacionalidade",
        img: "#",
        bandeira: "../../assets/images/conselho-mestres/Nacionalidades/Bandeira-Brasil.png",
        historia: "Mestre Contramestre Zagarra é um capoeirista renomado, atuando há anos no desenvolvimento da cultura da capoeira no Acre e em todo o Brasil.",
        inicio: "Ano ou data de início",
        nucleo: "Nome do núcleo"
    },
    // Adicione outros mestres aqui
};

// Seletores
const botoes = document.querySelectorAll('.button-saiba-mais');
const modal = document.getElementById('modal');
const closeModal = document.querySelector('.close-modal');

// Elementos dentro do modal
const modalImg = document.getElementById('modal-img');
const modalNome = document.getElementById('modal-nome');
const modalApelido = document.getElementById('modal-apelido');
const modalAtuacao = document.getElementById('modal-atuacao');
const modalNacionalidade = document.getElementById('modal-nacionalidade');
const modalBandeira = document.getElementById('modal-bandeira');
const modalHistoria = document.getElementById('modal-historia');
const modalInicio = document.getElementById('modal-inicio');
const modalNucleo = document.getElementById('modal-nucleo');

// Evento para abrir modal
botoes.forEach(botao => {
    botao.addEventListener('click', () => {
        const id = botao.id;
        const mestre = mestres[id];

        if (mestre) {
            modalImg.src = mestre.img;
            modalNome.textContent = mestre.nome;
            modalApelido.textContent = mestre.apelido;
            modalAtuacao.textContent = mestre.atuacao;
            modalNacionalidade.textContent = mestre.nacionalidade;
            modalBandeira.src = mestre.bandeira;
            modalHistoria.textContent = mestre.historia;
            modalInicio.textContent = mestre.inicio;
            modalNucleo.textContent = mestre.nucleo;

            modal.style.display = 'flex';
        }
    });
});

// Fechar modal
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Fechar clicando fora
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});
