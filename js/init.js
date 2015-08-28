
/**
 * Object that holds functions necessary for initializing each page on the site
 *
 * @type {Object}
 */
var initializer = {};

/**
 * Main init method. Contains code needed for every page and calls
 * a specific page's initializer method
 *
 * @param  {string} page The page to initialize
 * @return {void}
 */
initializer.init = function(page) {
  var navigation_drawer = new nav_drawer($('#menu'));
  navigation_drawer.decorate();

  // change state for desktop
  $('.nav_desktop').click(function(e) {
    if (e.target !== e.currentTarget) {
      // not a fan of this but it works for now
      if ($(e.target).parent().data().path !== 'resume') {
        e.preventDefault();

        var href = $(e.target).attr('href');
        history_manager.load_page(href);
      }
    }
    e.stopPropagation();
  });

  if (typeof(initializer[page]) === 'function') {
    initializer[page]();
  }

};

/**
 * Contact page method
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

/**
 * Index page method
 *
 * @return {void}
 */
initializer.index = function() {
  // prevents email from being spammed
  var email = 'moc.liamg@nednuglj:otliam'.split('').reverse().join('');
  $('#mailto').attr('href', email);
};

/**
 * Projects page method
 *
 * @return {void}
 */
initializer.projects = function() {};
