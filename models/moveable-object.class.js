class MoveableObject {
    x = 120;
    y = 100;
    img;
    mirroredImg;
    height = 300;
    width = 300;
    imageCache = {}; //JSON
    currentImage = 0;

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

    }

    attack() {

    }
    
}