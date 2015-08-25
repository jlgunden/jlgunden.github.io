
/**
 * Object that holds functions necessary for initializing each page on the site
 *
 * @type {Object}
 */
var initializer = {};

/**
 * [init description]
 * @param  {[type]} page [description]
 * @return {[type]}      [description]
 */
initializer.init = function(page) {
  var navigation_drawer = new nav_drawer($('#menu'));
  navigation_drawer.decorate();

  // change state for desktop
  $('.nav_desktop').click(function(e) {
    if (e.target !== e.currentTarget) {
      e.preventDefault();

      var href = $(e.target).attr('href');
      // old
      // change_state(e);
      // new
      history_manager.load_page(href);
    }
    e.stopPropagation();
  });

  if (typeof(initializer[page]) === 'function') {
    initializer[page]();
  }

};

/**
 * contact page
 *
 * @return {void}
 */
initializer.contact = function() {
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
};

initializer.index = function() {
  var email = 'moc.liamg@nednuglj:otliam'.split('').reverse().join('');
  $('#mailto').attr('href', email);
};
initializer.projects = function() {};
