let canvas;
let ctx;
let mainloop;
let renderer = [];
delta_t = 0.1;
tick_rate = 60;
let grid_dim = [20, 20];
let show_grid = false;
// let width = window.innerWidth - 40;
// let height = window.innerHeight - 40;
let width;
let height;
let running = false;
let global_grid;

// console.log(window.innerHeight);
// const grid_c = require("grid.js");
// let grid = [...new Array(grid_dim[0])].map(() => []);
// let grid = {
//   0: [],
// };

function init() {
  console.log("here goes nothing");
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  // canvas.width = window.innerWidth - 40;
  // canvas.height = window.innerHeight - 40;
  width = canvas.width;
  height = canvas.height;
  console.log("sodjfl", width, height);
  global_grid = new grid_c();

  ctx.translate(0, canvas.height);
  ctx.scale(1, -1);
  add_border_lines();
  // drawbackground();

  // mainloop = setInterval(tick, (1 / tick_rate) * 0.001);
  // clearInterval(mainloop);
  // for (let i = 0; i < 17; i++) tick();
  // tick();
  tick();
}

function render() {
  drawbackground();
  for (let i = 0; i < renderer.length; i++) {
    renderer[i].render();
  }
}

function compute() {
  for (let i = 0; i < renderer.length; i++) {
    renderer[i].compute();
  }
}
function collision() {
  for (i = 0; i < renderer.length; i++) {
    if (renderer[i] instanceof line_thing) {
      continue;
    }
    let objs = global_grid.colliding_objects(renderer[i]);
    //  console.log("supoosadly colliding objs ", renderer[i], objs);
    objs.forEach((obj) => {
      renderer[i].collision(obj);
    });
  }

  // for (let i = 0; i < renderer.length; i++) {
  //   if (renderer[i].y < canvas.height && renderer[i].x < canvas.width) {
  //     let accforces_x = 0;
  //     let accforces_y = 0;

  //     [accforces_x, accforces_y] = accforces(renderer[i]);
  //     console.log(accforces_x, accforces_y);
  //     renderer[i].x += renderer[i].v[0] + 0.5 * accforces_x;
  //     renderer[i].y -= renderer[i].v[1] + 0.5 * accforces_x;
  //     renderer[i].v[0] += accforces_x;
  //     renderer[i].v[1] += accforces_y;
  //   }
  //   console.log(renderer[i]);
  // }
}

function tick() {
  compute();
  collision();
  render();
  // console.log(global_grid);
  //   img = makeimage();
}

function start() {
  console.log("starting");
  if (!running) {
    // mainloop = setInterval(async () => {
    //   tick();
    // }, (1 / tick_rate) * 0.001);
    mainloop = setInterval(tick, (1 / tick_rate) * 1000);
    // mainloop = setInterval(tick);
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
  let ball6 = new circle_thing(250, 100, 25, "orange", [7, 3], [], true);
  let ball8 = new circle_thing(350, 300, 20, "cyan", [-6, 6], [], true);

  let line5 = new line_thing(
    [width / 2 - 48, height / 2 - 100],
    [width / 2 + 50, height / 2 + 50],
    "white"
  );
  start();
}
