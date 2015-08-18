
/**
 * [nav_drawer description]
 * @constructor
 * @return {void}
 */
var nav_drawer = function() {};

/**
 * [decorate description]
 * @param  {[type]} parent [description]
 * @return {void}        [description]
 */
nav_drawer.prototype.decorate = function(parent)  {
  var self = this;

  this.menu = $(document.createElement('div'))
    .addClass('nav_drawer');

  var menu_top = $(document.createElement('div'))
    .css({'height': '70px', 'background-color': '#fff', 'width': '100%', 'text-align': 'center', 'line-height': '4'})
    .html('MENU');
  this.menu.append(menu_top);

  this.mask = $(document.createElement('div'))
    .addClass('mask')
    .click(function() {
      self.trigger_show();
    });
  $(document.body).append(this.menu);
  $(document.body).append(this.mask);
};

/**
 * [trigger_show description]
 * @return {void} [description]
 */
nav_drawer.prototype.trigger_show = function() {
  var self = this;
  this.menu.toggleClass('active_menu');
  this.mask.toggleClass('active_mask');
  $('#menu').toggleClass('close');
  $(document.body).toggleClass('disable_scroll');
};
