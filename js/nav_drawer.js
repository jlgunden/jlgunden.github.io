
/**
 * [nav_drawer description]
 * @constructor
 * @return {void}
 */
var nav_drawer = function() {
  this.items = ['Home', 'About', 'Resume', 'Contact'];
};

/**
 * [decorate description]
 * @param  {[type]} parent [description]
 * @return {void}        [description]
 */
nav_drawer.prototype.decorate = function(parent)  {
  var self = this;

  this.menu = $(document.createElement('div'))
    .addClass('nav_drawer');

  for (var i = 0; i < this.items.length; i++) {
    this.menu.append(
      $(document.createElement('div'))
        .addClass('nav_drawer_item')
        .html('<a href="'+this.items[i]+'.html">'+this.items[i]+'</a>')
      );
  }

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
