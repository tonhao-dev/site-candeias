export function renderizaMestres(grauMestres, mestres) {
  const container = document.getElementById(grauMestres);

  if (!container || !mestres || !Array.isArray(mestres)) return;

  container.innerHTML = '';

  mestres.forEach(mestre => {
    const memberBox = document.createElement('div');
    memberBox.className = 'simple-member-box';
    memberBox.setAttribute('data-aos', 'fade-up');
    memberBox.setAttribute('data-aos-duration', '800');
    memberBox.setAttribute('data-aos-delay', '300');

    memberBox.innerHTML = `
      <div class="container-content-simple">
        <div class="division-img-all">
          <div class="simple-color-img"></div>
          <div class="simple-img-member">
            <img src="${mestre.img || ''}" alt="${mestre.apelido || ''}">
          </div>
        </div>
        <div class="container-simple-text">
          <div class="container-simple-primary">
            <h2>${mestre.apelido || ''}</h2>
            <h3>${mestre.nome || ''}</h3>
          </div>
          <div class="container-simple-secundary">
            <h2>Atuando:</h2>
            <h3>${mestre.nucleo || ''}${mestre.pais ? ' - ' + mestre.pais : ''}</h3>
          </div>
          ${mestre.instagram ? `
            <div class="container-simple-secundary">
              <h2>Instagram:</h2>
              <h3><a href="https://www.instagram.com/${mestre.instagram.replace('@', '')}/" target="_blank">@${mestre.instagram}</a></h3>
            </div>
          `: ''}
        </div>
      </div>
      <div class="container-button-nacionality">
        <div id="${grauMestres}.${mestre.id}" class="button-saiba-mais">
          <p>Saiba Mais</p>
        </div>
        <div class="flag-member">
          <img src="../../assets/icons/${(mestre.bandeira || 'brasil')}.png">
        </div>
      </div>
    `;

    container.appendChild(memberBox);
  });
}