import { Config } from '../config.js';
import Sprite from './sprite.js';

class Enemy {
    constructor(x, y) {
        this.sprite = new Sprite(Config.IMG_NEMICO, 64, 64);
        this.x = x;
        this.y = y;
        this.width = 64;
        this.height = 64;
        this.speed = Config.nemicoSpeed;
    }

    move() {
        this.y += this.speed;
    }

    draw(ctx) {
        this.sprite.draw(ctx, this.x, this.y);
    }
}

export default Enemy;
