import './style.css'
import {execute} from "./src/srp-tools.js";
import {render_function} from "./src/render_function.js";

document.addEventListener('DOMContentLoaded', function() {
    if (typeof render_function === 'function') {
        execute(render_function);
    } else {
        console.error('Render function not defined')
    }
}, false);

