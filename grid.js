class grid_c {
  constructor() {
    this.ls = {
      0: [],
    };
  }
  get_i(obj) {
    let w = width;
    let ans = [];
    if (obj instanceof circle_thing) {
      let x0 = Math.floor((obj.x - obj.radius) / grid_dim[0]);
      let x1 = Math.floor((obj.x + obj.radius) / grid_dim[0]);
      let y0 = Math.floor((obj.y - obj.radius) / grid_dim[1]);
      let y1 = Math.floor((obj.y + obj.radius) / grid_dim[1]);
      for (let i = x0; i <= x1; i++) {
        for (let j = y0; j <= y1; j++) {
          ans.push(i + j * Math.floor(w / grid_dim[0]));
        }
      }
      // console.log("get_i ans ob", obj, ans, x0, x1, y0, y1);
    } else if (obj instanceof line_thing) {
      let line = obj;
      let start = line.start;
      let end = line.end;
      let x0 = Math.floor(start[0] / grid_dim[0]);
      let x1 = Math.floor(end[0] / grid_dim[0]);
      let y0 = Math.floor(start[1] / grid_dim[1]);
      let y1 = Math.floor(end[1] / grid_dim[1]);
      if (y0 > y1) {
        [y0, y1] = [y1, y0];
      }
      for (let i = x0; i <= x1; i++) {
        for (let j = y0; j <= y1; j++) {
          ans.push(i + j * Math.floor(w / grid_dim[0]));
        }
      }

      // console.log("get_i ans ob", obj, ans, x0, x1, y0, y1);
    }

    return ans;
  }
  change(obj) {
    let gh = obj.i;
    for (let i = 0; i < gh.length; i++) {
      if (this.ls[gh[i]]) {
        gh = this.ls[gh[i]].filter((abj) => {
          return abj != obj;
        });
      }
    }

    // console.log(obj, gh, this.ls);
    let jk = this.get_i(obj);
    for (let i = 0; i < jk.length; i++) {
      if (this.ls[jk[i]]) {
        this.ls[jk[i]].push(obj);
      } else {
        this.ls[jk[i]] = [obj];
      }
    }
    obj.i = jk;
  }
  add(obj) {
    let jk = this.get_i(obj);
    for (let i = 0; i < jk.length; i++) {
      if (this.ls[jk[i]]) {
        this.ls[jk[i]].push(obj);

        // console.log("adding obj to ls", obj, jk[i]);
      } else {
        this.ls[jk[i]] = [obj];
      }
    }
  }
  colliding_objects(obj) {
    let checks = [];
    // let w = width;
    // let n_row = w / grid_dim[0];
    let jk = obj.i;
    for (let i = 0; i < jk.length; i++) {
      if (this.ls[jk[i]]) {
        checks.push(...this.ls[jk[i]]);
      }
    }
    // console.log("collision check ", checks);
    // let que = [
    //   i,
    //   i - 1,
    //   i + 1,
    //   i - n_row,
    //   i + n_row,
    //   i - n_row + 1,
    //   i + n_row + 1,
    //   i - n_row - 1,
    //   i + n_row - 1,
    // ];
    // for (let j = 0; j < que.length; j++) {
    //   if (this.ls[que[j]]) {
    //     checks.push(...this.ls[que[j]]);
    //   }
    // }
    return checks;
  }
}
