import { Obstacle } from '../obstacle';
import { BLOCK_SIZE } from '../const';
import bombImg from '../../images/bomb.png';
import explosionImg from '../../images/explosion.png';

const TIMEOUT = 5000;
const EXPLOSION_TIMEOUT = 1000;

export default class Bomb extends Obstacle {

  /**
   * @param {import('../').default} game
   */
  constructor(game) {

    super(game);

    this.z = 3;
    this.img.src = bombImg;
    this.sw = 258;
    this.sh = 246;
    this.width = this.sw / 7;
    this.height = this.sh / 7;
    this.frameX = 0;
    this.frameY = 0;
    this.maxFrameX = 2;
    this.maxFrameY = 2;
    this.paddingX = (BLOCK_SIZE - this.width + 8) * .5;
    this.paddingY = (BLOCK_SIZE - this.height - 4) * .5;
    this.duration = TIMEOUT;
    this.timer = 0;
    this.fpsInterval = 1000 / 60;
    this.fpsTimer = 0;
    this.isActivated = false;
    this.explosionLength = 1;
  }

  draw() {

    if (this.img.complete && this.isActivated) {
      this.ctx.drawImage(this.img, this.sx + this.sw * this.frameX, this.sy + this.sh * this.frameY, this.sw, this.sh, this.x + this.paddingX, this.y + this.paddingY, this.width, this.height);

      // if (this.isExploded) {

      //   this.ctx.drawImage(this.img, this.sx + this.sw * this.frameX, this.sy + this.sh * this.frameY, this.sw, this.sh, this.x + this.paddingX + BLOCK_SIZE, this.y + this.paddingY, this.width, this.height);
      // }
    }
  }

  update(deltaTime) {

    if (this.fpsTimer < this.fpsInterval) {

      this.fpsTimer += deltaTime;
    }
    else {
      this.fpsTimer = 0;
      this.frameX = (this.frameX + 1) % this.maxFrameX;
      this.frameY = (this.frameY + 1) % this.maxFrameY;
    }

    if (this.timer < this.duration) {
      this.timer += deltaTime;
      return;
    }

    if (0 === this.paddingX) {
      this.isExploded = true;
      return;
    }

    this.img.src = explosionImg;
    this.timer = 0;
    this.duration = EXPLOSION_TIMEOUT;
    this.maxFrameX = 8;
    this.maxFrameY = 1;
    this.sw = 42;
    this.sh = 48;
    this.paddingX = this.paddingY = 0;
    this.width = this.height = BLOCK_SIZE;
  }

  activate(x, y) {

    this.x = x;
    this.y = y;
    this.isActivated = true;
  }

  increaseExplosionLength() {
    ++this.explosionLength;
  }
}