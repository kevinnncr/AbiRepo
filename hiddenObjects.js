const objetos = [
  { id: 'pato', encontrado: false },
  { id: 'mono', encontrado: false },
  { id: 'banana', encontrado: false },
  { id: 'dino', encontrado: false },
  { id: 'pelota', encontrado: false },
];

objetos.forEach(obj => {
  const el = document.getElementById(obj.id);
  el.addEventListener('click', () => {
    if (obj.encontrado) return;

    obj.encontrado = true;

    // 🔹 Agregamos clase para efecto visual
    el.classList.add('encontrado');

    el.src = `img/${obj.id}-x.png`;

    // También tachamos en la lista
    const btn = document.getElementById(`${obj.id}-btn`);
    if (btn) btn.style.opacity = '0.3';

    verificarFin();
  });
});

function verificarFin() {
  const todos = objetos.every(o => o.encontrado);
  if (todos) {
    setTimeout(() => {
      lanzarConfeti();

      // 🔊 Reproducir audio
      const audio = document.getElementById('audioFelicidades');
      if (audio) audio.play();

      // 🎉 Mostrar mensaje de felicitación
      const msg = document.createElement('div');
      msg.innerText = '🎉 ¡Encontraste todos los objetos! 🎉';
      msg.style.position = 'fixed';
      msg.style.top = '40%';
      msg.style.left = '50%';
      msg.style.transform = 'translate(-50%, -50%)';
      msg.style.fontSize = '2rem';
      msg.style.color = '#fff';
      msg.style.background = 'rgba(0,0,0,0.8)';
      msg.style.padding = '25px 30px';
      msg.style.borderRadius = '15px';
      msg.style.zIndex = '10000';
      msg.style.boxShadow = '0 0 10px rgba(0,0,0,0.5)';
      document.body.appendChild(msg);
    }, 300);
  }
}

function lanzarConfeti() {
  const container = document.getElementById('confeti-container');
  for (let i = 0; i < 100; i++) {
    const confeti = document.createElement('div');
    confeti.classList.add('confeti');
    confeti.style.left = Math.random() * 100 + 'vw';
    confeti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
    confeti.style.animationDuration = 2 + Math.random() * 2 + 's';
    container.appendChild(confeti);

    setTimeout(() => confeti.remove(), 4000); // Limpia después de animar
  }
}

