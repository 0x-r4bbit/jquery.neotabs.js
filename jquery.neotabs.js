;(function ( $, window, undefined ) {

  var pluginName = 'neoTabs',
      document = window.document,

      // Default options
      defaults = {
        wrapperClass: 'content', // Classname to apply to the div that wraps
        activeClass: 'active', // Active tab classname
        tabheadElement: 'h4', // Elements to transform to tabs
        tabheadClass: '.tab', // Tab classname
        tabbody: '.tabbody', // Tabbody classname
        fx: 'show', // Default effect for collapsing content
        fxSpeed: 'normal', // Effect speed
        tabsListClass: 'tabs-list', // Classname to apply to generated tabs list
        cssClassAvailable:false, // Applying original class names to tabs or not
        autoAnchor: false, // Making tabs linkable
        tabsPostion: 'top', // Position of tabs 'top' or 'bottom'
        wrapInnerTabs: '', // InnerWrap for tabs
        firstTabClass: 'first', // Classname for the first tab
        lastTabClass: 'last', // Classname for the last tab
        clearfixClass: 'group', // Name of the class that is used to clear floats
      };

  // Constructor
  function NeoTabs(element, options) {
    _this = this;

    $.extend(_this, {
      $el: element,
      options: $.extend({}, defaults, options)
    });

    // This represents our tab list
    var tabs = new TabList();

    _this.$el.find(_this.options.tabheadElement).each(function (i) {
      // Let's cache this query
      var $currentEl = $(this);

      // And create a new tab object from it
      var tab = new Tab({
        label: $currentEl.html(),
        id: $currentEl.attr('id')
      });

      // Allright, we're done!
      tabs.addTab(tab);
    });

  };

  function Tab(options) {
    this.id = options.id;
    this.label = options.label;

    if (this.id) {

    }
  };

  function TabList() {
    this.tabs = [];
  };

  TabList.prototype.addTab = function (tab) {
    this.tabs.push(tab);
  };

  $.fn[pluginName] = function ( options ) {
    return this.each(function () {
      if (!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName, new NeoTabs($(this), options ));
      }
    });
  }
}(jQuery, window));
