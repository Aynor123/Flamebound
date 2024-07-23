class DrawableObject {
    x = 0;
    y = 100;
    height = 300;
    width = 300;
    img;
    imageCache = {}; //JSON
    currentImage = 0;

    loadImage(path) {
        this.img = new Image(); // this.img= document.getElementbyId('image')
        this.img.src = path;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Enemy || this instanceof Endboss) { // instanceof will show frames only fpr Character and Enemy
            ctx.beginPath();
            ctx.lineWidth = '3';
            ctx.strokeStyle = 'red';
            ctx.rect(this.x + 120, this.y + 145, this.width - 250, this.height - 145);
            ctx.stroke();
        }
    }

    drawFrameFireball(ctx) {
        if (this instanceof ThrowableObject) { // instanceof will show frames only fpr Character and Enemy
            ctx.beginPath();
            ctx.lineWidth = '3';
            ctx.strokeStyle = 'red';
            ctx.rect(this.x + 160, this.y + 70, this.width - 250, this.height - 145);
            ctx.stroke();
        }
    }
}

