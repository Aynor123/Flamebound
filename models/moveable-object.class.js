class MoveableObject {
    x = 0;
    y = 100;
    img;
    mirroredImg;
    height = 300;
    width = 300;
    imageCache = {}; //JSON
    currentImage = 0;
    speed = 0.1;
    otherDirection = false;

    loadImage(path) {
        this.img = new Image(); // this.img= document.getElementbyId('image')
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    moveRight() {
        console.log('moving right');
    }


    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60); // 60 FPS
    }


    attack() {

    }

}