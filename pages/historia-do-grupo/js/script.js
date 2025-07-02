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



const textContent = document.getElementById('textContent');
const scrollUp = document.getElementById('scrollUp');
const scrollDown = document.getElementById('scrollDown');
const gradientTop = document.getElementById('gradientTop');
const gradientBottom = document.getElementById('gradientBottom');
const scrollIndicator = document.getElementById('scrollIndicator');

// Controles de scroll
scrollUp.addEventListener('click', () => {
    textContent.scrollBy({
        top: -50,
        behavior: 'smooth'
    });
});

scrollDown.addEventListener('click', () => {
    textContent.scrollBy({
        top: 50,
        behavior: 'smooth'
    });
});

// Controle por teclado
textContent.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') {
        e.preventDefault();
        textContent.scrollBy({
            top: -30,
            behavior: 'smooth'
        });
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        textContent.scrollBy({
            top: 30,
            behavior: 'smooth'
        });
    }
});

// Controle por roda do mouse
textContent.addEventListener('wheel', (e) => {
    e.preventDefault();
    textContent.scrollBy({
        top: e.deltaY * 0.5,
        behavior: 'smooth'
    });
});



// Listener para scroll
textContent.addEventListener('scroll', updateScrollIndicators);

// Inicializar indicadores
setTimeout(updateScrollIndicators, 100);

// Focar no container para permitir controle por teclado
textContent.setAttribute('tabindex', '0');







