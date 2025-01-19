
// game configuration
const config = {
    type: Phaser.AUTO,  
    width: 800,
    height: 600,
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

  // new game instance
  let game = new Phaser.Game(config);
  
  // preload room and sprite
  function preload() {

    this.load.image('scene', 'assets/scene.png');

    // HAVE TO MAKE A GROUND TO STAND ON AND WALLS TO NOT WALK THROUGH
    this.load.image('ground', 'assets/ground.png');
    this.load.spritesheet('idleLeft', 'assets/idleLeft.png', {frameWidth:64, frameHeight:64})
    this.load.spritesheet('idleRight', 'assets/idleRight.png', {frameWidth:64, frameHeight:64})
    this.load.spritesheet('sittings', 'assets/sitting.png', {frameWidth:64, frameHeight:64})
    this.load.spritesheet('walkingLeft', 'assets/walkingLeft.png', {frameWidth:64, frameHeight:64})
    this.load.spritesheet('walkingRight', 'assets/walkingRight.png', {frameWidth:64, frameHeight:64})

  }
  
  // initialize objects
  function create() {
    // the order you add items is how they appear (make sure background is before everything else)
    // background
    this.add.image(0, 0, 'scene').setOrigin(0, 0);

    // add ground
    platforms = this.physics.add.staticGroup();

    // change this to correct spot
    platforms.create(400, 568, 'ground').setScale(2).refreshBody();



    // char (might need to figure this out, idk if i need two players for left and right yet)
    player = this.physics.add.sprite(100, 450, 'idleLeft');

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

    // sitting (prob have to rename this, see if you can SELECT SPECIFIC OBJECT to start animation, and MOVE SPRITE TO 
    // specific spot)
    this.anims.create({
      key: 'rightClick',
      frames: this.anims.generatedFrameNumbers('sitting', {start:0, end: 2}),
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

            player.anims.play('right', true);
        }
        else // need two here, one for idleLeft and idleRight
        {
            player.setVelocityX(0);

            player.anims.play('standLeft');
        }

  }
  