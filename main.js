import "./style.css";
import { renderFunction } from "./src/renderFunction.js";
import onRun from "./src/traits.js";

const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};
const renderCompleted = () => {
  window.isAnimated = true;
  document.isAnimated = true;
};

window.renderCompleted = renderCompleted;

const getUrlParameters = () => {
  const params = new URLSearchParams(window.location.search);
  return Object.fromEntries(params.entries());
};
const handleResponse = (data, render) => {
  const canvas = document.getElementById("render");
  const resolution = data.resolution || [1920, 1080];
  console.log("Set Resolution: ", resolution);
  canvas.setAttribute("width", resolution[0].toString());
  canvas.setAttribute("height", resolution[1].toString());
  canvas.style.width = `${resolution[0]}px`;
  canvas.style.height = `${resolution[1]}px`;

  render(data, canvas);
};
const renderContent = async (render) => {
  const params = getUrlParameters();
  const url = params.input_data
    ? params.input_data
    : import.meta.env.VITE_BACKEND_URL
    ? `${import.meta.env.VITE_BACKEND_URL}/input_data`
    : null;

  try {
    if (url) {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      handleResponse(data, render);
    } else {
      const data = onRun({ seed: randomInt(0, 1000000) });
      handleResponse(data, render);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

document.addEventListener(
  "DOMContentLoaded",
  () => renderContent(renderFunction),
  false
);
