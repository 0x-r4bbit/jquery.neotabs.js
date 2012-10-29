;(function ( $, window, undefined ) {

  var pluginName = 'neoTabs',
      document = window.document,
      defaults = {
        wrapperClass: 'content',
        activeClass: 'active',
        tabheadElement: 'h4',
        tabheadClass: '.tab',
        fx: 'show',
        fxSpeed: 'normal',
        activeInfoText: '',
        activeInfoPosition: 'prepend',
        activeInfoClass: 'active-info',
        tabsListClass: 'tabs-list',
        pagination: false,
        tabsPostion: 'top',
        firstTabClass: 'first',
        lastTabClass: 'last',
        clearfixClass: 'group'
      };

  function NeoTabs( element, options ) {
    this.element = element;

    this.options = $.extend( {}, defaults, options) ;

    this._defaults = defaults;
    this._name = pluginName;

    this.init();
  }

  NeoTabs.prototype.init = function () {

  };

  $.fn[pluginName] = function ( options ) {
    return this.each(function () {
      if (!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName, new Neotabs( this, options ));
      }
    });
  }

}(jQuery, window));
