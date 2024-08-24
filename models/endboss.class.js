class Endboss extends MoveableObject {

   height = 280;
   width = 280;
   x = 0;
   y = 120;
   health = 100;
   speed = 4;
   tolerance = 3;

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

   IMAGES_WALKING = [
      '../assets/Enemies/witch/Witch_2/walk/tile000.png',
      '../assets/Enemies/witch/Witch_2/walk/tile001.png',
      '../assets/Enemies/witch/Witch_2/walk/tile002.png',
      '../assets/Enemies/witch/Witch_2/walk/tile003.png',
      '../assets/Enemies/witch/Witch_2/walk/tile004.png',
      '../assets/Enemies/witch/Witch_2/walk/tile005.png',
      '../assets/Enemies/witch/Witch_2/walk/tile006.png',
      '../assets/Enemies/witch/Witch_2/walk/tile007.png',
      '../assets/Enemies/witch/Witch_2/walk/tile008.png',
      '../assets/Enemies/witch/Witch_2/walk/tile009.png'
   ];

   IMAGES_WALKING_REVERSE = [
      '../assets/Enemies/witch/Witch_2/walk/tile009.png',
      '../assets/Enemies/witch/Witch_2/walk/tile008.png',
      '../assets/Enemies/witch/Witch_2/walk/tile007.png',
      '../assets/Enemies/witch/Witch_2/walk/tile006.png',
      '../assets/Enemies/witch/Witch_2/walk/tile005.png',
      '../assets/Enemies/witch/Witch_2/walk/tile004.png',
      '../assets/Enemies/witch/Witch_2/walk/tile003.png',
      '../assets/Enemies/witch/Witch_2/walk/tile002.png',
      '../assets/Enemies/witch/Witch_2/walk/tile001.png',
      '../assets/Enemies/witch/Witch_2/walk/tile000.png'
   ];

   constructor() {
      super().loadImage('../assets/Enemies/witch/Witch_2/walk/tile000.png');
      this.loadImages(this.IMAGES_IDLE);
      this.loadImages(this.IMAGES_DEAD);
      this.loadImages(this.IMAGES_HURT);
      this.loadImages(this.IMAGES_WALKING);
      this.x = 700;
      this.animate();
   }

   animate() {
      /** IDLE STORMY */
      let endbossIdleStormy = setInterval(() => {
         let i;
         if (this.currentImage < 7) {
            i = this.currentImage;
         } else {
            i = 2 + ((this.currentImage - 7) % (this.IMAGES_IDLE.length - 3));
         }
         let path = this.IMAGES_IDLE[i];
         this.img = this.imageCache[path];
         this.currentImage++;
      }, 1000 / 9);

      let enemyHurtInterval = setInterval(() => {
         if (this.hitDetection && this.health > 0) {
            clearInterval(endbossIdleStormy);
            this.playOneTimeAnimationRevB(this.IMAGES_HURT, enemyHurtInterval);
         }
      }, 1000 / 30);

      let enemyDiesInterval = setInterval(() => {
         if (!this.hitDetection && this.health <= 0) {
            clearInterval(endbossIdleStormy);
            clearInterval(enemyHurtInterval);
            clearInterval(endbossAssuresDistance);
            this.playOneTimeAnimationRevB(this.IMAGES_DEAD, enemyDiesInterval);
            this.collisionAllowed = false;
         }
      }, 1000 / 10);

      let endbossAssuresDistance = setInterval(() => {
         if (world.character.x + world.rangeToRightFireball - 20 < this.x) {
            clearInterval(endbossIdleStormy);
            this.moveLeft();
            this.playAnimation(this.IMAGES_WALKING);
         }
         if (world.character.x + world.rangeToRightFireball - 20 > this.x) {
            clearInterval(endbossIdleStormy);
            this.moveRight();
            this.playAnimation(this.IMAGES_WALKING_REVERSE);
         }
         if (world.character.y > this.y + this.tolerance) {
            this.moveDownEnemy();
         }
         if (world.character.y < this.y - this.tolerance) {
            this.moveUpEnemy();
         }
      }, 1000 / 10);
   }
}

