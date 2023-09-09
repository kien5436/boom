import { Item } from '../obstacle';
import potionImg from '../../images/potions.png';

export default class SpeedPotion extends Item {
  /**
   * @param {import('.').default} game
   * @param {number} x
   * @param {number} y
   */
  constructor(game, x, y) {

    super(game);

    this.x = x;
    this.y = y;
    this.img.src = potionImg;
    this.sx = 432;
    this.sy = 0;
    this.sw = 48;
    this.sh = 48;
  }
}