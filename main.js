import "./style.css";
import { render_function } from "./src/render_function.js";
import exampleData from "./example.json";

const render_completed = () => {
  window.isAnimated = true;
  document.isAnimated = true;
};

window.render_completed = render_completed;

const get_url_parameters = () => {
  const params = new URLSearchParams(window.location.search);
  return Object.fromEntries(params.entries());
};

const execute = (render) => {
  let params = get_url_parameters();
  const url = params.input_data
    ? params.input_data
    : import.meta.env.VITE_BACKEND_URL
    ? import.meta.env.VITE_BACKEND_URL + "/input_data"
    : null;

  const handleResponse = (data) => {
    // get canvas element
    let canvas = document.getElementById("render");
    // set canvas size
    let resolution = data.resolution || [1920, 1080];
    console.log("Set Resolution: ", resolution);
    canvas.setAttribute("width", `${resolution[0]}`);
    canvas.setAttribute("height", `${resolution[1]}`);
    canvas.style.width = `${resolution[0]}px`;
    canvas.style.height = `${resolution[1]}px`;
    // start rendering
    render(data, canvas);
  };

  if (url) {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(handleResponse)
      .catch((error) => {
        console.error("Error:", error);
      });
  } else {
    handleResponse(exampleData);
  }
};

document.addEventListener(
  "DOMContentLoaded",
  function () {
    execute(render_function);
  },
  false
);
