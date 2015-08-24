
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
      'link': '/'
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
 * @return {void}        [description]
 */
nav_drawer.prototype.decorate = function()  {
  var self = this;

  this.drawer_ = $(document.createElement('div'))
    .addClass('nav_drawer');

  var ul = $(document.createElement('ul'));

  for (var i = 0; i < this.items_order_.length; i++) {
    ul.append(
      $(document.createElement('li'))
        .addClass('nav_drawer_item')
        .html(
          '<a href="' + this.items_[this.items_order_[i]].link + '">' +
          this.items_[this.items_order_[i]].name + '</a>'
        )
    );
  }

  this.drawer_.append(ul);

  this.mask_ = $(document.createElement('div'))
    .addClass('mask')
    .click(function() {
      self.toggle_open_();
    });

  this.menu_.click(function() {
    self.toggle_open_();
  });

  // AJAX page loading
  ul.click(function(e) {
    if (e.target !== e.currentTarget) {
      e.preventDefault();
      var href = $(e.target).attr('href');
      // old
      // change_state(e);
      // new
      history_manager.load_page(href);
      self.toggle_open_();
    }
    e.stopPropagation();
  });

  $(document.body).append(this.drawer_);
  $(document.body).append(this.mask_);
};

/**
 * [toggle_open_ description]
 * @private
 * @return {void} [description]
 */
nav_drawer.prototype.toggle_open_ = function() {
  this.drawer_.toggleClass('open');
  this.mask_.toggleClass('open');
  this.menu_.toggleClass('close');
  $(document.body).toggleClass('disable_scroll');
};

