function get_url_parameters() {
    const params = new URLSearchParams(window.location.search);
    return Object.fromEntries(params.entries());
}

function execute(render_function) {
    let params = get_url_parameters()
    $.ajax({
        url: params.input_data || 'http://localhost:9000/input_data',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            // get canvas element
            let canvas = document.getElementById("render");
            // set canvas size
            let resolution = data.resolution || [1920, 1080]
            console.log('Resolution: ', resolution)
            // set canvas size
            $(canvas).attr({
                "width": `${resolution[0]}`,
                "height": `${resolution[1]}`
            }).css({
                "width": `${resolution[0]}px`,
                "height": `${resolution[1]}px`
            });
            // start rendering
            render_function(data, canvas)
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error(textStatus, errorThrown);
        }
    });
}


function render_completed() {
    window.isAnimated = true;
    document.isAnimated = true;
}


document.addEventListener('DOMContentLoaded', function() {
    if (typeof render_function === 'function') {
        execute(render_function);
    } else {
        console.error('Render function not defined')
    }
}, false);
