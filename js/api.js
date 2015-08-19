
/**
 * api function to easily construct ajax requests
 * 
 * @param  {string} module
 * @param  {string} method
 * @param  {object} arguments
 * @param  {Function} handler
 * @param  {Function} error_handler
 * @return {void}
 */
var api = function(module, method, arguments, handler, error_handler) {
  
  var data = {
    'module': module,
    'method': method,
    'arguments': arguments
  }

  $.ajax({
    'type': 'POST',
    'url': 'http://jacobgunden.site40.net/',
    'data': data,
    'success': function(response) {
      handler && handler(response);
    },
    'error': function(response) {
      error_handler && error_handler(response);
    }
  });

};
