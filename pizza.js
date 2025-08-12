const zonaPizza = document.getElementById('zonaPizza');
const pizzaBase = document.getElementById('pizzaBase');
const recetas = [
  {
    nombre: "Pizza Margarita",
    pasos: [
      { id: 'masa', img: 'img/Masa de pizza.jpg' },
      { id: 'salsa', img: 'img/Pizza con salsa_Pizza whit sauce.jpg' },
      { id: 'queso', img: 'img/PizzaQueso.jpg' },
      { id: 'tomateRodajas', img: 'img/margarita.jpg' }
    ]
  },
  {
    nombre: "Pizza de Pepperoni",
    pasos: [
      { id: 'masa', img: 'img/Masa de pizza.jpg' },
      { id: 'salsa', img: 'img/Pizza con salsa_Pizza whit sauce.jpg' },
      { id: 'queso', img: 'img/PizzaQueso.jpg' },
      { id: 'peperoni', img: 'img/PizzaPepperoni.jpg' }
    ]
  },
  {
    nombre: "Pizza loca",
    pasos: [
      { id: 'masa', img: 'img/Masa de pizza.jpg' },
      { id: 'salsa', img: 'img/Pizza con salsa_Pizza whit sauce.jpg' },
      { id: 'cebollas', img: 'img/pizzaCebolla.jpg' }  // algo divertido
    ]
  }
];


let etapaActual = 0;
let recetaActual = recetas[Math.floor(Math.random() * recetas.length)];
let pasosPizzaa = recetaActual.pasos;

document.getElementById('nombreReceta').textContent = recetaActual.nombre;
const pasosRecetaDiv = document.getElementById('pasosReceta');
pasosRecetaDiv.innerHTML = '';
recetaActual.pasos.forEach(paso => {
  const imgPaso = document.createElement('img');
  imgPaso.src = paso.img;
  imgPaso.alt = paso.id;
  pasosRecetaDiv.appendChild(imgPaso);
});

document.querySelectorAll('.ingrediente').forEach(el => {
  el.addEventListener('dragstart', e => {
    e.dataTransfer.setData('ingrediente', e.target.id);
  });
});

zonaPizza.addEventListener('dragover', e => {
  e.preventDefault();
});

zonaPizza.addEventListener('drop', e => {
  e.preventDefault();
  const ingrediente = e.dataTransfer.getData('ingrediente');

  const pasoEsperado = pasosPizzaa[etapaActual];

  if (ingrediente === pasoEsperado.id) {
    pizzaBase.src = pasoEsperado.img;
    pizzaBase.style.display = 'block';
    etapaActual++;

    if (etapaActual === pasosPizzaa.length) {
      setTimeout(() => {
        //   alert('¡Pizza completada! 🍕');
        mostrarFelicitaciones();
      }, 300);
    }
  } else if (pasosPizzaa.some(p => p.id === ingrediente)) {
    mostrarError();

  } else {
    mostrarError();

  }
});
function mostrarError() {
  const pantalla = document.getElementById('pantallaError');
  const audioError = document.getElementById('audioError');

  pantalla.classList.remove('oculto');
  pantalla.classList.add('mostrar');
  pantalla.textContent = '❌ ¡Ingrediente incorrecto!';

  if (audioError) audioError.play();

  setTimeout(() => {
    pantalla.classList.add('oculto');
    pantalla.classList.remove('mostrar');
  }, 1000);
}


function mostrarFelicitaciones() {
  const felicidadesDiv = document.getElementById('felicitaciones');
  felicidadesDiv.classList.remove('oculto');

  const audio = document.getElementById('audioCelebracion');
  audio.play();

  lanzarConfeti();
}

function lanzarConfeti() {
  const canvas = document.getElementById('confettiCanvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const confetti = [];

  for (let i = 0; i < 300; i++) {
    confetti.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      r: Math.random() * 6 + 4,
      d: Math.random() * 20 + 10,
      color: `hsl(${Math.random() * 360}, 100%, 50%)`,
      tilt: Math.random() * 10 - 5,
      tiltAngle: 0
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < confetti.length; i++) {
      let c = confetti[i];
      ctx.beginPath();
      ctx.lineWidth = c.r / 2;
      ctx.strokeStyle = c.color;
      ctx.moveTo(c.x + c.tilt + c.r / 2, c.y);
      ctx.lineTo(c.x + c.tilt, c.y + c.tilt + c.r);
      ctx.stroke();
    }

    update();
    requestAnimationFrame(draw);
  }

  function update() {
    for (let i = 0; i < confetti.length; i++) {
      let c = confetti[i];
      c.y += Math.cos(c.d) + 2;
      c.tiltAngle += 0.1;
      c.tilt = Math.sin(c.tiltAngle) * 15;

      if (c.y > canvas.height) {
        c.y = -10;
        c.x = Math.random() * canvas.width;
      }
    }
  }

  draw();
}

