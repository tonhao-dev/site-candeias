async function fetchCarrosselImages() {
  const response = await fetch('https://raw.githubusercontent.com/tonhao-dev/site-candeias-imagens/refs/heads/main/config.txt');
  const fileData = await response.text();
  const rows = fileData.split('\n');

  const imagesURLs = rows.filter(row => row.trim() !== '')

  return imagesURLs;
}

async function setupCarrossel() {
  const carrosselContainer = document.querySelector('.carousel-inner');
  const images = await fetchCarrosselImages();

  images.forEach((image, index) => {
    const trimmedImage = image.trim();
    if (!trimmedImage) return

    const indicatorsContainer = document.querySelector('.carousel-indicators');
    if (indicatorsContainer) {
      const indicatorHtml = `
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${index}"${index === 0 ? ' class="active" aria-current="true"' : ''} aria-label="Slide ${index + 1}"></button>
      `;
      indicatorsContainer.insertAdjacentHTML('beforeend', indicatorHtml);
    }

    const itemHtml = `
      <div class="carousel-item${index === 0 ? ' active' : ''}" data-bs-interval="5000">
      <a href='pages/galeria/index.html' target='_blank'>
              <img src="${trimmedImage}" alt="Carrossel Image ${index + 1}">
      </a>
      </div>
    `;

    carrosselContainer.insertAdjacentHTML('beforeend', itemHtml);
  });
}

setupCarrossel()