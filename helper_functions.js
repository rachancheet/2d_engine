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
  // if (width) {
  //   ctx.strokeStyle = "white";
  //   for (let i = 0; i < width / grid_dim[0]; i++) {
  //     ctx.beginPath();
  //     ctx.moveTo(grid_dim[0] * i, 0);
  //     ctx.lineTo(grid_dim[0] * i, canvas.height);
  //     ctx.stroke();
  //   }
  //   for (let i = 0; i < canvas.height / grid_dim[1]; i++) {
  //     ctx.beginPath();
  //     ctx.moveTo(0, grid_dim[1] * i);
  //     ctx.lineTo(width, grid_dim[1] * i);
  //     ctx.stroke();
  //   }
  // }
}

function plot_vector(a, b, color) {
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(a[0], a[1]);
  ctx.lineTo(a[0] + b[0], a[1] + b[1]);

  // Draw the Path
  ctx.stroke();
}
