import { BLOCK_SIZE, Direction } from './const';
import { Grass, Stone } from './obstacles';
import { SpeedPotion } from './items';
import { randInt } from './utils';
import Player from './player';

export default class Game {

  /**
   * @param {HTMLCanvasElement} canvas
   */
  constructor(canvas) {

    this.ctx = canvas.getContext('2d');
    this.width = canvas.width;
    this.height = canvas.height;
    this.rightEdge = this.width - BLOCK_SIZE;
    this.bottomEdge = this.height - BLOCK_SIZE;
    /** @type {(Stone | Grass | SpeedPotion | import('./obstacles').Bomb)[][]} */
    this.map = [];
    this.player = null;
    this.playerAmount = 1;
    this.timer = 0;

    this.onKeyDown = this.#onKeyDown.bind(this);
    this.onKeyUp = this.#onKeyUp.bind(this);
    this.animate = this.#animate.bind(this);
  }

  start() {

    this.#initMap();
    this.#addEventListeners();
    this.animate(0);
  }

  #initMap() {

    const items = [SpeedPotion];
    const totalCol = this.width / BLOCK_SIZE;
    const totalRow = this.height / BLOCK_SIZE;
    const excludedCoords = [];

    // random players
    for (let i = this.playerAmount; 0 <= --i;) {

      const x = randInt(0, totalCol * .5);
      const y = randInt(0, totalRow * .5);
      const idx = x * totalCol + y;
      const scaleX = x * BLOCK_SIZE;
      const scaleY = y * BLOCK_SIZE;

      this.player = new Player(this, scaleX, scaleY);
      excludedCoords.push(idx, this.getMapIndex(scaleX - BLOCK_SIZE, scaleY), this.getMapIndex(scaleX + BLOCK_SIZE, scaleY), this.getMapIndex(scaleX, scaleY - BLOCK_SIZE), this.getMapIndex(scaleX, scaleY + BLOCK_SIZE));

      if (!Array.isArray(this.map[idx])) {
        this.map[idx] = [];
      }
    }

    // random obstacles and items
    for (let i = 0; i < totalCol; i++) {
      for (let j = 0; j < totalRow; j++) {

        const idx = totalCol * i + j;
        const x = i * BLOCK_SIZE;
        const y = j * BLOCK_SIZE;

        if (!Array.isArray(this.map[idx])) {
          this.map[idx] = [];
        }

        if (excludedCoords.includes(this.getMapIndex(x, y))) continue;

        if (.05 >= Math.random()) {
          this.map[idx].push(new Stone(this, x, y));
        }
        else {
          if (.01 >= Math.random()) {

            const Item = items[randInt(0, items.length - 1)];
            this.map[idx].push(new Item(this, x, y));
          }

          this.map[idx].push(new Grass(this, x, y));
        }
      }
    }
  }

  #animate(timestamp) {

    const deltaTime = timestamp - this.timer;
    this.timer = timestamp;

    this.ctx.clearRect(0, 0, this.width, this.height);

    for (let i = this.map.length; 0 <= --i;) {

      if (!Array.isArray(this.map[i])) continue;

      this.map[i].sort((a, b) => b.z - a.z);

      for (let j = this.map[i].length; 0 <= --j;) {
        this.map[i][j].draw();
        this.map[i][j].update(deltaTime);
      }

      this.map[i] = this.map[i].filter((o) => !o.isExploded);
    }

    this.player.draw();
    this.player.update(deltaTime);

    requestAnimationFrame(this.animate);
  }

  #addEventListeners() {

    document.addEventListener('keydown', this.onKeyDown, false);
    document.addEventListener('keyup', this.onKeyUp, false);
  }

  #removeEventListeners() {

    document.removeEventListener('keydown', this.onKeyDown, false);
    document.removeEventListener('keyup', this.onKeyUp, false);
  }

  /** @param {KeyboardEvent} e */
  #onKeyDown(e) {
    switch (e.key) {
      case 'ArrowDown':
      case 'ArrowUp':
      case 'ArrowLeft':
      case 'ArrowRight':
        this.player.move(Direction[e.key.substring(5)]);
        break;
      case ' ':
        this.player.putBomb();
        break;
      default:
        break;
    }
  }

  /** @param {KeyboardEvent} e */
  #onKeyUp(e) {
    switch (e.key) {
      case 'ArrowDown':
      case 'ArrowUp':
      case 'ArrowLeft':
      case 'ArrowRight':
        this.player.stop(Direction[e.key.substring(5)]);
        break;
      default:
        break;
    }
  }

  getMapIndex(x, y) {

    return (x * this.width / BLOCK_SIZE + y) / BLOCK_SIZE;
  }
}