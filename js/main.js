$(document).ready(function() {

  var $window = $(window);
  var $form = $('form');
  var $emailInput = $('#mce-EMAIL');

  var particlePath = $window.width() >= 1024 ? '/assets/particles.json' : '/assets/particles-mobile.json';
  particlesJS.load('particles-js', particlePath);

  if ($window.width() >= 1024) {
    $emailInput.focus();
  }

  $emailInput.click(function() {
    $(this).attr('placeholder', '');
  });

  $emailInput.blur(function() {
    $(this).attr('placeholder', 'Get notified');
    if ($window.width() >= 1024) {
      $emailInput.focus();
    }
  });

  $emailInput.keypress(function(event) {
    if (event.keyCode == 13) {
      var email = $form.find('input[name="EMAIL"]').val();
      if ( validate(email) ) {
        register($form);
      } else {
        $('.msg').html('Please enter a valid email');
      }
    }
  });

  function validate(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  function register($form) {
    $.ajax({
      type: $form.attr('method'),
      url: $form.attr('action'),
      data: $form.serialize(),
      cache: false,
      dataType: 'json',
      contentType: "application/json; charset=utf-8",
      error: function (err) { console.warn("Could not connect to the registration server. Please try again later."); },
      success: function (data) {
        if (data.result != "success") {
          $('.msg').html(data.msg);
        } else {
          $('.msg').html('Thank you for signing up!');
        }
      }
    });
  }
});
