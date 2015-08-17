
$(document).ready(function() {
  $(document.body).fadeIn(1500);
  var mobile_menu = new slide_out();
  mobile_menu.decorate($('#sliding_menu'));
  
  $('#menu').click(function() {
    mobile_menu.trigger_show();
  })
});