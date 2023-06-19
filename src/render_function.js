const getRandomColor = () => {
  const hue = Math.floor(Math.random() * 361);
  return `hsl(${hue}, 100%, 50%)`;
};

const render_function = (data, canvas) => {
  const ctx = canvas.getContext("2d");

  // draw bg
  ctx.imageSmoothingEnabled = true;
  let gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, getRandomColor());
  gradient.addColorStop(1, getRandomColor());
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  // draw text
  ctx.fillStyle = "black";
  ctx.font = "15px monospace";
  const text = JSON.stringify(data, null, 2);
  var lines = text.split("\n");

  for (var i = 0; i < lines.length; i++) {
    ctx.fillText(lines[i], 10, 20 + i * 20);
  }
  // eslint-disable-next-line no-undef
  window.render_completed();
};

export { render_function };
