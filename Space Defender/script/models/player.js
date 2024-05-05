import { Config } from '../config.js';
import Sprite from './sprite.js';
import Projectile from './projectile.js';

class Player {
    constructor(x, y) {
        this.sprite = new Sprite(Config.IMG_NAVICELLA, 64, 64);
        this.x = x;
        this.y = y;
        this.width = 64;
        this.height = 64;
        this.speed = Config.playerSpeed;
    }

    moveLeft() {
        this.x -= this.speed;
        if (this.x < 0) this.x = 0;
    }

    moveRight() {
        this.x += this.speed;
        if (this.x + this.width > Config.canvasWidth) {
            this.x = Config.canvasWidth - this.width;
        }
    }

    draw(ctx) {
        this.sprite.draw(ctx, this.x, this.y);
    }
}

export default Player;
