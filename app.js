let canvas;
let ctx;
let mainloop;
let renderer = [];
delta_t = 0.1;
tick_rate = 10;

function init() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx.translate(0, canvas.height);
  ctx.scale(1, -1);
  drawbackground();

  // ball = new thing(100, 250, 10, "circle", "red", [-10, 0], [], false);
  let ball1 = new circle_thing(500, 250, 30, "blue", [20, 0], [], true);
  let ball2 = new circle_thing(600, 250, 40, "green", [-20, 0], [], true);
  let ball3 = new circle_thing(600, 250, 60, "red", [0, 0], [], true);
  let ball4 = new circle_thing(500, 350, 20, "yellow", [-40, 5], [], true);
  let ball5 = new circle_thing(400, 100, 15, "purple", [3, 7], [], true);
  let ball6 = new circle_thing(250, 400, 15, "orange", [-7, 3], [], true);
  let ball7 = new circle_thing(550, 200, 10, "pink", [6, -6], [], true);
  let ball8 = new circle_thing(350, 300, 10, "cyan", [-6, 6], [], true);

  let width = canvas.width;
  let height = canvas.height;
  let d = 10;

  let line1 = new line_thing([d, d], [width - d, d], "white");
  let line2 = new line_thing([d, d], [d, height - d], "white");
  let line3 = new line_thing([d, height - d], [width - d, height - d], "white");
  let line4 = new line_thing([width - d, height - d], [width - d, d], "white");
  let line5 = new line_thing(
    [width / 2, height / 2 - 200],
    [width / 2, height / 2 + 200],
    "white"
  );

  renderer.push(ball1, ball2);
  renderer.push(ball3);
  renderer.push(ball4);
  renderer.push(ball5);
  renderer.push(ball6);
  renderer.push(ball7);
  renderer.push(ball8);
  renderer.push(line1);
  renderer.push(line2);
  renderer.push(line3);
  renderer.push(line4);
  renderer.push(line5);

  mainloop = setInterval(tick, (1 / tick_rate) * 0.001);
  // for (let i = 0; i < 17; i++) tick();
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

function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1];
}
function dot_v(a, b) {
  return [a[0] * b[0], a[1] * b[1]];
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
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  //   h = 500;
  //   w = 500;
  //   var background = ctx.createImageData(w, h);
  //   ctx.putImageData(background, 0, 0);
}

