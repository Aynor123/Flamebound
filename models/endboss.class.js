// let endbossIntervals = [];

class Endboss extends MoveableObject {

   height = 280;
   width = 280;
   health = 100;
   tolerance = 3;
   castingTimeout = 0;
   isCasting = false;
   animationInterval;
   isReset = true;
   frame = 0;
   inRangeToCast = false;
   // endbossAssuresDistance;
   endbossAttackSpeed = 3000;
   endbossCastsPoison = new Audio('../sounds/necromancercasting_sound_short.mp3');

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

   IMAGES_IDLE_STANDING = [
      '../assets/Enemies/witch/Witch_2/idle_1/tile000.png',
      '../assets/Enemies/witch/Witch_2/idle_1/tile001.png',
      '../assets/Enemies/witch/Witch_2/idle_1/tile002.png',
      '../assets/Enemies/witch/Witch_2/idle_1/tile003.png',
      '../assets/Enemies/witch/Witch_2/idle_1/tile004.png',
      '../assets/Enemies/witch/Witch_2/idle_1/tile005.png'
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

   IMAGES_CASTING = [
      '../assets/Enemies/witch/Witch_2/cast/tile000.png',
      '../assets/Enemies/witch/Witch_2/cast/tile001.png',
      '../assets/Enemies/witch/Witch_2/cast/tile002.png',
      '../assets/Enemies/witch/Witch_2/cast/tile003.png',
      '../assets/Enemies/witch/Witch_2/cast/tile004.png',
      '../assets/Enemies/witch/Witch_2/cast/tile005.png',
      '../assets/Enemies/witch/Witch_2/cast/tile006.png',
      '../assets/Enemies/witch/Witch_2/cast/tile007.png'
   ];

   constructor() {
      super().loadImage('../assets/Enemies/witch/Witch_2/walk/tile000.png');
      this.loadImages(this.IMAGES_IDLE);
      this.loadImages(this.IMAGES_DEAD);
      this.loadImages(this.IMAGES_HURT);
      this.loadImages(this.IMAGES_WALKING);
      this.loadImages(this.IMAGES_CASTING);
      this.loadImages(this.IMAGES_IDLE_STANDING);
      this.x = 1500;
      this.y = 100;
      this.animate();
   }

   animate() {
      /** IDLE STORMY */
      let endbossIdleStormy = setInterval(() => {
         if (!gamePaused) {
            let i;
            if (this.currentImage < 7) {
               i = this.currentImage;
            } else {
               i = 2 + ((this.currentImage - 7) % (this.IMAGES_IDLE.length - 3));
            }
            let path = this.IMAGES_IDLE[i];
            this.img = this.imageCache[path];
            this.currentImage++;
         }
      }, 1000 / 9);



      let enemyHurtInterval = createInterval(allIntervals, () => {
         if (this.hitDetection && this.health > 0) {
            clearInterval(endbossIdleStormy);
            this.playOneTimeAnimationRevB(this.IMAGES_HURT, enemyHurtInterval);
         }
      }, 1000 / 30);

      let enemyDiesInterval = setInterval(() => {
         if (!this.hitDetection && this.health <= 0 && !gamePaused) {
            clearInterval(endbossIdleStormy);
            clearInterval(enemyHurtInterval);
            clearInterval(endbossAssuresDistance);
            clearInterval(castPoison);
            this.playOneTimeAnimationRevB(this.IMAGES_DEAD, enemyDiesInterval);
            this.collisionAllowed = false;
         }
      }, 1000 / 10);

      let endbossAssuresDistance = setInterval(() => {
         if (world && world.character !== null && !gamePaused) { //PREVENT UNDEFINED ERROR
            if (!this.inRangeToCast && world.endbossIsActive && world.character.x + world.rangeToRightFireball - 20 < this.x - this.tolerance) {
               this.playAnimation(this.IMAGES_WALKING);
            } else if (!this.inRangeToCast && world.endbossIsActive && world.character.x + world.rangeToRightFireball - 20 > this.x - this.tolerance) {
               this.playAnimation(this.IMAGES_WALKING_REVERSE);
            }

            if (world.character.x + world.rangeToRightFireball - 20 < this.x - this.tolerance && !this.inRangeToCast && world.endbossIsActive) {
               clearInterval(endbossIdleStormy);
               this.moveLeftEndboss();
            }
            if (world.character.x + world.rangeToRightFireball - 20 > this.x + this.tolerance && !this.inRangeToCast && world.endbossIsActive) {
               clearInterval(endbossIdleStormy);
               this.moveRightEndboss();
            }
            if (world.character.y > this.y + this.tolerance && !this.inRangeToCast && world.endbossIsActive) {
               this.moveDownEnemy();
            }
            if (world.character.y < this.y - this.tolerance && this.y > -50 && !this.inRangeToCast && world.endbossIsActive) {
               this.moveUpEnemy();
            }
         }
      }, 1000 / 10);

      let checkRangeToCast = createInterval(allIntervals, () => {
         let currentTime = Date.now();
         let timeSinceLastCast = (currentTime - this.castingTimeout);
         if (world && world.character !== null) { //PREVENT UNDEFINED ERROR
            if (this.x - world.character.x <= world.rangeToRightFireball && timeSinceLastCast >= this.endbossAttackSpeed) {
               this.castingTimeout = currentTime; // Update the casting timeout to the current time
               this.inRangeToCast = true; // Start the casting animation
            }
         }
      }, 1000 / 10);

      let castPoison = createInterval(allIntervals, () => {
         if (this.inRangeToCast) {
            if (this.frame < this.IMAGES_CASTING.length) {
               // clearInterval(endbossAssuresDistance);
               this.playOneTimeAnimation(this.IMAGES_CASTING, this.isReset);
               this.isReset = false;
               this.frame++;
               this.speed = 0;
               if (this.frame === this.IMAGES_CASTING.length) {
                  this.isReset = true;
                  this.frame = 0;
                  this.inRangeToCast = false; // Reset after completing the casting
                  this.speed = 5;
                  this.endbossAssuresDistance;
                  let poisonCloud = new PoisonCloud(this.x, this.y);
                  this.world.poisonClouds.push(poisonCloud);
                  this.endbossCastsPoison.play();
               }
            }
         }
      }, 1000 / 20);
   }

   moveRightEndboss() {
      this.x += 8;
   }

   moveLeftEndboss() {
      this.x -= 8;
   }




}

