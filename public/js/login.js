/*
  login.js: only meant to interact with login.php, as that *should* be the only page allowing for
  account creation and login.
  */

  $(document).ready(function() {

    $('#loginform').submit(function() {

      //setup information from form (validation happens at form-level, not here)
      var info = {
        'email':$('#loginEmail').val(),
        'password':$('#loginPassword').val()
      };

      info = JSON.stringify(info);    //stringify the information
      info = info.replace(/"/g, "'"); //replace " with ' so things don't hiccup

      var testinfo = {
        'email':'ebusbee@smu.edu',
        'password':'marflebark'
      };

      testinfo = JSON.stringify(testinfo);
      //testinfo = testinfo.replace(/"/g, "'");

      $.ajax({
        url: '../api/login',
        type: 'POST',
        data: testinfo,
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',

        error: function(text) {
          console.log('error, sent:');
          console.log(testinfo);
          console.log('responseText:');
          console.log(text.responseText);
          console.log('statusText:');
          console.log(text.statusText);
          alert('AJAX call unsuccessful. See console for details before closing this window.');
        },

        success: function (data) {
            alert('AJAX call was successful.');
            //TODO: session logic
            //window.location.replace('home.php');
          }
          
        }); //end of AJAX call

    }); //end of #loginform.submit()

  }); //end of document.ready()