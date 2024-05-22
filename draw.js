let ball1 = new circle_thing(500, 250, 30, "blue", [20, 0], [], true);
let ball2 = new circle_thing(600, 250, 40, "green", [-20, 0], [], true);
let ball3 = new circle_thing(600, 250, 60, "red", [0, 0], [], true);
let ball4 = new circle_thing(500, 350, 20, "yellow", [-40, 5], [], true);
let ball5 = new circle_thing(400, 100, 15, "purple", [3, 7], [], true);
let ball6 = new circle_thing(250, 400, 15, "orange", [-7, 3], [], true);
let ball7 = new circle_thing(550, 200, 5, "pink", [6, -6], [], true);
let ball8 = new circle_thing(350, 300, 10, "cyan", [-6, 6], [], true);
let ball9 = new circle_thing(
  width / 2 + 100,
  height / 2 + 200,
  10,
  "cyan",
  [-6, 6],
  [],
  true
);

let d = 10;
let line1 = new line_thing([d, d], [width - d, d], "white");
let line2 = new line_thing([d, d], [d, height - d], "white");
let line3 = new line_thing([d, height - d], [width - d, height - d], "white");
let line4 = new line_thing([width - d, height - d], [width - d, d], "white");

let line5 = new line_thing(
  [width / 2 - 200, height / 2 - 200],
  [width / 2 + 200, height / 2 + 200],
  "white"
);
