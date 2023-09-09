import charactersImg from '../images/characters.png';
import { BLOCK_SIZE, Direction } from './const';

export const PLAYER_STATE = {
  Idle: 'idle',
  Running: 'running',
  Dead: 'dead',
};

const MAX_FRAME_X = 3;

export default class Player {
  /**
   * @param {import('.').default} game
   */
  constructor(game) {

    this.game = game;
    this.ctx = game.ctx;
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.img = new Image();
    this.img.src = charactersImg;
    this.sx = 0;
    this.sy = 0;
    this.sw = 78;
    this.sh = 108;
    this.width = this.sw / 2.5;
    this.height = this.sh / 2.5;
    this.frameX = 1;
    this.frameY = 0;
    this.paddingX = (BLOCK_SIZE - this.width) * .5;
    this.paddingY = (BLOCK_SIZE - this.height - 8) * .5;
    this.state = PLAYER_STATE.Idle;
    this.directions = [];
    this.velocity = 3;
    this.lastDirection = null;
    this.destX = 0;
    this.destY = 0;
    this.fpsInterval = 1000 / 60;
    this.timer = 0;
  }

  draw() {

    if (this.img.complete) {
      this.sw = this.sw || this.img.width;
      this.sh = this.sh || this.img.height;
      this.ctx.strokeRect(this.x, this.y, BLOCK_SIZE, BLOCK_SIZE);
      this.ctx.drawImage(this.img, this.sx + this.sw * this.frameX, this.sy + this.sh * this.frameY, this.sw, this.sh, this.x + this.paddingX, this.y + this.paddingY, this.width, this.height);
    }
  }

  move(direction) {
    if (!this.directions.includes(direction)) {
      this.directions.push(direction);
    }
  }

  stop(direction) {
    const idx = this.directions.indexOf(direction);

    if (0 <= idx) this.directions.splice(idx, 1);
  }

  updatePosition(deltaTime) {

    if (this.timer < this.fpsInterval) {

      this.timer += deltaTime;
      return;
    }

    this.timer = 0;
    const direction = 1 === this.directions.length ? this.directions[0] : null;

    if (null !== direction && this.lastDirection !== direction && this.x === this.destX && this.y === this.destY) {

      this.lastDirection = direction;
      this.frameX = (this.frameX + 1) % MAX_FRAME_X;
      this.frameY = direction;

      switch (direction) {
        case Direction.Down:
          if (this.y <= this.game.bottomEdge) {

            this.destY = Math.floor(this.y / BLOCK_SIZE) * BLOCK_SIZE + BLOCK_SIZE;
            this.destY = Math.min(this.destY, this.game.bottomEdge);
            this.y += this.velocity;

            if (this.y > this.destY) {
              this.y = this.destY;
            }
          }
          break;
        case Direction.Up:
          if (0 <= this.y) {

            this.destY = Math.floor((0 === this.y % BLOCK_SIZE ? this.y : this.y + BLOCK_SIZE) / BLOCK_SIZE) * BLOCK_SIZE - BLOCK_SIZE;
            this.destY = Math.max(this.destY, 0);
            this.y -= this.velocity;

            if (this.y < this.destY) {
              this.y = this.destY;
            }
          }
          break;
        case Direction.Left:
          if (0 <= this.x) {

            this.destX = Math.floor((0 === this.x % BLOCK_SIZE ? this.x : this.x + BLOCK_SIZE) / BLOCK_SIZE) * BLOCK_SIZE - BLOCK_SIZE;
            this.destX = Math.max(this.destX, 0);
            this.x -= this.velocity;

            if (this.x < this.destX) {
              this.x = this.destX;
            }
          }
          break;
        case Direction.Right:
          if (this.x <= this.game.rightEdge) {

            this.destX = Math.floor( this.x / BLOCK_SIZE) * BLOCK_SIZE + BLOCK_SIZE;
            this.destX = Math.min(this.destX, this.game.rightEdge);
            this.x += this.velocity;

            if (this.x > this.destX) {
              this.x = this.destX;
            }
          }
          break;
      }
    }
    else if (null !== this.lastDirection) {

      this.frameX = (this.frameX + 1) % MAX_FRAME_X;
      this.frameY = this.lastDirection;

      switch (this.lastDirection) {
        case Direction.Down:
          if (this.y <= this.game.bottomEdge) {

            this.y += this.velocity;

            if (this.y >= this.destY) {
              this.y = this.destY;
              this.lastDirection = null;
            }
          }
          break;
        case Direction.Up:
          if (0 <= this.y) {

            this.y -= this.velocity;

            if (this.y <= this.destY) {
              this.y = this.destY;
              this.lastDirection = null;
            }
          }
          break;
        case Direction.Left:
          if (0 <= this.x) {

            this.x -= this.velocity;

            if (this.x <= this.destX) {
              this.x = this.destX;
              this.lastDirection = null;
            }
          }
          break;
        case Direction.Right:
          if (this.x <= this.game.rightEdge) {

            this.x += this.velocity;

            if (this.x >= this.destX) {
              this.x = this.destX;
              this.lastDirection = null;
            }
          }
          break;
      }
    }
    else {
      this.frameX = 1;
    }
  }
}