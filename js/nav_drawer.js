
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
        // ehh, there is probably a better way to do this
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

  ul.click(function(e) {
    if (e.target !== e.currentTarget) {
      e.preventDefault();
      var url = $(e.target).attr('href');
      $('#layer').load(url + ' #layer > *', function() {
        // $('.navigation_title .active').removeClass('active');
        // $('.navigation_title').addClass('active');
        history.pushState(null, null, url);
        document.title('Jacob Gunden | ' + url);
        self.toggle_open_();
      });
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

nav_drawer.prototype.dispose_ = function() {

}
