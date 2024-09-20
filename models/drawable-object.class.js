class DrawableObject {
    x = 0;
    y = 100;
    height = 300;
    width = 300;
    img;
    imageCache = {}; 
    currentImage = 0;
    frameMode = false;


    /**
     * This function loads an image.
     * @param {*} path - Represents an image url.
     */
    loadImage(path) {
        this.img = new Image(); 
        this.img.src = path;
    }


    /**
     * This function is responsible for rendering an image onto an HTML canvas.
     * @param {*} ctx - This is the canvas rendering context, which provides the methods for drawing shapes, text, images, and other objects on the canvas.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }


    /**
     * This function loads an array containing images.
     * @param {*} arr - Represents an array that contains images.
     */
    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }


    /**
     * This functions renders a frame around an object. This is used for making the edges of an object visible.
     * @param {*} ctx - This is the canvas rendering context, which provides the methods for drawing shapes, text, images, and other objects on the canvas.
     */
    drawFrame(ctx) {
        if (this instanceof Character && this.frameMode || this instanceof Enemy && this.frameMode) {
            ctx.beginPath();
            ctx.lineWidth = '3';
            ctx.strokeStyle = 'red';
            ctx.rect(this.x + 120, this.y + 145, this.width - 250, this.height - 145);
            ctx.stroke();
        }
    }


    /**
     * This function renders the frame of the endboss object.
     * @param {*} ctx - This is the canvas rendering context, which provides the methods for drawing shapes, text, images, and other objects on the canvas.
     */
    drawFrameEnboss(ctx) {
        if (this instanceof Endboss && this.frameMode) { 
            ctx.beginPath();
            ctx.lineWidth = '3';
            ctx.strokeStyle = 'red';
            ctx.rect(this.x + 120, this.y + 145, this.width - 250, this.height - 145);
            ctx.stroke();
        }
    }


    /**
     * This function renders the frame of a fireball.
     * @param {*} ctx - This is the canvas rendering context, which provides the methods for drawing shapes, text, images, and other objects on the canvas.
     */
    drawFrameFireball(ctx) {
        if (this instanceof ThrowableObject && this.frameMode) {
            ctx.beginPath();
            ctx.lineWidth = '3';
            ctx.strokeStyle = 'red';
            ctx.rect(this.x + 80, this.y + 75, this.width - 100, this.height - 145);
            ctx.stroke();
        }
    }


    /**
     * This function renders the frame of a collectable mana portion.
     * @param {*} ctx -This is the canvas rendering context, which provides the methods for drawing shapes, text, images, and other objects on the canvas.
     */
    drawFrameManaPortion(ctx) {
        if (this instanceof ManaPortion && this.frameMode) {
            ctx.beginPath();
            ctx.lineWidth = '3';
            ctx.strokeStyle = 'red';
            ctx.rect(this.x + 40, this.y + 60, this.width - 80, this.height - 115);
            ctx.stroke();
        }
    }

    
    /**
     * This function renders the frame of a poison cloud.
     * @param {*} ctx -This is the canvas rendering context, which provides the methods for drawing shapes, text, images, and other objects on the canvas.
     */
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

