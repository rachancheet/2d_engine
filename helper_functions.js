function pls_show_grid() {
  show_grid = !show_grid;
  render();
}
function addball(e) {
  e.preventDefault();
  console.log(e.target);
  console.log(e.target.x.value);
  // e.ta;
  let ball = e.target;
  new circle_thing(
    parseInt(ball.x.value),
    parseInt(ball.y.value),
    parseInt(ball.radius.value),
    "pink",
    // ball.color.value,
    [parseInt(ball.vx.value), parseInt(ball.vy.value)],
    [],
    ball.gravity.checked
  );
  console.log(renderer);
  render();
  // tick();
}
function addline(e) {
  e.preventDefault();
  console.log(e.target);
  // console.log(e.target.x.value);
  // e.ta;
  let ball = e.target;
  new line_thing(
    [parseInt(ball.Sx.value), parseInt(ball.Sy.value)],
    [parseInt(ball.Ex.value), parseInt(ball.Ey.value)],
    parseInt(ball.color.value)
  );
  console.log(renderer);
  render();
  // tick();
}
function start() {
  console.log("starting");
  if (!running) {
    mainloop = setInterval(tick, (1 / tick_rate) * 0.001);
    running = true;
  }
}
function stop_() {
  console.log("stoping");
  if (running) {
    clearInterval(mainloop);
    running = false;
  }
}
function step() {
  tick();
}
function demo() {
  let ball1 = new circle_thing(500, 250, 30, "blue", [20, 0], [], true);
  let ball2 = new circle_thing(600, 250, 40, "pink", [-20, 0], [], true);
  let ball3 = new circle_thing(600, 250, 60, "red", [0, 0], [], true);
  let ball4 = new circle_thing(500, 350, 20, "yellow", [-40, 5], [], true);
  let ball5 = new circle_thing(400, 100, 25, "purple", [3, 7], [], true);
  let ball6 = new circle_thing(250, 400, 25, "orange", [-7, 3], [], true);
  let ball8 = new circle_thing(350, 300, 20, "cyan", [-6, 6], [], true);

  let line5 = new line_thing(
    [width / 2 - 88, height / 2 - 200],
    [width / 2 + 200, height / 2 + 200],
    "white"
  );
  start();
}

function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1];
}

function mul_s_v(a, b) {
  return [a[0] * b, a[1] * b];
}
function sub_v(a, b) {
  // console.log("iwheof ", a, b);
  return [a[0] - b[0], a[1] - b[1]];
}
function add_v(a, b) {
  // console.log("iwheof ", a, b);
  return [a[0] + b[0], a[1] + b[1]];
}

function mag_cal(b) {
  // console.log("mag_cal", Math.pow(b[0], 2), Math.pow(b[0], 2));
  return Math.sqrt(Math.pow(b[0], 2) + Math.pow(b[1], 2));
}

function drawbackground() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, width, height);
  if (show_grid) {
    ctx.strokeStyle = "white";
    for (let i = 0; i < width / grid_dim[0]; i++) {
      ctx.beginPath();
      ctx.moveTo(grid_dim[0] * i, 0);
      ctx.lineTo(grid_dim[0] * i, canvas.height);
      ctx.stroke();
    }
    for (let i = 0; i < canvas.height / grid_dim[1]; i++) {
      ctx.beginPath();
      ctx.moveTo(0, grid_dim[1] * i);
      ctx.lineTo(width, grid_dim[1] * i);
      ctx.stroke();
    }
  }
}

function plot_vector(a, b, color) {
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(a[0], a[1]);
  ctx.lineTo(a[0] + b[0], a[1] + b[1]);

  // Draw the Path
  ctx.stroke();
}
