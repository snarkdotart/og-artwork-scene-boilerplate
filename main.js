import './style.css'
import {render_function} from "./src/render_function.js";

const render_completed = () => {
    window.isAnimated = true;
    document.isAnimated = true;
};

window.render_completed = render_completed;

const get_url_parameters = () => {
    const params = new URLSearchParams(window.location.search);
    return Object.fromEntries(params.entries());
};

const execute = (render) =>  {
    let params = get_url_parameters()
    fetch(params.input_data || 'http://0.0.0.0:9000/input_data')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // get canvas element
            let canvas = document.getElementById("render");
            // set canvas size
            let resolution = data.resolution || [1920, 1080]
            console.log('Set Resolution: ', resolution)
            canvas.setAttribute("width", `${resolution[0]}`);
            canvas.setAttribute("height", `${resolution[1]}`);
            canvas.style.width = `${resolution[0]}px`;
            canvas.style.height = `${resolution[1]}px`;
            // start rendering
            render(data, canvas);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

document.addEventListener('DOMContentLoaded', function() {
    execute(render_function)
}, false);

