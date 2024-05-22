window.addEventListener("keydown", (e) => {
  // console.log(e);
  if (e.key == " ") {
    clearInterval(mainloop);
    tick();
  }
});
