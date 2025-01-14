const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

// canvas size
canvas.width = 800;
canvas.height = 400;

// character settings
const character = {
  x: 50,
  y: 300,
  width: 20,
  height: 20,
  color: "blue",
  speed: 5,
};

// make character
function drawCharacter() {
  ctx.fillStyle = character.color;
  ctx.fillRect(character.x, character.y, character.width, character.height);
}

// update game state
function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawCharacter();
}

// key presses
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") character.x += character.speed;
  if (e.key === "ArrowLeft") character.x -= character.speed;
  if (e.key === "ArrowUp") character.y -= character.speed;
  if (e.key === "ArrowDown") character.y += character.speed;
});

// the game loop
function gameLoop() {
  update();
  requestAnimationFrame(gameLoop);
}

gameLoop();
