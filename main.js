
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
    this.load.spritesheet('sittings', 'assets/sitting.png', {frameWidth:64, frameHeight:64})
    this.load.spritesheet('walkLeft', 'assets/walkLeft.png', {frameWidth:64, frameHeight:64})
    this.load.spritesheet('walkingRight', 'assets/walkingRight.png', {frameWidth:64, frameHeight:64})
    this.load.spritesheet('lookUpLeft', 'assets/lookUpLeft.png', {frameWidth:64, frameHeight:64})
    this.load.spritesheet('lookUpRight', 'assets/lookUpRight.png', {frameWidth:64, frameHeight:64})

  }
  
  // initialize objects
  function create() {
    // the order you add items is how they appear (make sure background is before everything else)
    // background
    this.add.image(0, 0, 'sky').setOrigin(0, 0);
    //this.add.image(170, 50, 'scene');


    // add ground
    platforms = this.physics.add.staticGroup();

    // change this to correct spot
    platforms.create(0, 100, 'ground').setScale(2).refreshBody();



    // char (might need to figure this out, idk if i need two players for left and right yet)
    player = this.physics.add.sprite(0, 0, 'idleLeft');

    // run into edge of map and don't fall through
    player.setCollideWorldBounds(true);


    // animations (i made different sprites for each movement, instead of all together)
    //need animation for standing still...so no key input

    // idle left
    this.anims.create({
      key: 'standLeft',
      frames: this.anims.generateFrameNumbers('idleLeft', { start: 0, end: 8 }),
      frameRate: 7,
      repeat: -1
    });

    // idle right
    this.anims.create({
      key: 'standRight',
      frames: this.anims.generateFrameNumbers('idleRight', { start: 0, end: 8 }),
      frameRate: 7,
      repeat: -1
    });

    // need animation for walking left
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('walkLeft', { start: 0, end: 4 }),
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

    // sitting (prob have to rename this, see if you can SELECT SPECIFIC OBJECT to start animation, and MOVE SPRITE TO 
    // specific spot)
    this.anims.create({
      key: 'satDown',
      frames: this.anims.generatedFrameNumbers('sitting', {start:0, end: 2}),
      frameRate: 7,
      repeat: -1
    })

    // looking up left
    this.anims.create({
      key: 'UpLeft',
      frames: this.anims.generatedFrameNumbers('lookUpLeft', {start:0, end: 8}),
      frameRate: 7,
      repeat: -1
    })

    // looking up right
    this.anims.create({
      key: 'UpRight',
      frames: this.anims.generatedFrameNumbers('lookUpRight', {start:0, end: 8}),
      frameRate: 7,
      repeat: -1
    })


  }
  
  // gonna get called for every frame update (idk what phaser framerate is auto set to)
  // i assume i can update the logic for the game in this function
  function update() {

    if (cursors.left.isDown)
        {
            player.setVelocityX(-160);

            player.anims.play('left', true);
        }
        else if (cursors.right.isDown)
        {
            player.setVelocityX(160);

            player.anims.play('right', true); // will only play if not already playing
        }
        else // need two here, one for idleLeft and idleRight
        {
            player.setVelocityX(0);

            player.anims.play('standLeft'); //
        }

        if (cursors.up.isDown && player.body.touching.down)
        {
            player.setVelocityY(0);

            player.anims.play('UpLeft')  // add true
        }


  }
  