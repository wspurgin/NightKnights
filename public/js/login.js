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

      $('#loginform').submit(function(event) {

        var info = {
          'email':$('#loginEmail').val(),
          'password':$('#loginPassword').val()
        };

        console.log('running AJAX call... NOW!');
        $.ajax(
        {
          url: '../api/login',
          type: "POST",
          data: info,
          dataType: "json",
          contentType: "application/json",

          success: function (data) {
            console.log('success:');
            //alert('success!');
            window.location.replace("home.php");
          },
          error: function(data) {
            console.log('error:');
            alert('error :c');
            window.location.replace("home.php");
          }
        });
    }); //end of #loginform.submit()

      $('#test').click(function(event) {
        var info = {
          'email':'ebusbee@smu.edu',
          'password':'marflebark'
        };

        console.log('running AJAX call... NOW!');
        $.ajax(
        {
          url: '../api/login',
          type: "POST",
          data: JSON.stringify(info),
          dataType: "json",
          contentType: "application/json; charset=utf-8",

          success: function () {
            console.log('success:');
            window.location.replace("home.php");
          },
          error: function(text) {
            console.log('error, sent:');
            console.log(JSON.stringify(info));
            console.log('responseText:');
            console.log(text.responseText);
            console.log('statusText:');
            console.log(text.statusText);
          }
        });
    }); //end of #test.submit()

  }); //end of document.ready()