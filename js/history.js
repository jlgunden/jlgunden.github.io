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

    // Todo: this works for now but isn't practical if I expand the site
    if (url === 'contact' && default_state !== 'contact') {
      var inputs = {
        'email_address': {
          'input_element': $('#email_address'),
          'error_message_element': $('#email_address_error'),
          'name': 'Email address',
          'type': 'email',
          'required': true
        },
        'name_first': {
          'input_element': $('#name_first'),
          'error_message_element': $('#email_address_error'),
          'name': 'First name',
          'type': 'string',
          'required': false
        },
        'name_last': {
          'input_element': $('#name_last'),
          'error_message_element': $('#name_last_error'),
          'name': 'Last name',
          'type': 'string',
          'required': false
        },
        'message': {
          'input_element': $('#message'),
          'error_message_element': $('#message_error'),
          'name': 'Message',
          'type': 'string',
          'required': false
        }
      };
      var form = new form_controller(inputs, $('#email_submit'), $('#form_inputs'));
    }
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