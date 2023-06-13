function render_function(data, canvas) {
    let ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = true;
    let gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, getRandomColor());
    gradient.addColorStop(1, getRandomColor());
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    let font_size = data.font_size || 50;
    ctx.font = `${font_size}px Arial`;
    ctx.fillStyle = data.text_color || "#FFF";
    let text = data.text || 'Example Text';
    let textWidth = ctx.measureText(text).width;
    let x = (canvas.width - textWidth) / 2;
    let y = canvas.height / 2;
    ctx.fillText(text, x, y);
    // on render completed
    render_completed()
}

function getRandomColor() {
  const hue = Math.floor(Math.random() * 361);
  return  `hsl(${hue}, 100%, 50%)`;
}