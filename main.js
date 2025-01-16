
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
    
  }
  
  // initialize objects
  function create() {
    // char
    // background
    
  }
  
  // gonna get called for every frame update (idk what phaser framerate is auto set to)
  // i assume i can update the logic for the game in this function
  function update() {
  }
  