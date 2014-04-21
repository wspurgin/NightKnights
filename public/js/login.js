/*
  login.js: only meant to interact with index.php, as that *should* be the only page allowing for
  account creation and login.
  */

$(document).ready(function() {

    $('#loginform').submit(function(event) {
        event.preventDefault();
        //setup information from form (validation happens at form-level, not here)

        data = formToJSON($(this));
        var form = $(this);
        $.ajax({
            url: '/api/login',
            type: 'POST',
            data: data,
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
                    window.location.replace('home.php');
                    console.log(data.message);
                } else {
                    // credintials were bad, reset the form:
                    form[0].reset();
                    alert(data.message);
                };
            }

        }); //end of AJAX call

    }); //end of #loginform.submit()

    $('#accountForm').submit(function(event) {
        event.preventDefault();
        //setup information from form (validation happens at form-level, not here)

        data = formToJSON($(this));
        var form = $(this);
        $.ajax({
            url: '/api/users',
            type: 'POST',
            data: data,
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',

            error: function(res) {
                data = res.responseJSON
                if (data.success == false) {
                    // errors occuerd
                    form[0].reset();
                    console.log(res)
                    alert(data.message)
                } else {
                    // If the error was for some other reason, than what
                    // could be caught, log data, and alert errors. Don't reset
                    console.log(res)
                    alert("Errors occured during your request. Please try again.");
                };
            },

            success: function(data) {
                if (data.success) {
                    window.location.replace('home.php');
                    console.log(data.message);
                } else {
                    // errors occured
                    alert(data.message);
                    console.log(data);
                };
            }

        }); //end of AJAX call

    }); //end of #accountForm.submit()

}); //end of document.ready()