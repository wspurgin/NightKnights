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