class StatusBar extends DrawableObject {



    IMAGE_STATUSBARFRAME = [
        '../assets/Status-Bars/LoadingBar_5_Background.png'
    ];

    IMAGES_HEALTH = [
        '../assets/Status-Bars/Health_Bar_100.png',
        '../assets/Status-Bars/Health_Bar_90.png',
        '../assets/Status-Bars/Health_Bar_80.png',
        '../assets/Status-Bars/Health_Bar_70.png',
        '../assets/Status-Bars/Health_Bar_60.png',
        '../assets/Status-Bars/Health_Bar_50.png',
        '../assets/Status-Bars/Health_Bar_40.png',
        '../assets/Status-Bars/Health_Bar_30.png',
        '../assets/Status-Bars/Health_Bar_20.png',
        '../assets/Status-Bars/Health_Bar_10.png',
        '../assets/Status-Bars/Health_Bar_0.png'
    ];

    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES_HEALTH);
        this.loadImages(this.IMAGE_STATUSBARFRAME);
        this.x = 30;
        this.y = 20;
        this.width = 200;
        this.height = 30;
        this.setPercentage(100);
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_HEALTH[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if (this.percentage == 100) {
            return 0;
        } else if (this.percentage > 90) {
            return 1;
        } else if (this.percentage > 80) {
            return 2;
        } else if (this.percentage > 70) {
            return 3;
        } else if (this.percentage > 60) {
            return 4;
        } else if (this.percentage > 50) {
            return 5;
        } else if (this.percentage > 40) {
            return 6;
        } else if (this.percentage > 30) {
            return 7;
        } else if (this.percentage > 20) {
            return 8;
        } else if (this.percentage > 10) {
            return 9;
        } else {
            return 10;
        }
    }
}
