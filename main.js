
// game configuration
const config = {
    type: Phaser.AUTO,  
    width: 340,
    height: 100,
    pixelArt: true,   // declare this for upscaling
    scale: {
      mode: Phaser.Scale.FIT, // FIT for full screen, None for smaller
      zoom: 2,
      autoCenter: Phaser.Scale.CENTER_BOTH  // put it in the MIDDLE of page    
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
  // gonna start with 3, diploma, github, and resume



  // new game instance
  let game = new Phaser.Game(config);
  
  // preload room and sprite
  function preload() {

    this.load.image('newScene', 'assets/newScene.png');

    // HAVE TO MAKE A GROUND TO STAND ON AND WALLS TO NOT WALK THROUGH
    this.load.image('ground', 'assets/ground.png');
    this.load.spritesheet('idleLeft', 'assets/idleLeft.png', {frameWidth:64, frameHeight:64})
    this.load.spritesheet('idleRight', 'assets/idleRight.png', {frameWidth:64, frameHeight:64})
    this.load.spritesheet('sitting', 'assets/sitting.png', {frameWidth:64, frameHeight:64})
    this.load.spritesheet('walkLeft', 'assets/walkLeft.png', {frameWidth:64, frameHeight:64})
    this.load.spritesheet('walkingRight', 'assets/walkingRight.png', {frameWidth:64, frameHeight:64})
    this.load.spritesheet('lookUpLeft', 'assets/lookUpLeft.png', {frameWidth:64, frameHeight:64})
    this.load.spritesheet('lookUpRight', 'assets/lookUpRight.png', {frameWidth:64, frameHeight:64})
    this.load.spritesheet('waveLeft', 'assets/waveLeft.png', {frameWidth:64, frameHeight:64})
    this.load.spritesheet('waveRight', 'assets/waveRight.png', {frameWidth:64, frameHeight:64})
    this.load.image('diploma', 'assets/diploma.png');
    this.load.image('chair', 'assets/chair.png');




  }
  
  // initialize objects
  function create() {

    // need to get the scaled dimensions (fitted for each screen) for the interactive objects
    // just putting them in their original positions from the background file
    const gameWidth = this.cameras.main.width;  
    const gameHeight = this.cameras.main.height;

    cursors = this.input.keyboard.createCursorKeys();

    // the order you add items is how they appear (make sure background is before everything else)
    // background
    //this.add.image(0, 0, 'newScene').setOrigin(0, 0);

    this.add.image(0, 0, 'newScene').setOrigin(0, 0).setDisplaySize(gameWidth, gameHeight);



    // Add ground platform
  platforms = this.physics.add.staticGroup();
  platforms.create(gameWidth / 2, gameHeight, 'ground') // Center horizontally and place near the bottom
      .setOrigin(0.5, 0.5) // Center the platform
      .setDisplaySize(gameWidth, 1) // Stretch across the full game width and set height to 20px
      .refreshBody();

  // Add player
  player = this.physics.add.sprite(gameWidth / 1.1, gameHeight, 'idleLeft'); // Place player slightly above the platform
  player.setScale(1); // Match the zoom level of the game

  player.setOffset(0,-6);

  player.setCollideWorldBounds(true); // Prevent player from falling out of the game world
  player.setDepth(2); // Ensure player is above the background

  player.facing = 'left';
  player.isSitting = false;

  // Add collision between player and platform
  this.physics.add.collider(player, platforms);


    // add ground
   // platforms = this.physics.add.staticGroup();

    // change this to correct spot
    //platforms.create(0, 100, 'ground').setScale(2).refreshBody();
    //platforms.create(0, 100, 'ground').refreshBody();

    // INTERACTIVE ITEMS

    // diploma
    /** 
   // Diploma's exact position in the background image
    // Adjust these values to match where it is in the background
    const diplomaX = 170 / 340 * gameWidth; // X position in the background (adjusted proportionally)
    const diplomaY = 50 / 100 * gameHeight; // Y position in the background (adjusted proportionally)

    // Add the interactive diploma
    const diploma = this.add.image(diplomaX, diplomaY, 'diploma').setInteractive(
    new Phaser.Geom.Rectangle(72, 36, 33, 22), // Interactive area matches the size of the diploma
    Phaser.Geom.Rectangle.Contains
    );

    // Match the size of the diploma image
    diploma.setScale(1 / this.cameras.main.zoom); // Scale to match the game's zoom
    diploma.setDepth(1); // Ensure it is above the background

    */
    // Diploma image proportions (relative to the image size)
    const diplomaImageWidth = 340; // Width of the diploma.png image
    const diplomaImageHeight = 100; // Height of the diploma.png image

    // Diploma's position and size within the image
    const diplomaOriginalX = 72; // X position in the original image
    const diplomaOriginalY = 36; // Y position in the original image
    const diplomaOriginalWidth = 34; // Width of the diploma
    const diplomaOriginalHeight = 22; // Height of the diploma

    // Scale these values proportionally to match the game world
    const interactiveX = (diplomaOriginalX / diplomaImageWidth) * this.cameras.main.width;
    const interactiveY = (diplomaOriginalY / diplomaImageHeight) * this.cameras.main.height;
    const interactiveWidth = (diplomaOriginalWidth / diplomaImageWidth) * this.cameras.main.width;
    const interactiveHeight = (diplomaOriginalHeight / diplomaImageHeight) * this.cameras.main.height;

    // Add the diploma image
    const diploma = this.add.image(0, 0, 'diploma').setOrigin(0, 0).setDisplaySize(
    this.cameras.main.width, 
    this.cameras.main.height
    );

    // Define the interactive area for the diploma itself
    diploma.setInteractive(
    new Phaser.Geom.Rectangle(interactiveX, interactiveY, interactiveWidth, interactiveHeight),
    Phaser.Geom.Rectangle.Contains
    );


    // Add interaction
    diploma.on('pointerdown', () => {
    console.log('Diploma clicked!');
    window.open('assets/Trevor_Flick_Test.pdf', '_blank', 'noopener,noreferrer');
    });
    diploma.on('pointerover', () => diploma.setTint(0x2AE130));
    diploma.on('pointerout', () => diploma.clearTint());

    
    ////////////////////
    // chair object

    // Diploma image proportions (relative to the image size)
    const chairImageWidth = 340; // Width of the diploma.png image
    const chairImageHeight = 100; // Height of the diploma.png image

    // Diploma's position and size within the image
    const chairOriginalX = 80; // X position in the original image
    const chairOriginalY = 80; // Y position in the original image
    const chairOriginalWidth = 20; // Width of the diploma
    const chairOriginalHeight = 20; // Height of the diploma

    // Scale these values proportionally to match the game world
    const CHAIRinteractiveX = (chairOriginalX / chairImageWidth) * this.cameras.main.width;
    const CHAIRinteractiveY = (chairOriginalY / chairImageHeight) * this.cameras.main.height;
    const CHAIRinteractiveWidth = (chairOriginalWidth / chairImageWidth) * this.cameras.main.width;
    const CHAIRinteractiveHeight = (chairOriginalHeight / chairImageHeight) * this.cameras.main.height;

    // Add the diploma image
    const chair = this.add.image(0, 0, 'chair').setOrigin(0, 0).setDisplaySize(
    this.cameras.main.width, 
    this.cameras.main.height
    );

    // Define the interactive area for the diploma itself
    chair.setInteractive(
    new Phaser.Geom.Rectangle(CHAIRinteractiveX, CHAIRinteractiveY, CHAIRinteractiveWidth, CHAIRinteractiveHeight),
    Phaser.Geom.Rectangle.Contains
    );

    chair.setDepth(2);

    // sitting (prob have to rename this, see if you can SELECT SPECIFIC OBJECT to start animation, and MOVE SPRITE TO 
    // specific spot)
    this.anims.create({
      key: 'satDown',
      frames: this.anims.generateFrameNumbers('sitting', {start:0, end: 1}),
      frameRate: 7,
      repeat: -1
    });

    chair.on('pointerover', () => chair.setTint(0x2AE130));
    chair.on('pointerout', () => chair.clearTint());
    chair.on('pointerdown', () => {
      // Disable player control during the movement
      player.setVelocityX(0);
  
      // Calculate target X position for the chair
      const targetX = CHAIRinteractiveX + CHAIRinteractiveWidth / 2;
  
      // Use a tween to move the player to the chair's position
      this.tweens.add({
          targets: player,
          x: targetX,
          duration: Math.abs(player.x - targetX) * 13, // Adjust duration based on distance
          ease: 'Sine.Out',
          onUpdate: (tween) => {
            // Play the appropriate walking animation during the tween
            if (player.x < targetX) {
                if (player.anims.currentAnim?.key !== 'rightWalk') {
                    player.anims.play('rightWalk', true);
                }
                player.facing = 'right';
            } else if (player.x > targetX) {
                if (player.anims.currentAnim?.key !== 'leftWalk') {
                    player.anims.play('leftWalk', true);
                }
                player.facing = 'left';
            }
        },
          onComplete: () => {
              // Play the sitting animation once the player reaches the chair
              player.anims.play('satDown', true);
              player.setVelocityX(0); // Ensure velocity is reset
              player.setDepth(3);
              player.setOffset(0, -2);
              player.isSitting = true; // Set the sitting state
          }
      });
    
  });

 /** 
    // chair interaction
    chair.on('pointerdown', () => {
    //console.log('chair clicked!');
    player.setDepth(3);
    player.x = CHAIRinteractiveX + 10;
    player.y = CHAIRinteractiveY;
    player.setOffset(0, -2);
    player.anims.play('satDown', true);
    player.isSitting = true;
    });
    chair.on('pointerover', () => chair.setTint(0x2AE130));
    chair.on('pointerout', () => chair.clearTint());

    */


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

  

    // looking up left
    this.anims.create({
      key: 'UpLeft',
      frames: this.anims.generateFrameNumbers('lookUpLeft', {start:0, end: 7}),
      frameRate: 6,
      repeat: -1
    });

    // looking up right
    this.anims.create({
      key: 'UpRight',
      frames: this.anims.generateFrameNumbers('lookUpRight', {start:0, end: 7}),
      frameRate: 7,
      repeat: -1
    });

    // waving left
    this.anims.create({
      key: 'wavingLeft',
      frames: this.anims.generateFrameNumbers('waveLeft', {start:0, end: 4}),
      frameRate: 7,
      repeat:-1
    });

    // waving right
    this.anims.create({
      key: 'wavingRight',
      frames: this.anims.generateFrameNumbers('waveRight', {start:0, end: 4}),
      frameRate: 7,
      repeat:-1
    });

    

  }
  
  // gonna get called for every frame update (idk what phaser framerate is auto set to)
  // update commands for game in this 
  function update() {

    // movement is stopped if user is sitting
    // interrupt sitting with walking left or right
    if (player.isSitting) {
      if (cursors.left.isDown || cursors.right.isDown) {
      // stand when left or right are pressed
      console.log('now standing');
      player.isSitting = false;
      player.anims.play(player.facing === 'left' ? 'standLeft' : 'standRight', true);
      player.setDepth(1);
      player.setOffset(0, -6);


    }
    return; 
  }

   

    // PRESS UP: waving function
    if (cursors.up.isDown) {
      // ptop moving left or right if in motion
      player.setVelocityX(0);
      if (player.facing === 'left') {
        player.anims.play('wavingLeft', true);
      } else {
        player.anims.play('wavingRight', true);
      }

      
  
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
    // PRESS RIGHT: walk right
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
  