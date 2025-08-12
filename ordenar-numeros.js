// ordenar-numeros.js

const piezas = document.querySelectorAll('.pieza');
const slots = document.querySelectorAll('.slot');
const mensaje = document.getElementById('mensaje');
const audioBien = document.getElementById('audio-bien');
const audioError = document.getElementById('audio-error');

let correctos = 0;

piezas.forEach(pieza => {
  pieza.addEventListener('dragstart', e => {
    e.dataTransfer.setData('text/plain', pieza.dataset.numero);
    pieza.classList.add('dragging');
  });

  pieza.addEventListener('dragend', () => {
    pieza.classList.remove('dragging');
  });
});

slots.forEach(slot => {
  slot.addEventListener('dragover', e => {
    e.preventDefault();
    slot.classList.add('hover');
  });

  slot.addEventListener('dragleave', () => {
    slot.classList.remove('hover');
  });

  slot.addEventListener('drop', e => {
    e.preventDefault();
    const numeroSoltado = e.dataTransfer.getData('text/plain');
    const numeroCorrecto = slot.dataset.numero;
    const pieza = document.querySelector(`.pieza[data-numero='${numeroSoltado}']`);

    if (numeroSoltado === numeroCorrecto) {
      slot.appendChild(pieza);
      pieza.setAttribute('draggable', false);
      slot.classList.add('correcto');
      pieza.classList.remove('dragging');
      mensaje.textContent = `¡Ese es el número ${numeroSoltado}! Bien hecho.`;
      audioBien.play();
      correctos++;

      if (correctos === 9) {
        setTimeout(() => {
          mensaje.textContent = '🎉 ¡Excelente! ¡Ordenaste todos los números del 1 al 9! 🎉';
        }, 500);
      }
    } else {
      mensaje.textContent = 'Uy... ese número no va ahí';
      audioError.play();
    }

    slot.classList.remove('hover');
  });
});
