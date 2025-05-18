document.addEventListener("DOMContentLoaded", () => {
    const targetElement = document.querySelector('.data-stats');
    if (!targetElement) {
        console.error("Elemento '.data-stats' não encontrado!");
        return;
    }

    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounting();
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    observer.observe(targetElement);

    function startCounting() {
        const counters = document.querySelectorAll('.counter');
        const duration = 10000;
        const frameDuration = 60;
        const totalFrames = duration / frameDuration;

        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            let frame = 0;

            const updateCount = () => {
                frame++;
                const count = easeOutQuad(frame, 0, target, totalFrames);
                counter.innerText = Math.floor(count);

                if (frame < totalFrames) {
                    requestAnimationFrame(updateCount);
                } else {
                    counter.innerText = target;
                }
            };

            requestAnimationFrame(updateCount);
        });
    }

    function easeOutQuad(t, b, c, d) {
        t /= d;
        return -c * t * (t - 2) + b;
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


