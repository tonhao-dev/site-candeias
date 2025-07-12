import { dadosMestres } from './mestres.js';
import { renderizaMestres } from './renderizaMestres.js';
import { renderizaModal } from './renderizaModal.js';

renderizaMestres('branca', dadosMestres.branca);
renderizaMestres('brancaVermelha', dadosMestres.brancaVermelha);
renderizaMestres('vermelha', dadosMestres.brancaVermelha);

document.addEventListener('DOMContentLoaded', function () {
    AOS.init({
        once: true // Faz a animação ocorrer apenas uma vez após carregar a página
    });
})
// Menu  hamburger
const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector(".nav");

hamburger.addEventListener('click', function () {
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

// Seletores
const botoes = document.querySelectorAll('.button-saiba-mais');

const closeModal = document.querySelector('.close-modal');

// Evento para abrir modal
botoes.forEach(botao => {
    botao.addEventListener('click', () => renderizaModal(botao, dadosMestres));
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
