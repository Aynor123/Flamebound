class MoveableObject {
    x = 120;
    y = 100;
    img;
    mirroredImg;
    height = 300;
    width = 300;
    


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