
/**
 * [nav_drawer description]
 * @constructor
 * @param {JQuery} menu The menu icon element
 * @return {void}
 */
var nav_drawer = function(menu) {
  this.menu_ = menu;
  this.items_order_ = ['Home', 'Projects', 'Resume', 'Contact'];
  this.items_ = {
    'Home': {
      'name': 'Home',
      'link': 'index'
    },
    'Projects': {
      'name': 'Projects',
      'link': 'projects'
    },
    'Resume': {
      'name': 'Resume',
      'link': 'resume'
    },
    'Contact': {
      'name': 'Contact',
      'link': 'contact'
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

  this.drawer_ = $(document.createElement('div'))
    .addClass('nav_drawer');

  var ul = $(document.createElement('ul'));

  for (var i = 0; i < this.items_order_.length; i++) {
    this.drawer_.append(
      $(document.createElement('li'))
        .addClass('nav_drawer_item')
        // ehh, there is probably a better way to do this
        .html(
          '<a href="' + this.items_[this.items_order_[i]].link + '">' +
          this.items_[this.items_order_[i]].name + '</a>'
        )
    );
  }

  this.mask_ = $(document.createElement('div'))
    .addClass('mask')
    .click(function() {
      self.toggle_open();
    });

  this.menu_.click(function() {
    self.toggle_open();
  });

  $(document.body).append(this.drawer_);
  $(document.body).append(this.mask_);
};

/**
 * [toggle_open description]
 * @return {void} [description]
 */
nav_drawer.prototype.toggle_open = function() {
  this.drawer_.toggleClass('open');
  this.mask_.toggleClass('open');
  this.menu_.toggleClass('close');
  $(document.body).toggleClass('disable_scroll');
};
