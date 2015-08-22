var change_state = function(e) {
  var url = $(e.target).attr('href');

  $('#layer').load(url + ' #layer > *', function() {

    // update desktop navigation title classes
    $('.navigation_title.active').removeClass('active');
    var children = $('.nav_desktop').children();
    for (var i = 0; i < children.length; i++) {
      var data = $(children[i]).data();
      if (data.path === url) {
        $(children[i]).addClass('active');
        break;
      }
    }

    if (url !== window.location.pathname) {
      history.pushState(url, null, url);
      var title = (url === '/' || url === "") ? 'Jacob Gunden' : 'Jacob Gunden | ' + url;
      document.title = title;
    }
    window.scrollTo(0, 0);
  });
}

var default_state = window.location.pathname;
var default_title = document.title;
window.addEventListener('popstate', function(e) {
  var state = e.state;

  if (state !== null) {
    $('#layer').load(state + ' #layer > *', function() {
      var title = (state === '/' || state === "") ? 'Jacob Gunden' : 'Jacob Gunden | ' + state;
      document.title = title;
    });
  }
  else {
    $('#layer').load(default_state + ' #layer > *', function() {
      document.title = default_title;
    });
  }

  // update title active class
  $('.navigation_title.active').removeClass('active');
  var children = $('.nav_desktop').children();
  for (var i = 0; i < children.length; i++) {
    var data = $(children[i]).data();
    if (state === null) {
      if (data.path === default_state) {
        $(children[i]).addClass('active');
        break;
      }
    }
    else {
      if (data.path === state) {
        $(children[i]).addClass('active');
        break;
      }
    }
  }
});