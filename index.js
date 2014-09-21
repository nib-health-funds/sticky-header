var offset = require('offset');
var debounce = require('debounce');

/**
 * Get the top coordinate
 * @returns   {Number}
 */
function getScrollTop() {
  return (window.pageYOffset || document.documentElement.scrollTop)  - (document.documentElement.clientTop || 0);
}

/**
 * A sticky nav helper
 * @param   {HTMLElement} el
 * @constructor
 */
function StickyNav(el) {

  if (!(this instanceof StickyNav)) {
    return new StickyNav(el);
  }

  this.el         = el;
  this.staticTop  = offset(this.el).top;

  //listen for scroll and resize events which may cause the position of the
  var position = debounce(this.position.bind(this), 100);
  window.addEventListener('scroll', position);
  //window.addEventListener('resize', position);

  //initialise the position because not all browsers fire `scroll` on page load if the user is scrolled
  this.position();

}

/**
 * Get whether the nav is fixed
 * @returns   {Boolean}
 */
StickyNav.prototype.isFixed = function() {
  return this.el.classList.contains('is-fixed');
};

/**
 * Set whether the nav is fixed
 * @param   {Boolean} fixed
 * @returns {StickyNav}
 */
StickyNav.prototype.setFixed = function(fixed) {

  if (fixed) {

    //add the sticky class
    this.el.classList.remove('is-static');
    this.el.classList.add('is-fixed');

  } else {

    //remove the sticky class
    this.el.classList.remove('is-fixed');
    this.el.classList.add('is-static');

  }

  return this;
};

/**
 * Position the nav according to the scroll position
 * @returns {StickyNav}
 */
StickyNav.prototype.position = function() {
  this.setFixed(getScrollTop() > this.staticTop);
  return this;
};


module.exports = StickyNav;