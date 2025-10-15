   
import _ from 'underscore';    
// import crearDeck, {miNombre} from './usecases/crear-deck'; // importación por defecto e individual
// console.log(miNombre);
// import { crearDeck as crearNuevoDeck } from './usecases/crear-deck'; // Se puede renombrar la función importada con otro nombre
// Importar una funcion que es exportada como defecto
// import cualquierNombreParaCrearUnNuevoDeck from './usecases/crear-deck';
import { crearDeck, pedirCarta, valorCarta, turnoComputadora, crearCartaHTML } from './usecases'; // Importar todo lo utilizado desde el index.js de usecases para evitar tantas importaciones en este index


/**
 * 2C = Two of Clubs
 * 2D = Two of Diamonds
 * 2H = Two of Hearts
 * 2S = Two of Spades
 */

let deck         = [];
const tipos      = ['C','D','H','S'];
const especiales = ['A','J','Q','K'];

let puntosJugador     = 0,
    puntosComputadora = 0;

   
const btnPedir   = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevo   = document.querySelector('#btnNuevo');

const divCartasJugador     = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');

const puntosHTML = document.querySelectorAll('small');

// deck = crearNuevoDeck(tipos, especiales); // Utilizando la función importada con el nuevo nombre
// deck = cualquierNombreParaCrearUnNuevoDeck(tipos, especiales); // Utilizando la función importada por defecto

deck = crearDeck(tipos, especiales);

   
btnPedir.addEventListener('click', () => {

    const carta = pedirCarta(deck);
    
    puntosJugador = puntosJugador + valorCarta( carta );
    puntosHTML[0].innerText = puntosJugador;
    
       
 const imgCarta = crearCartaHTML(carta);
    divCartasJugador.append( imgCarta );

    if ( puntosJugador > 21 ) {
        console.warn('Lo siento mucho, perdiste');
        btnPedir.disabled   = true;
        btnDetener.disabled = true;
        turnoComputadora( puntosJugador, puntosHTML[1], divCartasComputadora, deck );

    } else if ( puntosJugador === 21 ) {
        console.warn('21, genial!');
        btnPedir.disabled   = true;
        btnDetener.disabled = true;
        turnoComputadora( puntosJugador, puntosHTML[1], divCartasComputadora, deck );
    }

});


btnDetener.addEventListener('click', () => {
    btnPedir.disabled   = true;
    btnDetener.disabled = true;

    turnoComputadora( puntosJugador, puntosHTML[1], divCartasComputadora, deck );
});

btnNuevo.addEventListener('click', () => {

    console.clear();
    deck = [];
    deck = crearDeck(tipos, especiales);

    puntosJugador     = 0;
    puntosComputadora = 0;
    
    puntosHTML[0].innerText = 0;
    puntosHTML[1].innerText = 0;

    divCartasComputadora.innerHTML = '';
    divCartasJugador.innerHTML = '';

    btnPedir.disabled   = false;
    btnDetener.disabled = false;

});
