// ayuda-animalitos.js

const animalitos = document.querySelectorAll('.animalito');
const habitats = document.querySelectorAll('.habitat');
const mensaje = document.getElementById('mensaje');
const audioGracias = document.getElementById('audio-gracias');
const audioError = document.getElementById('audio-error');

let colocadosCorrectamente = 0;
const totalAnimalitos = animalitos.length;

animalitos.forEach(animal => {
  animal.addEventListener('dragstart', e => {
    e.dataTransfer.setData('text/plain', animal.dataset.habitat);
    e.dataTransfer.setDragImage(animal, 30, 30);
    animal.classList.add('dragging');
  });

  animal.addEventListener('dragend', () => {
    animal.classList.remove('dragging');
  });
});

habitats.forEach(habitat => {
  habitat.addEventListener('dragover', e => {
    e.preventDefault();
    habitat.classList.add('hovered');
  });

  habitat.addEventListener('dragleave', () => {
    habitat.classList.remove('hovered');
  });

  habitat.addEventListener('drop', e => {
    e.preventDefault();
    const habitatCorrecto = e.dataTransfer.getData('text/plain');
    const habitatDestino = habitat.dataset.habitat;

    const dragging = document.querySelector('.animalito.dragging');

    if (habitatCorrecto === habitatDestino) {
      habitat.appendChild(dragging);
      dragging.setAttribute('draggable', false);
      dragging.classList.remove('dragging');
      mensaje.textContent = '¡Gracias por ayudarme a volver a casa!';
      audioGracias.play();
      colocadosCorrectamente++;

      if (colocadosCorrectamente === totalAnimalitos) {
        setTimeout(() => {
          mostrarCelebracion();
        }, 500);
      }

    } else {
      mensaje.textContent = 'Uy... ¡Ese no es mi hogar!';
      audioError.play();
    }

    habitat.classList.remove('hovered');
  });
});

function mostrarCelebracion() {
  const celebrationScreen = document.getElementById('celebrationScreen');
  celebrationScreen.classList.add('show'); // Mostrar pantalla

  createCelebrationStars();
  createConfetti();
  startMessageRotation();
}

function createCelebrationStars() {
  const container = document.getElementById('starsContainer');
  const stars = ['⭐', '✨', '🌟', '💫', '⭐'];

  for (let i = 0; i < 20; i++) {
    const star = document.createElement('div');
    star.className = 'celebration-star';
    star.textContent = stars[Math.floor(Math.random() * stars.length)];
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    star.style.animationDelay = Math.random() * 2 + 's';
    star.style.animationDuration = (Math.random() * 2 + 2) + 's';
    container.appendChild(star);
  }
}

// Crear confeti
function createConfetti() {
  const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57'];

  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti-piece';
    confetti.style.left = Math.random() * 100 + '%';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.animationDelay = Math.random() * 3 + 's';
    confetti.style.animationDuration = (Math.random() * 2 + 3) + 's';
    document.body.appendChild(confetti);

    // Eliminar después de la animación
    setTimeout(() => {
      if (confetti.parentNode) {
        confetti.parentNode.removeChild(confetti);
      }
    }, 5000);
  }
}

// Crear fuegos artificiales
function createFireworks() {
  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FECA57', '#96CEB4'];

  setInterval(() => {
    const firework = document.createElement('div');
    firework.className = 'firework';
    firework.style.left = Math.random() * 100 + '%';
    firework.style.top = Math.random() * 100 + '%';
    firework.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    document.body.appendChild(firework);

    setTimeout(() => {
      if (firework.parentNode) {
        firework.parentNode.removeChild(firework);
      }
    }, 2000);
  }, 500);
}

// Función para ir al siguiente juego
function nextGame() {
  // Aquí pondrías la lógica para ir al menú principal o siguiente juego
  window.location.href = 'index.html';
}

// Reproducir sonidos de celebración
function playCelebrationSounds() {
  // Si tienes archivos de audio
  // const audio = new Audio('audio/celebration.mp3');
  // audio.play();
}



// Mostrar diferentes mensajes aleatorios
function startMessageRotation() {
  const celebrationMessages = [
    "¡Todos los animalitos están en casa!",
    "¡Eres un súper héroe de los animales!",
    "¡Qué gran trabajo ayudando a tus amigos!",
    "¡Los animalitos te dan las gracias!",
    "¡Eres el mejor cuidador de animales!"
  ];

  let messageIndex = 0;
  setInterval(() => {
    const messageElement = document.querySelector('.celebration-message');
    if (messageElement) {
      messageElement.style.opacity = '0';
      setTimeout(() => {
        messageElement.textContent = celebrationMessages[messageIndex];
        messageElement.style.opacity = '1';
        messageIndex = (messageIndex + 1) % celebrationMessages.length;
      }, 300);
    }
  }, 3000);
}
// Cambiar mensaje cada 3 segundos
let messageIndex = 0;
