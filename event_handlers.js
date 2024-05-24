window.addEventListener("keydown", (e) => {
  // console.log(e);
  if (e.key == " ") {
    e.preventDefault();
    // clearInterval(mainloop);
    tick();
  }
});
