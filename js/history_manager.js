
/**
 * Object responsible for handling things related to the History API
 *
 * @type {Object}
 */
var history_manager = {};

/** Replace the null state with the current pathname */
if (document.location.pathname === '/') {
  state = document.location.pathname;
}
else {
  state = document.location.pathname.replace('/', '');
}
history.replaceState(state, null, state);

/**
 * Load the requested page and add it to the layer div
 *
 * @param  {string} href The href of the page to load
 * @return {void}
 */
history_manager.load_page = function(href, opt_update_history) {
  if (typeof(opt_update_history) === 'undefined') {
    opt_update_history = true;
  }

  $('#layer').load(href + ' #layer > *', history_manager.load_handler.bind(this, href, opt_update_history));
};

/**
 * Handler for jQuery.load()
 *
 * @param  {string} href The href of the page to load
 * @return {void}
 */
history_manager.load_handler = function(href, opt_update_history) {
  // update navigation title's classes
  $('.navigation_title.active').removeClass('active');
  var children = $('.nav_desktop').children();
  for (var i = 0; i < children.length; i++) {
    var data = $(children[i]).data();
    if (data.path === href) {
      $(children[i]).addClass('active');
      break;
    }
  }

  // push state
  if (opt_update_history) {
    history.pushState(href, null, href);
  }

  var title = (href === '/' || null) ? 'Jacob Gunden' : 'Jacob Gunden | ' + href;
  document.title = title;

  // call the page's init function if it exists as a function
  var init_method = (href === '/' || null) ? 'index' : href;
  if (typeof(initializer[init_method]) === 'function') {
    initializer[init_method]();
  }

  // scroll to top
  window.scrollTo(0, 0);
};

window.addEventListener('popstate', function(e) {
  var state = e.state;

  history_manager.load_page(state, false);

  // update title active class
  $('.navigation_title.active').removeClass('active');
  var children = $('.nav_desktop').children();
  for (var i = 0; i < children.length; i++) {
    var data = $(children[i]).data();

    if (data.path === state) {
      $(children[i]).addClass('active');
      break;
    }
  }
});
