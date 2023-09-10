import { Obstacle } from '../obstacle';
import stoneImg from '../../images/stone.png';

export default class Stone extends Obstacle {

  /**
   * @param {import('../').default} game
   * @param {number} x
   * @param {number} y
   */
  constructor(game, x, y) {

    super(game);

    this.x = x;
    this.y = y;
    this.img.src = stoneImg;
  }
}