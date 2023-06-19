import "./style.css";
import { renderFunction } from "./src/renderFunction.js";
import exampleData from "./example.json";

const renderCompleted = () => {
  window.isAnimated = true;
  document.isAnimated = true;
};

window.renderCompleted = renderCompleted;

const getUrlParameters = () => {
  const params = new URLSearchParams(window.location.search);
  return Object.fromEntries(params.entries());
};

const renderContent = async (render) => {
  const params = getUrlParameters();
  const url = params.input_data
    ? params.input_data
    : import.meta.env.VITE_BACKEND_URL
    ? `${import.meta.env.VITE_BACKEND_URL}/input_data`
    : null;

  const handleResponse = (data) => {
    const canvas = document.getElementById("render");
    const resolution = data.resolution || [1920, 1080];
    console.log("Set Resolution: ", resolution);
    canvas.setAttribute("width", resolution[0].toString());
    canvas.setAttribute("height", resolution[1].toString());
    canvas.style.width = `${resolution[0]}px`;
    canvas.style.height = `${resolution[1]}px`;

    render(data, canvas);
  };

  try {
    if (url) {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      handleResponse(data);
    } else {
      handleResponse(exampleData);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

document.addEventListener(
  "DOMContentLoaded",
  () => {
    renderContent(renderFunction);
  },
  false
);
