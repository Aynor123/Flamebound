class MoveableObject {
    x = 120;
    y = 200;
    img;
    height = 200;
    width = 200;

    loadImage(path) {
        this.img = new Image(); // this.img= document.getElementbyId('image')
        this.img.src = path;
    }

    moveRight() {
        console.log('moving right');
    }

    moveLeft() {

    }

    attack() {

    }
}