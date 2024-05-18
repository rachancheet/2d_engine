let canvas;
let ctx;
function init() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  drawbackground();
  // setInterval(tick, 220);
  // for (let i = 0; i < 15; i++) tick();
  // tick();
  // tick();
  // tick();
  // tick();
  // tick();
  // tick();
  // tick();
  // tick();
  // tick();
  // tick();
  // tick();
  // tick();
  // tick();
  // tick();
  // tick();
  // tick();
  // tick();
  // tick();
}

function drawbackground() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  //   h = 500;
  //   w = 500;
  //   var background = ctx.createImageData(w, h);
  //   ctx.putImageData(background, 0, 0);
}
function render() {
  for (let i = 0; i < renderer.length; i++) {
    x = renderer[i].x;
    y = renderer[i].y;
    shape = renderer[i].shape;
    color = renderer[i].color;
    if (shape == "circle") {
      //   ctx.fillEllipse(x, y, 10, 10, 10, 10, 10);

      //   ctx.fillStyle = renderer[i].color;
      //   ctx.beginPath();

      //   ctx.ellipse(x, y, 50, 75, Math.PI / 4, 0, 2 * Math.PI);
      //   ctx.stroke();
      ctx.beginPath();
      ctx.arc(x, y, renderer[i].radius, 0, 2 * Math.PI);
      ctx.fillStyle = color;
      ctx.fill();
      console.log("circle");
    }
  }
}
function accforces(obj) {
  let accforces_x = 0;
  let accforces_y = 0;
  for (let i = 0; i < obj.forces.length; i++) {
    accforces_x += obj.forces[i][0];
    accforces_y += obj.forces[i][1];
  }
  return [accforces_x / obj.mass, accforces_y / obj.mass];
}
function compute() {
  for (let i = 0; i < renderer.length; i++) {
    if (
      0 < renderer[i].y &&
      renderer[i].y < canvas.height &&
      0 < renderer[i].x &&
      renderer[i].x < canvas.width
    ) {
      let accforces_x = 0;
      let accforces_y = 0;

      [accforces_x, accforces_y] = accforces(renderer[i]);
      console.log("acctuator", accforces_x, accforces_y);
      renderer[i].x += renderer[i].v[0] + 0.5 * accforces_x;
      renderer[i].y += renderer[i].v[1] + 0.5 * accforces_y;
      renderer[i].v[0] += accforces_x;
      renderer[i].v[1] += accforces_y;
    }
    console.log(renderer[i].color, renderer[i]);
  }
}

function collision() {
  // pos = renderer.map((obj) => [obj.x, obj.y, obj]);
  // pos_x = pos.filter(() => true);
  // pos_x.sort((a, b) => a[0] > b[0]);
  // pos_y = pos.filter(() => true);
  // pos_y.sort((a, b) => a[1] > b[1]);
  // console.log(pos, pos_y);

  for (i = 0; i < renderer.length; i++) {
    for (j = i; j < renderer.length; j++) {
      if (i == j) {
        continue;
      }
      a = renderer[i];
      b = renderer[j];
      let d = Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
      if (d < a.radius + b.radius) {
        console.log("mill gaya", a, b);
        // pend_d = a.radius + b.radius - d;
        magnitude = Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
        magnitude = magnitude ? magnitude : 1;
        console.log("magnitude", magnitude);
        unit_n = [(a.x - b.x) / magnitude, (a.y - b.y) / magnitude];
        console.log(unit_n);
        v_rel = [a.v[0] - b.v[0], a.v[1] - b.v[1]];
        v_rel_dot_n = v_rel[0] * unit_n[0] + v_rel[1] * unit_n[1];
        elasticity = 0.05;
        impulse = (-(1 + elasticity) * v_rel_dot_n) / (1 / a.mass + 1 / b.mass);
        console.log("Impulse", impulse);
        a.apply_force([impulse * unit_n[0], impulse * unit_n[1]]);
        b.apply_force([-impulse * unit_n[0], -impulse * unit_n[1]]);
      }
    }
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

class thing {
  constructor(x, y, radius, shape, color, v, forces, gravity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.shape = shape;
    this.color = color;
    this.mass = 2 * Math.PI * (radius * radius);
    this.v = v;
    this.forces = forces;
    if (gravity) {
      this.forces.push([0, -9.8 * this.mass]);
    }
  }
  add_v(x, y) {
    this.v[0] += x;
    this.v[1] += y;
  }
  apply_force(force) {
    // compute new vs
    console.log(force);
    this.v[0] += force[0] / this.mass;
    this.v[1] += force[1] / this.mass;
  }
}
function tick() {
  compute();
  collision();
  drawbackground();
  //   img = makeimage();
  render();
}
let renderer = [];
ball = new thing(100, 250, 10, "circle", "red", [-10, 0], [], true);
ball1 = new thing(200, 250, 50, "circle", "blue", [10, 0], [], true);
ball2 = new thing(600, 250, 50, "circle", "green", [-10, 0], [], false);
// ball3 = new thing(400, 250, 10, "circle", "white", [10, 0], [], false);
renderer.push(ball, ball1, ball2);
