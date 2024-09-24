class ManaBar extends DrawableObject {
    percentage = 100;

    IMAGES_MANA = [
        '../assets/Status-Bars/Mana_Bar_100.png',
        '../assets/Status-Bars/Mana_Bar_90.png',
        '../assets/Status-Bars/Mana_Bar_80.png',
        '../assets/Status-Bars/Mana_Bar_70.png',
        '../assets/Status-Bars/Mana_Bar_60.png',
        '../assets/Status-Bars/Mana_Bar_50.png',
        '../assets/Status-Bars/Mana_Bar_40.png',
        '../assets/Status-Bars/Mana_Bar_30.png',
        '../assets/Status-Bars/Mana_Bar_20.png',
        '../assets/Status-Bars/Mana_Bar_10.png',
        '../assets/Status-Bars/Mana_Bar_0.png'
    ];

    constructor() {
        super();
        this.loadImages(this.IMAGES_MANA);
        this.x = 30;
        this.y = 40;
        this.width = 200;
        this.height = 30;
        this.setPercentage(100);
    }

    /**
    * This function handles the percentage of the character's mana bar.
    * @param {*} percentage - Represents the amount of mana the character has.
    */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_MANA[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

     /**
     * This function determines the mana amount to be displayed in the character's mana bar.
     * @returns - Represents the image index to be shown from the array `IMAGES_MANA` depending on the amount of mana.
     */
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
