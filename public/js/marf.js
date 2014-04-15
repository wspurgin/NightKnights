// helper function to turn a forms inputs into a JSON string.
// the it will be an JSON object with attributes specified as such:
// [input name attribute]: [input value]
function formToJSON(form) {
    var inputs = {}
    $.each(form.serializeArray(), function(i, input) {
        inputs[input.name] = input.value;
    });

    return JSON.stringify(inputs);
}

// Bind logout for pages with logout
$(document).ready(function() {
    if ($("#logout") != undefined) {
        $("#logout").click(function(event) {
            event.preventDefault();

            $.ajax({
                url: '/api/logout',
                type: 'GET',
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',

                error: function(res) {
                    data = res.responseJSON
                    if (data.success == false) {
                        // credintials were bad, reset the form:
                        form[0].reset();
                        alert(data.message)
                    } else {
                        // If the error was for some other reason, than what
                        // could be caught, log data, and alert errors. Don't reset
                        console.log(data)
                        alert("Errors occured during your request. Please try again.");
                    };
                },

                success: function(data) {
                    if (data.success) {
                        window.location.replace('/');
                        console.log(data.message);
                    } else {
                        // credintials were bad, reset the form:
                        form[0].reset();
                        alert(data.message);
                    };
                }

            }); //end of AJAX call
        });
    };
});