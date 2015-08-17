
/**
 * [slide_out description]
 * @constructor
 * @return {void}
 */
var slide_out = function() {};

/**
 * [decorate description]
 * @param  {[type]} parent [description]
 * @return {void}        [description]
 */
slide_out.prototype.decorate = function(parent)  {
  var self = this;

  this.menu = $(document.createElement('div'))
    .addClass('sliding_menu');

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
slide_out.prototype.trigger_show = function() {
  var self = this;
  this.menu.toggleClass('active_menu');
  this.mask.toggleClass('active_mask');
  $('#menu').toggleClass('close');

  // this.show_menu = this.show_menu ? false : true;

  // if (this.show_menu) {
  //   this.menu.addClass('active_menu');
  //   this.mask.addClass('active_mask');
  // }
  // else {
  //   this.menu.removeClass('active_menu');
  //   this.mask.removeClass('active_mask');
  // }
};
