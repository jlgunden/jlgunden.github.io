
/**
 * api function to easily construct ajax requests
 * 
 * @param  {string} module
 * @param  {string} method
 * @param  {object} arguments
 * @param  {Function} callback
 * @param  {Function} error_callback
 * @return {void}
 */
var api = function(module, method, arguments, callback, error_callback) {
  
  var data = {
    'module': module,
    'method': method,
    'arguments': arguments
  }

  $.ajax({
    'type': 'POST',
    'url': 'http://jacobgunden.site40.net/',
    'data': JSON.stringify(data),
    'success': function(response) {
      callback && callback(response);
    },
    'error': function(response) {
      error_callback && error_callback(response);
    }
  });

};
