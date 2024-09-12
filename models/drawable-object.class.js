class DrawableObject {
    x = 0;
    y = 100;
    height = 300;
    width = 300;
    img;
    imageCache = {}; 
    currentImage = 0;
    frameMode = false;

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
        if (this instanceof Character && this.frameMode || this instanceof Enemy && this.frameMode) {
            ctx.beginPath();
            ctx.lineWidth = '3';
            ctx.strokeStyle = 'red';
            ctx.rect(this.x + 120, this.y + 145, this.width - 250, this.height - 145);
            ctx.stroke();
        }
    }

    drawFrameEnboss(ctx) {
        if (this instanceof Endboss && this.frameMode) { 
            ctx.beginPath();
            ctx.lineWidth = '3';
            ctx.strokeStyle = 'red';
            ctx.rect(this.x + 120, this.y + 145, this.width - 250, this.height - 145);
            ctx.stroke();
        }
    }

    drawFrameFireball(ctx) {
        if (this instanceof ThrowableObject && this.frameMode) {
            ctx.beginPath();
            ctx.lineWidth = '3';
            ctx.strokeStyle = 'red';
            ctx.rect(this.x + 80, this.y + 75, this.width - 100, this.height - 145);
            ctx.stroke();
        }
    }

    drawFrameManaPortion(ctx) {
        if (this instanceof ManaPortion && this.frameMode) {
            ctx.beginPath();
            ctx.lineWidth = '3';
            ctx.strokeStyle = 'red';
            ctx.rect(this.x + 40, this.y + 60, this.width - 80, this.height - 115);
            ctx.stroke();
        }
    }

    drawFramePoisonCloud(ctx) {
        if (this instanceof PoisonCloud && this.frameMode) {
            ctx.beginPath();
            ctx.lineWidth = '3';
            ctx.strokeStyle = 'red';
            ctx.rect(this.x + 165, this.y + 175, this.width - 340, this.height - 355);
            ctx.stroke();
        }
    }
}

