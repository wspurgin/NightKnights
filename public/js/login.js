/*
  login.js: only meant to interact with login.php, as that *should* be the only page allowing for
  account creation and login.

  TODO:
    1. Implement login call.
    2. Implement account creation call.
    3. Handle errors on login.
    4. Handle errors on account creation.
    */

    $(document).ready(function() {

      $('#loginform').submit(function() {

        var info = {
            'email': $('#loginEmail').val(),
            'password': $('#loginPassword').val()
          };

        $.ajax(
        {
          url: '/api/login',
          type: "POST",
          data: JSON.stringify(info),
          dataType: "json",
          contentType: "application/json; charset=utf-8",

          success: function (data) {
            alert('success!');
            console.log(data);
            window.location.replace("home.php");
          },
          error: function(data) {
            alert('error :c');
            console.log(data);
            window.location.replace("home.php");
          }
        });
    }); //end of #loginform.submit()

  }); //end of document.ready()