/**
 * renderShape:
 * This function renders a shape based on the provided JSON data on the canvas context.
 *
 * @param {CanvasRenderingContext2D} ctx - The canvas rendering context on which to draw.
 * @param {Object} data - The JSON data to be rendered.
 */
const renderShape = (ctx, data) => {
  const colorMap = {
    Red: "red",
    Blue: "blue",
    Yellow: "yellow",
    Black: "black",
  };
  const shape = data.properties.shape;
  const color = colorMap[data.traits.color];

  ctx.fillStyle = color;

  const midX = ctx.canvas.width / 2;
  const midY = ctx.canvas.height / 2;
  const size = Math.min(midX, midY) * 0.8; // 80% of half the smaller dimension

  switch (shape) {
    case "Square":
      ctx.fillRect(midX - size / 2, midY - size / 2, size, size);
      break;
    case "Round":
      ctx.beginPath();
      ctx.arc(midX, midY, size / 2, 0, Math.PI * 2);
      ctx.fill();
      break;
    case "Triangle":
      ctx.beginPath();
      ctx.moveTo(midX, midY - size / 2);
      ctx.lineTo(midX - size / 2, midY + size / 2);
      ctx.lineTo(midX + size / 2, midY + size / 2);
      ctx.closePath();
      ctx.fill();
      break;
    case "Star":
      const spikes = 5;
      const outerRadius = size / 2;
      const innerRadius = size / 4;
      let rotation = (Math.PI / 2) * 3;
      let x = midX;
      let y = midY;
      let step = Math.PI / spikes;

      ctx.beginPath();
      ctx.moveTo(midX, midY - outerRadius);

      for (let i = 0; i < spikes; i++) {
        x = midX + Math.cos(rotation) * outerRadius;
        y = midY + Math.sin(rotation) * outerRadius;
        ctx.lineTo(x, y);
        rotation += step;

        x = midX + Math.cos(rotation) * innerRadius;
        y = midY + Math.sin(rotation) * innerRadius;
        ctx.lineTo(x, y);
        rotation += step;
      }

      ctx.lineTo(midX, midY - outerRadius);
      ctx.closePath();
      ctx.fill();
      break;
    default:
      console.warn(`Unsupported shape "${shape}"`);
      break;
  }
};

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
  const text = JSON.stringify(
    {
      data,
      ...{
        date:
          new Date().toLocaleTimeString() + ", " + new Date().toDateString(),
      },
    },
    null,
    2
  );
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
  renderShape(ctx, data);

  if (typeof window.renderCompleted === "function") {
    window.renderCompleted();
  }
};

export { renderFunction };
