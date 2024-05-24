let canvas;
let ctx;
let mainloop;
let renderer = [];
delta_t = 0.1;
tick_rate = 10;
let grid_dim = [30, 30];
let show_grid = false;
// let width = window.innerWidth - 40;
// let height = window.innerHeight - 40;
let width = 1200;
let height = 600;
let running = false;

// console.log(window.innerHeight);
// const grid_c = require("grid.js");
// let grid = [...new Array(grid_dim[0])].map(() => []);
// let grid = {
//   0: [],
// };

let global_grid = new grid_c();

function init() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  // canvas.width = window.innerWidth - 40;
  // canvas.height = window.innerHeight - 40;
  width = canvas.width;
  height = canvas.height;
  console.log("sodjfl", width, height);

  ctx.translate(0, canvas.height);
  ctx.scale(1, -1);
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
