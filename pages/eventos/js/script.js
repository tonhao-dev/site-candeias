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
