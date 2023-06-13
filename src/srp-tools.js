function get_url_parameters() {
    const params = new URLSearchParams(window.location.search);
    return Object.fromEntries(params.entries());
}

function execute(render_function) {
    let params = get_url_parameters()
    $.ajax({
        url: params.input_data || 'http://localhost:8000/input_data',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            data.success = true
            render_function(data)
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log('Error:', textStatus, errorThrown);
            render_function({success: false, error: errorThrown})
        }
    });
}

function render_completed() {
    window.isAnimated = true;
    document.isAnimated = true;
}
