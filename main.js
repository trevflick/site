
// game configuration
const config = {
    type: Phaser.AUTO,  
    width: 341,
    height: 100,
    pixelArt: true,   // declare this for upscaling
    scale: {
      mode: Phaser.Scale.NONE,
      zoom: 3                  
    },
    physics: {
      default: 'arcade',
      arcade: {
          gravity: { y: 300 },  // prob dont need this
          debug: false
      }
  },
    scene: {
      preload: preload,
      create: create,
      update: update
    }
  };
  
  //global player variable, maybe one for ground/walls?
  var player;
  var ground;
  var wall;
  // for keyboard input
  var cursors;
  


  // text box above the scene do i have to extend it to do that?
  // need a cursor object for selecting items in house
  // gonna start with 3, diploma, github, and resume



  // new game instance
  let game = new Phaser.Game(config);
  
  // preload room and sprite
  function preload() {

    this.load.image('sky', 'assets/newScene.png');

    // HAVE TO MAKE A GROUND TO STAND ON AND WALLS TO NOT WALK THROUGH
    this.load.image('ground', 'assets/ground.png');
    this.load.spritesheet('idleLeft', 'assets/idleLeft.png', {frameWidth:64, frameHeight:64})
    this.load.spritesheet('idleRight', 'assets/idleRight.png', {frameWidth:64, frameHeight:64})
    this.load.spritesheet('sitting', 'assets/sitting.png', {frameWidth:64, frameHeight:64})
    this.load.spritesheet('walkLeft', 'assets/walkLeft.png', {frameWidth:64, frameHeight:64})
    this.load.spritesheet('walkingRight', 'assets/walkingRight.png', {frameWidth:64, frameHeight:64})
    this.load.spritesheet('lookUpLeft', 'assets/lookUpLeft.png', {frameWidth:64, frameHeight:64})
    this.load.spritesheet('lookUpRight', 'assets/lookUpRight.png', {frameWidth:64, frameHeight:64})
    this.load.spritesheet('wave', 'assets/wave.png', {frameWidth:64, frameHeight:64})


  }
  
  // initialize objects
  function create() {

    cursors = this.input.keyboard.createCursorKeys();

    // the order you add items is how they appear (make sure background is before everything else)
    // background
    this.add.image(0, 0, 'sky').setOrigin(0, 0);
    //this.add.image(170, 50, 'scene');


    // add ground
    platforms = this.physics.add.staticGroup();

    // change this to correct spot
    platforms.create(0, 101, 'ground').setScale(2).refreshBody();



    // char (might need to figure this out, idk if i need two players for left and right yet)
    player = this.physics.add.sprite(100, 100, 'idleLeft');
    // keep track of this
    player.facing = 'left';


    // run into edge of map and don't fall through
    player.setCollideWorldBounds(true);


    // animations (i made different sprites for each movement, instead of all together)
    //need animation for standing still...so no key input

    // idle left
    this.anims.create({
      key: 'standLeft',
      frames: this.anims.generateFrameNumbers('idleLeft', { start: 0, end: 7 }),
      frameRate: 6,
      repeat: -1
    });

    // idle right
    this.anims.create({
      key: 'standRight',
      frames: this.anims.generateFrameNumbers('idleRight', { start: 0, end: 7 }),
      frameRate: 6,
      repeat: -1
    });

    // need animation for walking left
    this.anims.create({
      key: 'leftWalk',
      frames: this.anims.generateFrameNumbers('walkLeft', { start: 0, end: 3 }),
      frameRate: 7,
      repeat: -1
    });

    // walking right
    this.anims.create({
      key: 'rightWalk',
      frames: this.anims.generateFrameNumbers('walkingRight', { start: 0, end: 3 }),
      frameRate: 7,
      repeat: -1
    });

    // sitting (prob have to rename this, see if you can SELECT SPECIFIC OBJECT to start animation, and MOVE SPRITE TO 
    // specific spot)
    this.anims.create({
      key: 'satDown',
      frames: this.anims.generateFrameNumbers('sitting', {start:0, end: 1}),
      frameRate: 7,
      repeat: -1
    })

    // looking up left
    this.anims.create({
      key: 'UpLeft',
      frames: this.anims.generateFrameNumbers('lookUpLeft', {start:0, end: 7}),
      frameRate: 6,
      repeat: -1
    })

    // looking up right
    this.anims.create({
      key: 'UpRight',
      frames: this.anims.generateFrameNumbers('lookUpRight', {start:0, end: 7}),
      frameRate: 7,
      repeat: -1
    })

    // waving
    this.anims.create({
      key: 'waving',
      frames: this.anims.generateFrameNumbers('wave', {start:0, end: 4}),
      frameRate: 7,
      repeat:-1
    })
  }
  
  // gonna get called for every frame update (idk what phaser framerate is auto set to)
  // update commands for game in this 
  function update() {
    // PRESS UP: waving function
    if (cursors.up.isDown) {
      // ptop moving left or right if in motion
      player.setVelocityX(0);
      player.anims.play('waving', true);

      
  
      // return so the frame ends 
      // DO NOT DELETE (movement looks really glitchy without this)
      return;
    }
  
    // PRESS LEFT: walk left
    if (cursors.left.isDown) {

      player.facing = 'left';
      player.setVelocityX(-70);
      player.anims.play('leftWalk', true);

    }
    // PRESS RIGHTL walk right
    else if (cursors.right.isDown) {

      player.facing = 'right';
      player.setVelocityX(70);
      player.anims.play('rightWalk', true);

    }
    // play idle animation if not moving
    else {
      player.setVelocityX(0);
      if (player.facing === 'left') {
        player.anims.play('standLeft', true);
      } else {
        player.anims.play('standRight', true);
      }
    }
  }
  