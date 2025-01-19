
// game configuration
const config = {
    type: Phaser.AUTO,  
    width: 800,
    height: 600,
    scene: {
      preload: preload,
      create: create,
      update: update
    }
  };
  
  // new game instance
  let game = new Phaser.Game(config);
  
  // preload room and sprite
  function preload() {

    this.load.image('scene', 'assets/scene.png');
    
    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.spritesheet('dude', 
        'assets/dude.png',
        { frameWidth: 32, frameHeight: 48 });

    this.load.spritesheet('idleLeft', 'assets/idleLeft.png', {frameWidth:64, frameHeight:64})
    this.load.spritesheet('idleRight', 'assets/idleRight.png', {frameWidth:64, frameHeight:64})
    


  }
  
  // initialize objects
  function create() {
    // the order you add items is how they appear (make sure background is before everything else)

    // background
    this.add.image(0, 0, 'scene').setOrigin(0, 0);

    // char (might need to figure this out, idk if i need two players for left and right yet)
    player = this.physics.add.sprite(100, 450, 'idleLeft');

    // animations (i made different sprites for each movement, instead of all together)
    //need animation for standing still...so no key input
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('walkLeft', { start: 0, end: 4 }),
      frameRate: 7,
      repeat: -1
    });

    // need animation for walking left
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('walkingLeft', { start: 0, end: 4 }),
      frameRate: 7,
      repeat: -1
    });

    // walking right
    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('walkingRight', { start: 0, end: 4 }),
      frameRate: 7,
      repeat: -1
    });

  }
  
  // gonna get called for every frame update (idk what phaser framerate is auto set to)
  // i assume i can update the logic for the game in this function
  function update() {
  }
  