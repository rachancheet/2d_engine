class line_thing {
  constructor(start, end, color) {
    this.start = start;
    this.end = end;
    this.color = color;
    renderer.push(this);
    global_grid.add(this);
  }
  render() {
    let line = this;
    let x0, y0, x1, y1;
    [x0, y0] = line.start;
    [x1, y1] = line.end;
    ctx.strokeStyle = this.color;
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);

    // Draw the Path
    ctx.stroke();
  }
  collision() {}
  compute() {}
}
