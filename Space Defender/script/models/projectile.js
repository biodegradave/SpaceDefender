import { Config } from '../config.js';
import Sprite from './sprite.js';

class Projectile {
    constructor(x, y) {
        this.sprite = new Sprite(Config.IMG_PROIETTILE, 16, 16);
        this.x = x;
        this.y = y;
        this.width = 40;
        this.height = 40;
        this.speed = Config.proiettileSpeed;
    }

    move() {
        this.y -= this.speed;
    }

    draw(ctx) {
        this.sprite.draw(ctx, this.x, this.y);
    }
}

export default Projectile;
