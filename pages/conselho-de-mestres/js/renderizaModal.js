
export function renderizaModal(botao, dadosMestres) {
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modal-img');
  const modalNome = document.getElementById('modal-nome');
  const modalApelido = document.getElementById('modal-apelido');
  const modalAtuacao = document.getElementById('modal-atuacao');
  const modalNacionalidade = document.getElementById('modal-nacionalidade');
  const modalBandeira = document.getElementById('modal-bandeira');
  const modalHistoria = document.getElementById('modal-historia');
  const modalInicio = document.getElementById('modal-inicio');
  const modalNucleo = document.getElementById('modal-nucleo');

  const id = botao.id;
  const grau = id.split('.')[0];
  const idMestre = id.split('.')[1]
  const mestre = dadosMestres[grau].find(mestre => mestre.id === idMestre);

  if (!mestre) return;

  const bandeiraSrc = `../../assets/icons/${(mestre.bandeira || 'brasil')}.png`;

  modalImg.src = mestre.img;
  modalNome.textContent = mestre.nome;
  modalApelido.textContent = mestre.apelido;
  modalAtuacao.textContent = mestre.atuacao;
  modalNacionalidade.textContent = mestre.nacionalidade;
  modalBandeira.src = bandeiraSrc;
  modalHistoria.textContent = mestre.historia;
  modalInicio.textContent = mestre.inicio;
  modalNucleo.textContent = mestre.nucleo;

  modal.style.display = 'flex';
}