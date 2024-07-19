class Endboss extends MoveableObject {

   height = 280;
   width = 280;
   x = 0;
   y = 120;

   IMAGES_IDLE = [
      '../assets/Enemies/witch/Witch_2/idle_2/tile000.png',
      '../assets/Enemies/witch/Witch_2/idle_2/tile001.png',
      '../assets/Enemies/witch/Witch_2/idle_2/tile002.png',
      '../assets/Enemies/witch/Witch_2/idle_2/tile003.png',
      '../assets/Enemies/witch/Witch_2/idle_2/tile004.png',
      '../assets/Enemies/witch/Witch_2/idle_2/tile005.png',
      '../assets/Enemies/witch/Witch_2/idle_2/tile006.png',
      '../assets/Enemies/witch/Witch_2/idle_2/tile007.png'
   ];

   constructor() {
      super().loadImage('../assets/Enemies/witch/Witch_2/walk/tile000.png');
      this.loadImages(this.IMAGES_IDLE);
      this.x = 700;
      this.animate();
   }

   animate() {
      // this.moveLeft();

      /** IDLE STORMY */
      setInterval(() => {
         let i;
         if (this.currentImage < 7) {
            // First phase: iterate through the first seven images
            i = this.currentImage;
         } else {
            // Second phase: infinite loop starting from the third image and excluding the last two
            i = 2 + ((this.currentImage - 7) % (this.IMAGES_IDLE.length - 3));
         }
         let path = this.IMAGES_IDLE[i];
         this.img = this.imageCache[path];
         this.currentImage++;
      }, 1000 / 9);

      //    setInterval(() => {
      //       let i = this.currentImage % this.IMAGES_IDLE.length;
      //       let path = this.IMAGES_IDLE[i];
      //       this.img = this.imageCache[path];
      //       this.currentImage++;
      //   }, 1000 / 9);

      // setInterval(() => {
      //     let i = this.currentImage % this.IMAGES_WALKING.length;
      //     let path = this.IMAGES_WALKING[i];
      //     this.img = this.imageCache[path];
      //     this.currentImage++;
      // }, 1000 / 9);
   }
}

// <--- Endboss ändert richtung --->

//     checkCharacterPositionEndboss() {
//    const endboss = this.level.endboss[0];
//    if (endboss && !endboss.isDead) {
//      if (this.character.x > endboss.x + endboss.width) {
//        endboss.otherDirection = true;
//        endboss.moveLeft();
//      } else if (this.character.x < endboss.x + 100) {
//        endboss.otherDirection = false;
//        endboss.moveLeft();
//      }
//    }
//  }