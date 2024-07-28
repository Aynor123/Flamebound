class Endboss extends MoveableObject {

   height = 280;
   width = 280;
   x = 0;
   y = 120;
   health = 40;

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

   IMAGES_DEAD = [
      '../assets/Enemies/witch/Witch_2/dead/tile000.png',
      '../assets/Enemies/witch/Witch_2/dead/tile001.png',
      '../assets/Enemies/witch/Witch_2/dead/tile002.png',
      '../assets/Enemies/witch/Witch_2/dead/tile003.png'
   ];

   IMAGES_HURT = [
      '../assets/Enemies/witch/Witch_2/hurt/tile000.png',
      '../assets/Enemies/witch/Witch_2/hurt/tile001.png',
      '../assets/Enemies/witch/Witch_2/hurt/tile002.png',
      '../assets/Enemies/witch/Witch_2/hurt/tile003.png',
      '../assets/Enemies/witch/Witch_2/hurt/tile004.png'
   ];

   constructor() {
      super().loadImage('../assets/Enemies/witch/Witch_2/walk/tile000.png');
      this.loadImages(this.IMAGES_IDLE);
      this.loadImages(this.IMAGES_DEAD);
      this.loadImages(this.IMAGES_HURT);
      this.x = 700;
      this.animate();
   }

   animate() {
      // this.moveLeft();

      /** IDLE STORMY */
      let endbossIdleStormy = setInterval(() => {
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

      let enemyDiesInterval = setInterval(() => {
         if (this.health <= 0) {
            clearInterval(endbossIdleStormy);
            clearInterval(enemyHurtInterval);
            this.playOneTimeAnimationRevB(this.IMAGES_DEAD, enemyDiesInterval);
            this.collisionAllowed = false;
         }
      }, 1000 / 10);

      let enemyHurtInterval = setInterval(() => {
         if (this.hitDetection && this.health > 0) {
            clearInterval(endbossIdleStormy);
            this.playOneTimeAnimationRevB(this.IMAGES_HURT, enemyHurtInterval);
         }
      }, 1000 / 10);

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