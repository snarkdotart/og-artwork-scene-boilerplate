const getRandomColor = () => {
  const hue = Math.floor(Math.random() * 361);
  return `hsl(${hue}, 100%, 50%)`;
};

const renderGradientBackground = (ctx, canvas) => {
  ctx.imageSmoothingEnabled = true;
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, getRandomColor());
  gradient.addColorStop(1, getRandomColor());
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
};

const renderText = (ctx, data) => {
  ctx.fillStyle = "black";
  ctx.font = "15px monospace";
  const text = JSON.stringify(data, null, 2);
  const lines = text.split("\n");

  lines.forEach((line, index) => {
    ctx.fillText(line, 10, 20 + index * 20);
  });
};

const renderFunction = (data, canvas) => {
  const ctx = canvas.getContext("2d");
  renderGradientBackground(ctx, canvas);
  renderText(ctx, data);

  if (typeof window.render_completed === "function") {
    window.render_completed();
  }
};

export { renderFunction };
