AOS.init();
// Menu  hamburger
const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector(".nav");

hamburger.addEventListener("click", () => nav.classList.toggle("active"));

// Numero do candeias
// Observer de Interseção para detectar quando as estatísticas ficam visíveis
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Inicia todos os contadores quando a seção de estatísticas fica visível
            startCounting();
            // Deixa de observar após iniciar a animação
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observa o container de estatísticas
observer.observe(document.querySelector('.stats-container'));

function startCounting() {
    const counters = document.querySelectorAll('.counter');
    const speed = 5000; // Quanto maior, mais lento (ajustado para ser mais lento)

    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const duration = 20000; // Duração total da animação em milissegundos
        const frameDuration = 60; // Duração de cada quadro (para suavidade)
        const totalFrames = duration / frameDuration;
        const incrementPerFrame = target / totalFrames;

        let currentCount = 0;
        let frame = 0;

        const updateCount = () => {
            frame++;
            // Usar easing para tornar a animação mais suave
            // Easing function: ease-out (desacelera no final)
            currentCount = easeOutQuad(frame, 0, target, totalFrames);

            counter.innerText = Math.floor(currentCount);

            if (frame < totalFrames) {
                // Continua a animação
                requestAnimationFrame(updateCount);
            } else {
                // Garante que o valor final esteja correto
                counter.innerText = target;
            }
        };

        // Inicia a animação
        requestAnimationFrame(updateCount);
    });
}

// Função de suavização para animação mais natural (ease-out)
function easeOutQuad(t, b, c, d) {
    t /= d;
    return -c * t * (t - 2) + b;
}


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