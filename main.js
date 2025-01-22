
// tooltip elements (need one for box and text)
const tooltip = document.getElementById('tooltip');
const tooltipText = document.getElementById('tooltip-text');

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
    this.load.image('laptop', 'assets/laptop.png');
    this.load.image('trophy', 'assets/trophy.png');
    this.load.image('notes', 'assets/notes.png');
    this.load.image('toDoList', 'assets/toDoList.png');
    this.load.spritesheet('sparkles', 'assets/sparkles.png', { frameWidth: 340, frameHeight: 100 });
    this.load.spritesheet('chairSparkles', 'assets/chairSparkles.png', { frameWidth: 340, frameHeight: 100 });








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
  player.setDepth(11); // Ensure player is above the background

  player.facing = 'left';
  player.isSitting = false;

  // Add collision between player and platform
  this.physics.add.collider(player, platforms);

   // Add sparkle effect 
   this.anims.create({
    key: 'sparkleAnim',
    frames: this.anims.generateFrameNumbers('sparkles', { start: 0, end: 7 }),
    frameRate: 7,
    repeat: -1
  });

  const sparkle = this.add.sprite(0, 0, 'sparkles').setOrigin(0, 0).setDisplaySize(gameWidth, gameHeight);
    sparkle.play('sparkleAnim');
    sparkle.setDepth(3);


  // Add chair sparkles (needed new layer since its depth is higher)
  // Add sparkle effect 
  this.anims.create({
    key: 'chairSparkleAnim',
    frames: this.anims.generateFrameNumbers('chairSparkles', { start: 0, end: 7 }),
    frameRate: 7,
    repeat: -1
  });

  const chairSparkle = this.add.sprite(0, 0, 'chairSparkles').setOrigin(0, 0).setDisplaySize(gameWidth, gameHeight);
    chairSparkle.play('chairSparkleAnim');
    chairSparkle.setDepth(13);

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
    diploma.on('pointerover', () => {
      tooltip.style.display = 'flex'; // Show the tooltip
      tooltipText.innerText = 'click to view my resume!';
      diploma.setTint(0x2AE130)});
    diploma.on('pointerout', () => {
      tooltip.style.display = 'none'; // Hide tooltip
      diploma.clearTint()});

    
      
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

    chair.setDepth(12);

    // sitting (prob have to rename this, see if you can SELECT SPECIFIC OBJECT to start animation, and MOVE SPRITE TO 
    // specific spot)
    this.anims.create({
      key: 'satDown',
      frames: this.anims.generateFrameNumbers('sitting', {start:0, end: 1}),
      frameRate: 7,
      repeat: -1
    });

    chair.on('pointerover', () => {
    tooltip.style.display = 'flex';
    tooltipText.innerText = 'click to relax!';
    chair.setTint(0x2AE130)});
    chair.on('pointerout', () => {
      tooltip.style.display = 'none'; // Hide tooltip
      chair.clearTint()});
    chair.on('pointerdown', () => {
      // BUG FIX: if player is already sitting, sitting again will break player
      if (player.isSitting) {
        return;
      }
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

  // laptop object
  // Diploma image proportions (relative to the image size)
  const laptopImageWidth = 340; // Width of the laptop.png image
  const laptopImageHeight = 100; // Height of the laptop.png image

  // laptop's position and size within the image
  const laptopOriginalX = 138; // X position in the original image
  const laptopOriginalY = 60; // Y position in the original image
  const laptopOriginalWidth = 19; // Width of the laptop
  const laptopOriginalHeight = 12; // Height of the laptop

  // Scale these values proportionally to match the game world
  const LAPTOPinteractiveX = (laptopOriginalX / laptopImageWidth) * this.cameras.main.width;
  const LAPTOPinteractiveY = (laptopOriginalY / laptopImageHeight) * this.cameras.main.height;
  const LAPTOPinteractiveWidth = (laptopOriginalWidth / laptopImageWidth) * this.cameras.main.width;
  const LAPTOPinteractiveHeight = (laptopOriginalHeight / laptopImageHeight) * this.cameras.main.height;

  // Add the laptop image
  const laptop = this.add.image(0, 0, 'laptop').setOrigin(0, 0).setDisplaySize(
  this.cameras.main.width, 
  this.cameras.main.height
  );

  // Define the interactive area for the laptop itself
  laptop.setInteractive(
  new Phaser.Geom.Rectangle(LAPTOPinteractiveX, LAPTOPinteractiveY, LAPTOPinteractiveWidth, LAPTOPinteractiveHeight),
  Phaser.Geom.Rectangle.Contains
  );


  // Add interaction
  laptop.on('pointerdown', () => {
  console.log('laptop clicked!');
  window.open('https://github.com/capstone-projects-2024-fall/aldwairi-projects-skribble', '_blank', 'noopener,noreferrer');
  });
  laptop.on('pointerover', () => {
    tooltip.style.display = 'flex';
    tooltipText.innerText = 'click to check out a recent project!';
    laptop.setTint(0x2AE130)});
  laptop.on('pointerout', () => {
    tooltip.style.display = 'none'; // Hide tooltip
    laptop.clearTint()});


  // trophy object
  // Diploma image proportions (relative to the image size)
  const trophyImageWidth = 340; // Width of the trophy.png image
  const trophyImageHeight = 100; // Height of the trophy.png image

  // trophy's position and size within the image
  const trophyOriginalX = 27; // X position in the original image
  const trophyOriginalY = 40; // Y position in the original image
  const trophyOriginalWidth = 19; // Width of the trophy
  const trophyOriginalHeight = 12; // Height of the trophy

  // Scale these values proportionally to match the game world
  const trophyinteractiveX = (trophyOriginalX / trophyImageWidth) * this.cameras.main.width;
  const trophyinteractiveY = (trophyOriginalY / trophyImageHeight) * this.cameras.main.height;
  const trophyinteractiveWidth = (trophyOriginalWidth / trophyImageWidth) * this.cameras.main.width;
  const trophyinteractiveHeight = (trophyOriginalHeight / trophyImageHeight) * this.cameras.main.height;

  // Add the trophy image
  const trophy = this.add.image(0, 0, 'trophy').setOrigin(0, 0).setDisplaySize(
  this.cameras.main.width, 
  this.cameras.main.height
  );

  // Define the interactive area for the trophy itself
  trophy.setInteractive(
  new Phaser.Geom.Rectangle(trophyinteractiveX, trophyinteractiveY, trophyinteractiveWidth, trophyinteractiveHeight),
  Phaser.Geom.Rectangle.Contains
  );


  // Add interaction
  trophy.on('pointerdown', () => {
  console.log('trophy clicked!');
  window.open('https://devpost.com/software/picnicdelphia#updates', '_blank', 'noopener,noreferrer');
  });
  trophy.on('pointerover', () => {
    tooltip.style.display = 'flex';
    tooltipText.innerText = 'click to check out a winning hackathon project!';
    trophy.setTint(0x2AE130)});
  trophy.on('pointerout', () => {
    tooltip.style.display = 'none'; // Hide tooltip
    trophy.clearTint()});


  // notes object
  // Diploma image proportions (relative to the image size)
  const notesImageWidth = 340; // Width of the notes.png image
  const notesImageHeight = 100; // Height of the notes.png image

  // notes's position and size within the image
  const notesOriginalX = 163; // X position in the original image
  const notesOriginalY = 65; // Y position in the original image
  const notesOriginalWidth = 24; // Width of the notes
  const notesOriginalHeight = 18; // Height of the notes

  // Scale these values proportionally to match the game world
  const notesinteractiveX = (notesOriginalX / notesImageWidth) * this.cameras.main.width;
  const notesinteractiveY = (notesOriginalY / notesImageHeight) * this.cameras.main.height;
  const notesinteractiveWidth = (notesOriginalWidth / notesImageWidth) * this.cameras.main.width;
  const notesinteractiveHeight = (notesOriginalHeight / notesImageHeight) * this.cameras.main.height;

  // Add the notes image
  const notes = this.add.image(0, 0, 'notes').setOrigin(0, 0).setDisplaySize(
  this.cameras.main.width, 
  this.cameras.main.height
  );

  // Define the interactive area for the notes itself
  notes.setInteractive(
  new Phaser.Geom.Rectangle(notesinteractiveX, notesinteractiveY, notesinteractiveWidth, notesinteractiveHeight),
  Phaser.Geom.Rectangle.Contains
  );


  // Add interaction
  notes.on('pointerdown', () => {
  console.log('notes clicked!');
  window.open('https://devpost.com/software/picnicdelphia#updates', '_blank', 'noopener,noreferrer');
  });
  notes.on('pointerover', () =>{
    tooltip.style.display = 'flex';
    tooltipText.innerText = 'click to see the design process for this site!';
    notes.setTint(0x2AE130)});
  notes.on('pointerout', () => {
    tooltip.style.display = 'none'; // Hide tooltip
    notes.clearTint()});


  // toDoList object
  // toDoList image proportions (relative to the image size)
  const toDoListImageWidth = 340; // Width of the toDoList.png image
  const toDoListImageHeight = 100; // Height of the toDoList.png image

  // toDoList's position and size within the image
  const toDoListOriginalX = 265; // X position in the original image
  const toDoListOriginalY = 58; // Y position in the original image
  const toDoListOriginalWidth = 9; // Width of the toDoList
  const toDoListOriginalHeight = 15; // Height of the toDoList

  // Scale these values proportionally to match the game world
  const toDoListinteractiveX = (toDoListOriginalX / toDoListImageWidth) * this.cameras.main.width;
  const toDoListinteractiveY = (toDoListOriginalY / toDoListImageHeight) * this.cameras.main.height;
  const toDoListinteractiveWidth = (toDoListOriginalWidth / toDoListImageWidth) * this.cameras.main.width;
  const toDoListinteractiveHeight = (toDoListOriginalHeight / toDoListImageHeight) * this.cameras.main.height;

  // Add the toDoList image
  const toDoList = this.add.image(0, 0, 'toDoList').setOrigin(0, 0).setDisplaySize(
  this.cameras.main.width, 
  this.cameras.main.height
  );

  // Define the interactive area for the toDoList itself
  toDoList.setInteractive(
  new Phaser.Geom.Rectangle(toDoListinteractiveX, toDoListinteractiveY, toDoListinteractiveWidth, toDoListinteractiveHeight),
  Phaser.Geom.Rectangle.Contains
  );


  // Add interaction
  toDoList.on('pointerdown', () => {
  console.log('toDoList clicked!');
  window.open('https://devpost.com/software/picnicdelphia#updates', '_blank', 'noopener,noreferrer');
  });
  toDoList.on('pointerover', () => {
    tooltip.style.display = 'flex';
    tooltipText.innerText = 'click to contact me!';
    toDoList.setTint(0x2AE130)});
  toDoList.on('pointerout', () => {
    tooltip.style.display = 'none'; // Hide tooltip
    toDoList.clearTint()});

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
      player.setDepth(11);
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
  