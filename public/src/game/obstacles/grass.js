import { Obstacle } from '../obstacle';
import grassImg from '../../images/grass.png';

export default class Grass extends Obstacle {

  /**
   * @param {import('.').default} game
   * @param {number} x
   * @param {number} y
   */
  constructor(game, x, y) {

    super(game);

    this.x = x;
    this.y = y;
    this.z = 2;
    this.img.src = grassImg;
  }
}