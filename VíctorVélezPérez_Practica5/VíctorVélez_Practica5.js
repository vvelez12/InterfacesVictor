 let puntuacion = 0;
 


 //Web component
 class Componente extends HTMLElement{

  constructor(){
    super();
  }

  connectedCallback(){
   
    this.innerHTML= '<h2>Bienvenido al Juego</h2><p>Tu objetivo es que Mario caze a Zelda</p><p>¡Diviertete!</p>';
   
  }
 }

 window.customElements.define("componente-juego", Componente);


 
 //Web component
 class Instrucciones extends HTMLElement{

  constructor(){
    super();
  }

  connectedCallback(){
   
    this.innerHTML= ' <h2>Instrucciones del Juego</h2><p>Bienvenido al juego. Tu objetivo es atrapar a la princesa Zelda moviendo a Mario con las teclas de dirección.</p><p>Cada vez que atrapes a Zelda, ganarás puntos. Zelda cambiará de posición después de cada captura.Tienes 30 segundos para capturarla todas las veces que puedas.</p><p>¡Diviértete y trata de conseguir la puntuación más alta!</p>';
   
  }
 }

 window.customElements.define("instrucciones-juego", Instrucciones);

 // Función para mostrar las instrucciones
 
  function mostrar() {
    const contenedor = document.getElementById('contenedorInstrucciones');
    contenedor.style.display = 'flex';
  }

  // Función para cerrar las instrucciones
  function cerrar() {
    const contenedor = document.getElementById('contenedorInstrucciones');
    contenedor.style.display = 'none';
  }

// Función para iniciar el juego
function iniciarJuego() {
  const paginaInicial = document.getElementById('principal');
  const contenedorJuego = document.getElementById('contenedorJuego');
  const botonIniciar = document.getElementById('iniciar');
  const finJuego = document.getElementById('finJuego');

  // Ocultar la página inicial y mostrar el juego
  paginaInicial.style.display = 'none';
  contenedorJuego.style.display = 'block';
  botonIniciar.style.display = 'none';

  // Posicionar al jugador y al objetivo inicialmente
  posicionarJugador();
  posicionarObjetivo();

  // Mover el jugador con las teclas de dirección
  window.addEventListener('keydown', (evento) => {
    if (evento.key === 'ArrowRight') {
      moverJugador('derecha');
    } else if (evento.key === 'ArrowLeft') {
      moverJugador('izquierda');
    } else if (evento.key === 'ArrowDown') {
      moverJugador('abajo');
    } else if (evento.key === 'ArrowUp') {
      moverJugador('arriba');
    }
  });

   // Establecer el tiempo máximo de juego en segundos
   const tiempoMaximo = 30;
   let tiempoRestante = tiempoMaximo;
 
   // Actualizar el contador de tiempo cada segundo
   contadorTiempo.innerText = `Tiempo restante: ${tiempoRestante} s`;
   temporizador = setInterval(() => {
     tiempoRestante--;
     contadorTiempo.innerText = `Tiempo restante: ${tiempoRestante} s`;
 
     // Si se acaba el tiempo, detener el juego
     if (tiempoRestante <= 0) {
       clearInterval(temporizador);
       finJuego.style.display = 'flex';
       document.getElementById('resultado').innerText = `¡Tiempo agotado! Tu puntuación fue de ${puntuacion}. ¡Juego terminado!`;
     }
   }, 1000); // Intervalo de actualización: 1 segundo
 
}




// Función para posicionar al jugador en la esquina superior izquierda
function posicionarJugador() {

  return new Promise((resolve)=>{

  
  const jugador = document.getElementById('jugador');
  jugador.style.left = '0px';
  jugador.style.top = '0px';

  setTimeout(() =>{
    resolve();
  },100);
})
}

// Función para posicionar al objetivo en una posición aleatoria
function posicionarObjetivo() {
  //Esta promesa indica si el objetivo se ha movido correctamente.
  return new Promise((resolve) => {
    const objetivo = document.getElementById('objetivo');
    const limiteDerecha = 450;
    const limiteAbajo = 450;

    const nuevaIzquierda = Math.random() * limiteDerecha;
    const nuevaArriba = Math.random() * limiteAbajo;

    objetivo.style.left = nuevaIzquierda + 'px';
    objetivo.style.top = nuevaArriba + 'px';

    
    setTimeout(() => {
      resolve();
    }, 100); 
  });
}



 // Función para mover el jugador con las teclas de dirección
 function moverJugador(direccion) {
  const jugador = document.getElementById('jugador');
  const izquierdaActual = parseInt(getComputedStyle(jugador).left, 10);
  const arribaActual = parseInt(getComputedStyle(jugador).top, 10);

  // Definir límites del campo de juego
  const limiteDerecha = 450;
  const limiteAbajo = 450;

  // Calcular nueva posición
  let nuevaIzquierda = izquierdaActual;
  let nuevaArriba = arribaActual;

  if (direccion === 'derecha') {
    nuevaIzquierda = Math.min(izquierdaActual + 50, limiteDerecha);
  } else if (direccion === 'izquierda') {
    nuevaIzquierda = Math.max(izquierdaActual - 50, 0);
  } else if (direccion === 'abajo') {
    nuevaArriba = Math.min(arribaActual + 50, limiteAbajo);
  } else if (direccion === 'arriba') {
    nuevaArriba = Math.max(arribaActual - 50, 0);
  }

  // Actualizar posición
  jugador.style.left = nuevaIzquierda + 'px';
  jugador.style.top = nuevaArriba + 'px';

  verificarColision();
}


  // Función para verificar la colisión
  function verificarColision() {
    const jugador = document.getElementById('jugador');
    const objetivo = document.getElementById('objetivo');
    const puntuacionMostrador = document.getElementById('puntuacion');
    

    const rectJugador = jugador.getBoundingClientRect();
    const rectObjetivo = objetivo.getBoundingClientRect();

    if (
      rectJugador.left < rectObjetivo.right &&
      rectJugador.right > rectObjetivo.left &&
      rectJugador.top < rectObjetivo.bottom &&
      rectJugador.bottom > rectObjetivo.top
    ) {
      // Jugador alcanza el objetivo
      puntuacion++;
      puntuacionMostrador.innerText = 'Puntuación: ' + puntuacion;
      puntuacionMostrador.classList.add('animacion-incremento'); // Agregar animación

      // Mover el objetivo a una nueva posición aleatoria
      posicionarObjetivo()
  .then(() => {
    console.log('El objetivo se ha posicionado correctamente.');
  });

      // Remover la clase de animación después de un tiempo
      setTimeout(() => {
        puntuacionMostrador.classList.remove('animacion-incremento');
      }, 500);
  
  }
}
    // Función para reiniciar el juego
    function reiniciarJuego() {
      const finJuego = document.getElementById('finJuego');
     
      finJuego.style.display = 'none';
      puntuacion = 0;

  
      // Reiniciar posición del jugador
      posicionarJugador()
      .then(() => {
        console.log('El Jugador se ha posicionado correctamente.');
      });
  
      // Reiniciar posición del objetivo
      posicionarObjetivo();
  
      // Reiniciar puntuación mostrador
      const puntuacionMostrador = document.getElementById('puntuacion');
      puntuacionMostrador.innerText = 'Puntuación: 0';

      iniciarJuego();
    }
  