function render() {
  drawbackground();
  for (let i = 0; i < renderer.length; i++) {
    if (renderer[i] instanceof circle_thing) {
      x = renderer[i].x;
      y = renderer[i].y;
      shape = renderer[i].shape;
      color = renderer[i].color;
      //   ctx.fillEllipse(x, y, 10, 10, 10, 10, 10);

      //   ctx.fillStyle = renderer[i].color;
      //   ctx.beginPath();

      //   ctx.ellipse(x, y, 50, 75, Math.PI / 4, 0, 2 * Math.PI);
      //   ctx.stroke();
      ctx.beginPath();
      ctx.arc(x, y, renderer[i].radius, 0, 2 * Math.PI);
      ctx.fillStyle = color;
      ctx.fill();
      // console.log("circle");
    } else if (renderer[i] instanceof line_thing) {
      // console.log("line rendering");
      let line = renderer[i];
      [x0, y0] = line.start;
      [x1, y1] = line.end;
      ctx.strokeStyle = renderer[i].color;
      ctx.beginPath();
      ctx.moveTo(x0, y0);
      ctx.lineTo(x1, y1);

      // Draw the Path
      ctx.stroke();
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
      !(renderer[i] instanceof line_thing)
      // 0 < renderer[i].y &&
      // renderer[i].y < canvas.height &&
      // 0 < renderer[i].x &&
      // renderer[i].x < canvas.width
    ) {
      let accforces_x = 0;
      let accforces_y = 0;

      [accforces_x, accforces_y] = accforces(renderer[i]);
      // console.log("acctuator", accforces_x, accforces_y);
      renderer[i].x +=
        renderer[i].v[0] * delta_t + 0.5 * accforces_x * delta_t * delta_t;
      renderer[i].y +=
        renderer[i].v[1] * delta_t + 0.5 * accforces_y * delta_t * delta_t;
      renderer[i].v[0] += accforces_x * delta_t;
      renderer[i].v[1] += accforces_y * delta_t;
    }
    // console.log("v ", renderer[i].color, renderer[i].v);
    // console.log("Cords ", renderer[i].color, renderer[i].x, renderer[i].y);
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
function collision() {
  // pos = renderer.map((obj) => [obj.x, obj.y, obj]);
  // pos_x = pos.filter(() => true);
  // pos_x.sort((a, b) => a[0] > b[0]);
  // pos_y = pos.filter(() => true);
  // pos_y.sort((a, b) => a[1] > b[1]);
  // console.log(pos, pos_y);

  for (i = 0; i < renderer.length; i++) {
    if (renderer[i] instanceof line_thing) {
      continue;
    }
    for (j = i; j < renderer.length; j++) {
      if (i == j) {
        continue;
      }

      if (renderer[j] instanceof line_thing) {
        let ball = renderer[i];
        let line = renderer[j];
        [x0, y0] = line.start;
        [x1, y1] = line.end;
        [xc, yc] = [ball.x, ball.y];
        // let a = y1 - y0;
        // let b = x0 - x1;
        // let c = (x1 - x0) * y0 - (y1 - y0) * x0;
        // let perpend_d =
        //   Math.abs(a * x0 + b * y0 + c) / Math.sqrt(a * a + b * b);
        // if (perpend_d < r) {
        // }

        let a = [xc - x0, yc - y0];
        let b = [x1 - x0, y1 - y0];
        let a_b = dot(a, b);
        let b_mag = mag_cal(b);
        let unit_b = [b[0] / b_mag, b[1] / b_mag];
        console.log(unit_b);
        let a_proj_b = [(unit_b[0] * a_b) / b_mag, (unit_b[1] * a_b) / b_mag];
        let c = sub_v(a, a_proj_b);
        let c_mag = mag_cal(c);
        if (c_mag <= ball.radius) {
          console.log("line collision");
          plot_vector(line.start, a, "green");
          plot_vector(line.start, a_proj_b, "green");
          plot_vector(add_v(line.start, a_proj_b), c, "pink");
          // plot_vector(line.start, [108 * unit_b[0], 108 * unit_b[1]], "pink");
          //push out
          let r = ball.radius;
          let c_scale = [
            ((r - c_mag) * c[0]) / c_mag,
            ((r - c_mag) * c[1]) / c_mag,
          ];
          ball.x = ball.x + c_scale[0];
          ball.y = ball.y + c_scale[1];

          //change velocity
          v = ball.v;
          // c = [-c[0], -c[1]];
          //project v on c and v on b for mags only then set as velocity vec
          let v_c = dot(v, c);
          let unit_c = [c[0] / c_mag, c[1] / c_mag];
          let v_proj_c = [(unit_c[0] * v_c) / c_mag, (unit_c[1] * v_c) / c_mag];
          let new_v = [v[0] - 2 * v_proj_c[0], v[1] - 2 * v_proj_c[1]];
          // let unit_c = [c[0]/c_mag, c[1]/c_mag]
          // let jk = [unit_c[0]]
          new_v = [new_v[0], new_v[1]];
          ball.set_v(new_v);
          // ball.v[0] = -v_c;
          // ball.v[1] = v_b;
          console.log(
            " a_b, b_mag, a_proj_b, c, c_mag",
            a_b,
            b_mag,
            a_proj_b,
            c,
            c_mag,
            c_scale,
            new_v,
            ball
          );
        }
      } else if (renderer[j] instanceof circle_thing) {
        a = renderer[i];
        b = renderer[j];
        let n = sub_v([a.x, a.y], [b.x, b.y]);
        let n_ = mag_cal(n);
        n_ = n_ ? n_ : 1000;

        if (n_ <= a.radius + b.radius) {
          console.log("circle collision");
          // console.log("mill gaya", a, b);
          // console.log("n_", n_);
          // console.log("n", n);

          pend_d = a.radius + b.radius - n_;
          unit_n = [n[0] / n_, n[1] / n_];
          // n = [a.v[0] - b.v[0], a.v[1] - b.v[1]];
          va = a.v;
          vb = b.v;
          ma = a.mass;
          mb = b.mass;
          let fa = ((2 * mb) / (ma + mb)) * (dot(sub_v(va, vb), n) / (n_ * n_));
          let fb =
            ((2 * ma) / (ma + mb)) *
            (dot(sub_v(vb, va), [-1 * n[0], -1 * n[1]]) / (n_ * n_));
          new_va = sub_v(va, [fa * n[0], fa * n[1]]);
          new_vb = sub_v(vb, [fb * -1 * n[0], fb * -1 * n[1]]);
          console.log("NEWWWWSSSS", new_va, new_vb);
          // v_a = a.v[0] - (2 * a.mass) / (a.mass + b.mass);
          // v_rel_dot_n = v_rel[0] * unit_n[0] + v_rel[1] * unit_n[1];
          // elasticity = 0.5;
          // impulse =
          //   (-(1 + elasticity) * v_rel_dot_n) / (1 / a.mass + 1 / b.mass);
          // console.log("Impulse", impulse);
          // console.log("unint_n and pend_d", unit_n, pend_d);
          // console.log([
          //   a.x + (unit_n[0] * pend_d) / 2,
          //   a.y + (unit_n[1] * pend_d) / 2,
          // ]);
          a.set_cords([
            a.x + (unit_n[0] * pend_d) / 2,
            a.y + (unit_n[1] * pend_d) / 2,
          ]);
          b.set_cords([
            b.x - (unit_n[0] * pend_d) / 2,
            b.y - (unit_n[1] * pend_d) / 2,
          ]);
          a.set_v(new_va);
          b.set_v(new_vb);
          // a.apply_force([impulse * unit_n[0], impulse * unit_n[1]]);
          // b.apply_force([-impulse * unit_n[0], -impulse * unit_n[1]]);
        }
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

class circle_thing {
  constructor(x, y, radius, color, v, forces, gravity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.mass = 2 * Math.PI * (radius * radius);
    this.v = v;
    this.forces = forces;
    if (gravity) {
      this.forces.push([0, -9.8 * this.mass]);
    }
  }
  set_v(x) {
    this.v[0] = x[0];
    this.v[1] = x[1];
  }
  apply_force(force) {
    // compute new vs
    // console.log(force);
    this.v[0] += force[0] / this.mass;
    this.v[1] += force[1] / this.mass;
  }
  set_cords(cords) {
    // console.log("set cords ", cords);
    this.x = cords[0];
    this.y = cords[1];
  }
}

class line_thing {
  constructor(start, end, color) {
    this.start = start;
    this.end = end;
    this.color = color;
  }
}

function tick() {
  compute();
  collision();
  render();
  //   img = makeimage();
}

window.addEventListener("keydown", (e) => {
  // console.log(e);
  if (e.key == " ") {
    clearInterval(mainloop);
    tick();
  }
});
