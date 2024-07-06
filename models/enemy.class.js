class Enemy extends MoveableObject {

    constructor() {
        super().loadImage('../assets/Enemies/Skeleton_Warrior/Walk_Mirrored/tile000.png');
        this.x = 200 + Math.random() * 500;
    }

    
}