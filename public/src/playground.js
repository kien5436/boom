import './favicon.ico';
import './images/stone-bg.png';
import './index.css';
import Game from './game';

window.addEventListener('load', () => {

  const canvas = document.getElementById('canvas');
  const game = new Game(canvas);

  game.start();
}, false);