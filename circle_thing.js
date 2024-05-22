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
    this.i = global_grid.get_i(this);
    renderer.push(this);
    global_grid.add(this);
    console.log("circle constructed", this.color, this);
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

  render() {
    let x = this.x;
    let y = this.y;
    let color = this.color;
    //   ctx.fillEllipse(x, y, 10, 10, 10, 10, 10);

    //   ctx.fillStyle = renderer[i].color;
    //   ctx.beginPath();

    //   ctx.ellipse(x, y, 50, 75, Math.PI / 4, 0, 2 * Math.PI);
    //   ctx.stroke();
    ctx.beginPath();
    ctx.arc(x, y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
    // console.log("circle");
  }

  collision(obj) {
    if (obj instanceof circle_thing) {
      let a = this;
      let b = obj;
      let n = sub_v([a.x, a.y], [b.x, b.y]);
      let n_ = mag_cal(n);
      n_ = n_ ? n_ : 1000;

      if (n_ <= a.radius + b.radius) {
        // console.log("circle collision");
        // console.log("mill gaya", a, b);
        // console.log("n_", n_);
        // console.log("n", n);

        let pend_d = a.radius + b.radius - n_;
        let unit_n = [n[0] / n_, n[1] / n_];
        // n = [a.v[0] - b.v[0], a.v[1] - b.v[1]];
        let va = a.v;
        let vb = b.v;
        let ma = a.mass;
        let mb = b.mass;
        let fa = ((2 * mb) / (ma + mb)) * (dot(sub_v(va, vb), n) / (n_ * n_));
        let fb =
          ((2 * ma) / (ma + mb)) *
          (dot(sub_v(vb, va), [-1 * n[0], -1 * n[1]]) / (n_ * n_));
        let new_va = sub_v(va, [fa * n[0], fa * n[1]]);
        let new_vb = sub_v(vb, [fb * -1 * n[0], fb * -1 * n[1]]);
        // console.log("NEWWWWSSSS", new_va, new_vb);
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
    } else if (obj instanceof line_thing) {
      let ball = this;
      let line = obj;
      let [x0, y0] = line.start;
      let [x1, y1] = line.end;
      let [xc, yc] = [ball.x, ball.y];
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
      // console.log(unit_b);
      let a_proj_b = [(unit_b[0] * a_b) / b_mag, (unit_b[1] * a_b) / b_mag];
      let c = sub_v(a, a_proj_b);
      let c_mag = mag_cal(c);
      if (c_mag <= ball.radius) {
        // console.log("line collision");
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
        let v = ball.v;
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
        this.compute();
        // ball.v[0] = -v_c;
        // ball.v[1] = v_b;
        // console.log(
        //   " a_b, b_mag, a_proj_b, c, c_mag",
        //   a_b,
        //   b_mag,
        //   a_proj_b,
        //   c,
        //   c_mag,
        //   c_scale,
        //   new_v,
        //   ball
        // );
      }
    }
  }
  accforces() {
    let obj = this;
    let accforces_x = 0;
    let accforces_y = 0;
    for (let i = 0; i < obj.forces.length; i++) {
      accforces_x += obj.forces[i][0];
      accforces_y += obj.forces[i][1];
    }
    return [accforces_x / obj.mass, accforces_y / obj.mass];
  }
  compute() {
    let accforces_x = 0;
    let accforces_y = 0;

    [accforces_x, accforces_y] = this.accforces();
    // console.log("acctuator", accforces_x, accforces_y);
    this.x += this.v[0] * delta_t + 0.5 * accforces_x * delta_t * delta_t;
    this.y += this.v[1] * delta_t + 0.5 * accforces_y * delta_t * delta_t;
    this.v[0] += accforces_x * delta_t;
    this.v[1] += accforces_y * delta_t;
    global_grid.change(this);
  }
}
