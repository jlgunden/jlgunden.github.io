
/**
 * [nav_drawer description]
 * @constructor
 * @return {void}
 */
var nav_drawer = function() {
  this.items_order = ['Home', 'About', 'Resume', 'Contact'];
  this.items = {
    'Home': {
      'name': 'Home',
      'link': 'index.html'
    },
    'About': {
      'name': 'About',
      'link': 'about.html'
    },
    'Resume': {
      'name': 'Resume',
      'link': 'resume.html'
    },
    'Contact': {
      'name': 'Contact',
      'link': 'contact.html'
    }
  };
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

  var ul = $(document.createElement('ul'));

  for (var i = 0; i < this.items_order.length; i++) {
    this.menu.append(
      $(document.createElement('li'))
        .addClass('nav_drawer_item')
        // ehh, there is probably a better way to do this
        .html(
          '<a href="' + this.items[this.items_order[i]].link + '">' +
          this.items[this.items_order[i]].name + '</a>'
        )
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
