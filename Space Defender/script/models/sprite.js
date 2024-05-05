
class Sprite {
    constructor(imageSrc, width, height) {
        this.image = new Image();
        this.image.src = imageSrc;
        this.width = width;
        this.height = height;
    }

    draw(ctx, x, y) {
        ctx.drawImage(this.image, x, y, this.width, this.height);
    }
}

export default Sprite;
