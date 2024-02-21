 let puntuacion = 0;
 
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

  // Iniciar temporizador para el fin del juego
  temporizador = setTimeout(() => {
    // Mostrar el mensaje de resultado con la puntuación
    finJuego.style.display = 'flex';
    document.getElementById('resultado').innerText = `¡Enhorabuena! Has alcanzado una puntuación de ${puntuacion}. ¡Juego terminado!: `;
  }, 30000);

}




// Función para posicionar al jugador en la esquina superior izquierda
function posicionarJugador() {
  const jugador = document.getElementById('jugador');
  jugador.style.left = '0px';
  jugador.style.top = '0px';
}

// Función para posicionar al objetivo en una posición aleatoria
function posicionarObjetivo() {
  const objetivo = document.getElementById('objetivo');
  const limiteDerecha = 450;
  const limiteAbajo = 450;

  const nuevaIzquierda = Math.random() * limiteDerecha;
  const nuevaArriba = Math.random() * limiteAbajo;

  objetivo.style.left = nuevaIzquierda + 'px';
  objetivo.style.top = nuevaArriba + 'px';
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
      posicionarObjetivo();

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

      //Reiniciamos el tiempo
      clearTimeout(temporizador);
      // Reiniciar posición del jugador
      posicionarJugador();
  
      // Reiniciar posición del objetivo
      posicionarObjetivo();
  
      // Reiniciar puntuación mostrador
      const puntuacionMostrador = document.getElementById('puntuacion');
      puntuacionMostrador.innerText = 'Puntuación: 0';

      iniciarJuego();
    }
  
