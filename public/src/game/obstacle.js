import { BLOCK_SIZE } from './const';

export class Obstacle {

  /**
   * @param {import('.').default} game
   */
  constructor(game) {

    this.ctx = game.ctx;
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.img = new Image();
    this.width = BLOCK_SIZE;
    this.height = BLOCK_SIZE;
    this.sx = 0;
    this.sy = 0;
    this.sw = 0;
    this.sh = 0;
  }

  draw() {

    if (this.img.complete) {
      this.sw = this.sw || this.img.width;
      this.sh = this.sh || this.img.height;
      this.ctx.drawImage(this.img, this.sx, this.sy, this.sw, this.sh, this.x, this.y, this.width, this.height);
    }
  }
}

export class Item extends Obstacle {
  /**
   * @param {import('.').default} game
   */
  constructor(game) {

    super(game);

    this.z = 1;
  }
}