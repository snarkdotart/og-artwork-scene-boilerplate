/**
 * getRandomColor:
 * This function generates a random HSL color string.
 *
 * @returns {string} - An HSL color string representing a random color.
 */
const getRandomColor = () => {
  const hue = Math.floor(Math.random() * 361);
  return `hsl(${hue}, 100%, 50%)`;
};

/**
 * renderGradientBackground:
 * This function draws a gradient background on a provided canvas context.
 *
 * @param {CanvasRenderingContext2D} ctx - The canvas rendering context on which to draw.
 * @param {HTMLCanvasElement} canvas - The canvas element.
 */
const renderGradientBackground = (ctx, canvas) => {
  ctx.imageSmoothingEnabled = true;
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, getRandomColor());
  gradient.addColorStop(1, getRandomColor());
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
};

/**
 * renderText:
 * This function renders formatted JSON data as text on the provided canvas context.
 *
 * @param {CanvasRenderingContext2D} ctx - The canvas rendering context on which to draw.
 * @param {Object} data - The JSON data to be rendered.
 */
const renderText = (ctx, data) => {
  ctx.fillStyle = "black";
  ctx.font = "15px monospace";
  const text = JSON.stringify(data, null, 2);
  const lines = text.split("\n");

  lines.forEach((line, index) => {
    ctx.fillText(line, 10, 20 + index * 20);
  });
};

/**
 * renderFunction:
 * This function renders a gradient background and JSON data on a canvas.
 * It also calls the `window.render_completed` function, if it exists and is a function.
 *
 * @param {Object} data - The JSON data to be rendered on the canvas.
 * @param {HTMLCanvasElement} canvas - The canvas on which the data is to be rendered.
 */
const renderFunction = (data, canvas) => {
  const ctx = canvas.getContext("2d");
  renderGradientBackground(ctx, canvas);
  renderText(ctx, data);

  if (typeof window.render_completed === "function") {
    window.render_completed();
  }
};

export { renderFunction };
