$(document).ready(function() {

  $('#passwordresetform').submit(function(event) {
    event.preventDefault();

    var form = formToJSON($(this));
    $.ajax({
      url: '/api/user/password',
      type: 'PATCH',
      dataType: 'json',
      data: form.newpassword,
      contentType: 'applicaton/json; charset=utf-8',

      error: function(res) {
        data = res.responseJSON;
        if(data.success == false) {
          console.log('error, but data.success == false');
          console.log(data.message);
        } else {
          console.log('error. it\'s pretty bad.');
        }

      },

      success: function(data) {
        if (data.success) {
          alert('Your password has been changed successfully!');
        } else {
          console.log('success... but not data.success.');
          console.log(data.message);
        }
      }

    }); //end of AJAX call
  }); //end of $('#passwordresetform').submit()

}); //end of $(document).ready()