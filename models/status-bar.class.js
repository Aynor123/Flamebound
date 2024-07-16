class StatusBar extends DrawableObject {



    IMAGE_STATUSBARFRAME = [
        '../assets/Status-Bars/LoadingBar_5_Background.png'
    ];

    IMAGES_HEALTH = [
        '../assets/Status-Bars/LoadingBar_5_Fill_Red_100.png',
        '../assets/Status-Bars/LoadingBar_5_Fill_Red_90.png',
        '../assets/Status-Bars/LoadingBar_5_Fill_Red_80.png'
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
        } else {
            return 2;
        }
    }
}
