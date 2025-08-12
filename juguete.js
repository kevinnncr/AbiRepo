// juguete.js

const lugares = document.querySelectorAll('.lugar');
const pistaTexto = document.getElementById('pista-texto');
const mensajeFinal = document.getElementById('mensaje-final');
const jugueteImg = document.getElementById('juguete-img');
const audioEncontrado = document.getElementById('audio-encontrado');
const audioAyuda = document.getElementById('audio-ayuda');

// Lugar correcto (puedes cambiarlo por "mesa" o "caja" según la pista)
const lugarCorrecto = 'silla';

lugares.forEach(lugar => {
  lugar.addEventListener('click', () => {
    const elegido = lugar.dataset.lugar;

    if (elegido === lugarCorrecto) {
      mensajeFinal.style.display = 'block';
      jugueteImg.style.display = 'block';
      audioEncontrado.play();
    } else {
      pistaTexto.textContent = 'Hmm… ahí no está. Intenta en otro lugar 😉';
      audioAyuda.play();
    }
  });
});
