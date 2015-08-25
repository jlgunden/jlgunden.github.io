
var history_manager = {};

// If sessionStorage is populated, use those values
window.onload = function() {
  if (sessionStorage.getItem('previous_default_state') !== null) {
    var prev_default_state = sessionStorage.getItem('previous_default_state');
    var prev_title = sessionStorage.getItem('previous_title');
    history_manager.default_state = prev_default_state;
    history_manager.default_title = prev_title;
  }
  else {
    history_manager.default_state = document.location.pathname;
    history_manager.default_title = document.title;
  }
}

// Store the default state in sessionStorage in order to handle page refreshes
window.onbeforeunload = function() {
  sessionStorage.setItem('previous_default_state', history_manager.default_state);
  sessionStorage.setItem('previous_title', history_manager.default_title);
}

history_manager.load_page = function(href, opt_update_history) {
  if (typeof(opt_update_history) === 'undefined') {
    opt_update_history = true;
  }

  $('#layer').load(href + ' #layer > *', history_manager.load_handler.bind(this, href, opt_update_history));
};

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

  // push to history if it's actually a new page
  if (
      opt_update_history &&
      href !== window.location.pathname
    ) {
    history.pushState(href, null, href);
  }

  var title = (href === '/') ? 'Jacob Gunden' : 'Jacob Gunden | ' + href;
  document.title = title;

  // call the page's init function if the new state is not the default state
  if (href !== history_manager.default_state) {
    var init_method = (href === '/') ? 'index' : href;
    if (typeof(initializer[init_method]) === 'function') {
      initializer[init_method]();
    }
  }

  // scroll to top
  window.scrollTo(0, 0);
};

window.addEventListener('popstate', function(e) {
  var state = e.state;

  if (state !== null) {
    history_manager.load_page(state, false);
  }
  else {
    history_manager.load_page(history_manager.default_state, false);
  }

  // update title active class
  $('.navigation_title.active').removeClass('active');
  var children = $('.nav_desktop').children();
  for (var i = 0; i < children.length; i++) {
    var data = $(children[i]).data();
    if (state === null) {
      if (data.path === history_manager.default_state) {
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





// var change_state = function(e) {
//   var url = $(e.target).attr('href');

//   $('#layer').load(url + ' #layer > *', function() {

//     // update desktop navigation title classes
//     $('.navigation_title.active').removeClass('active');
//     var children = $('.nav_desktop').children();
//     for (var i = 0; i < children.length; i++) {
//       var data = $(children[i]).data();
//       if (data.path === url) {
//         $(children[i]).addClass('active');
//         break;
//       }
//     }

//     if (url !== window.location.pathname) {
//       history.pushState(url, null, url);
//       var title = (url === '/') ? 'Jacob Gunden' : 'Jacob Gunden | ' + url;
//       document.title = title;
//     }

//     window.scrollTo(0, 0);

//     // call page's init function
//     if (url !== default_state) {
//       var init_method = (url === '/') ? 'index': url;
//       if (typeof(initializer[init_method]) === 'function') {
//         initializer[init_method]();
//       }
//     }
//   });
// };

// var default_state = window.location.pathname;
// var default_title = document.title;
// window.addEventListener('popstate', function(e) {
//   var state = e.state;

//   if (state !== null) {
//     $('#layer').load(state + ' #layer > *', function() {
//       var title = (state === '/' || state === "") ? 'Jacob Gunden' : 'Jacob Gunden | ' + state;
//       document.title = title;
//     });
//   }
//   else {
//     $('#layer').load(default_state + ' #layer > *', function() {
//       document.title = default_title;
//     });
//   }

//   // update title active class
//   $('.navigation_title.active').removeClass('active');
//   var children = $('.nav_desktop').children();
//   for (var i = 0; i < children.length; i++) {
//     var data = $(children[i]).data();
//     if (state === null) {
//       if (data.path === default_state) {
//         $(children[i]).addClass('active');
//         break;
//       }
//     }
//     else {
//       if (data.path === state) {
//         $(children[i]).addClass('active');
//         break;
//       }
//     }
//   }
// });
