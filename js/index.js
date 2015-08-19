
$(document).ready(function() {
  $(document.body).fadeIn(1500);
  var navigation_drawer = new nav_drawer();
  navigation_drawer.decorate($('#sliding_menu'));
  
  $('#menu').click(function() {
    navigation_drawer.trigger_show();
  })

  // api('email', 'send_email', {'email_address': 'foobar@someone.com'}, function(response) {
  //   console.log(response);
  // });
});