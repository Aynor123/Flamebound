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

    /**
     * The function drawBlackRoundedRect draws a black rounded rectangle with specified dimensions and
     * corner radius on a canvas. It is used as background images for the collected mana portions GUI.
     * @param x - The `x` parameter represents the x-coordinate of the top-left corner of the rounded
     * rectangle.
     * @param y - The `y` parameter in the `drawBlackRoundedRect` function represents the vertical position
     * of the top-left corner of the rounded rectangle on the canvas. It determines how far down from the
     * top of the canvas the rectangle will be drawn.
     * @param width - The `width` parameter in the `drawBlackRoundedRect` function represents the width of
     * the rounded rectangle that you want to draw on the canvas. It determines how wide the rectangle will
     * be horizontally.
     * @param height - The `height` parameter in the `drawBlackRoundedRect` function represents the
     * vertical size of the rounded rectangle that will be drawn on the canvas. It determines how tall the
     * rectangle will be from top to bottom.
     * @param radius - The `radius` parameter in the `drawBlackRoundedRect` function represents the radius
     * of the rounded corners of the rectangle that will be drawn on the canvas. This parameter determines
     * how rounded the corners of the rectangle will be. 
     */
    drawBlackRoundedRect(ctx, x, y, width, height, radius) {
        if (!ctx) {
            throw new Error("Canvas context (ctx) is not provided.");
        }
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fill();
    }

    /**
     * The function `drawCollectedPortions` in JavaScript draws text on the canvas with specified styles and
     * shadows.
    */
    drawCollectedPortions(ctx, collectedPortions, totalPortions) {
        ctx.font = '32px Inferno';
        ctx.fillStyle = 'rgb(125,142,203)';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = '0.4';
        ctx.shadowColor = 'rgba(0, 0, 0, 1)';
        ctx.shadowBlur = 2;
        ctx.shadowOffsetX = 4;
        ctx.shadowOffsetY = 4;
        ctx.fillText(`${collectedPortions}/${totalPortions}`, 75, 110);
        ctx.strokeText(`${collectedPortions}/${totalPortions}`, 75, 110);
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
    }

}

