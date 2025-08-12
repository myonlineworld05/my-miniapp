import kaboom from "https://unpkg.com/kaboom/dist/kaboom.mjs";

// Initialize Kaboom
kaboom({
  global: true,
  root: document.querySelector("#game"),
  width: 720,
  height: 405,
  scale: 1,
  clearColor: [0.04, 0.06, 0.08, 1],
});

// IMPORTANT: enable gravity explicitly for v3000+
setGravity(1400);

// Load assets
loadSprite("player", "https://i.imgur.com/Wb1qfhK.png");
loadSprite("obst", "https://i.imgur.com/M6rwarW.png");

let SPEED = 280;
let spawnInterval = 1.4;
let score = 0;
let best = 0;
let playing = true;

// DOM UI elements
const scoreDom = document.getElementById('score');
const bestDom = document.getElementById('best');
const postBtn = document.getElementById('btn-post');
const shareBtn = document.getElementById('btn-share');

scene("game", () => {
  // Floor (static body)
  add([
    rect(width(), 48),
    pos(0, height() - 48),
    area(),
    body({ isStatic: true }),
    color(0.06, 0.12, 0.08),
  ]);

  // Player
  const player = add([
    sprite("player"),
    pos(100, height() - 48 - 40),
    area(),
    body(),
    anchor("center"),
  ]);

  // Spawn obstacles (no body, just area + move)
  function spawnObstacle() {
    if (!playing) return;
    const h = rand(28, 56);
    add([
      rect(28, h),
      pos(width() + 20, height() - 48 - h),
      area(),
      color(0.6,0.2,0.2),
      move(LEFT, SPEED),
      "obstacle",
    ]);
    wait(rand(spawnInterval * 0.8, spawnInterval * 1.4), spawnObstacle);
  }
  spawnObstacle();

  // Controls
  onKeyPress("space", () => {
    if (player.isGrounded()) {
      player.jump(520);
    }
  });
  onClick(() => {
    if (player.isGrounded()) player.jump(520);
  });

  // Collision with obstacle
  player.onCollide("obstacle", () => {
    playing = false;
    const final = score;
    best = Math.max(best, final);
    dispatchEvent(new CustomEvent('gameOver', { detail: { score: final, best } }));
    go("lose", { score: final, best });
  });

  // Update score and difficulty
  onUpdate(() => {
    if (!playing) return;
    score += dt() * (SPEED / 100);
    scoreDom.textContent = 'Score: ' + score.toFixed(1);
    bestDom.textContent = 'Best: ' + best.toFixed(1);
    SPEED += dt() * 2.0;
    if (spawnInterval > 0.6) spawnInterval -= dt() * 0.0015;
  });
});

scene("lose", ({ score: sc, best: b }) => {
  add([
    text("Game Over", { size: 36 }),
    pos(width()/2, height()/2 - 30),
    anchor("center"),
  ]);
  add([
    text("Score: " + sc.toFixed(1), { size: 20 }),
    pos(width()/2, height()/2 + 6),
    anchor("center"),
  ]);
  add([
    text("Press SPACE or Click to restart", { size: 14 }),
    pos(width()/2, height()/2 + 44),
    anchor("center"),
  ]);

  // enable share/post buttons
  if (postBtn) postBtn.disabled = false;
  if (shareBtn) shareBtn.disabled = false;

  onKeyPress("space", () => {
    // reset
    score = 0;
    SPEED = 280;
    playing = true;
    if (postBtn) postBtn.disabled = true;
    if (shareBtn) shareBtn.disabled = true;
    go("game");
  });
  onClick(() => {
    score = 0;
    SPEED = 280;
    playing = true;
    if (postBtn) postBtn.disabled = true;
    if (shareBtn) shareBtn.disabled = true;
    go("game");
  });
});

go("game");
