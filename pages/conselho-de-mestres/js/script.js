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
