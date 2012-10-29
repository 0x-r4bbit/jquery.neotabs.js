;(function ( $, window, undefined ) {

  var pluginName = 'neoTabs',
      document = window.document,
      defaults = {
        wrapperClass: 'content',
        activeClass: 'active',
        tabheadElement: 'h4',
        tabheadClass: '.tab',
        tabbody: '.tabbody',
        fx: 'show',
        fxSpeed: 'normal',
        activeInfoText: '',
        activeInfoPosition: 'prepend',
        activeInfoClass: 'active-info',
        tabsListClass: 'tabs-list',
        syncheights:false,
        syncHeightMethodName:'syncHeight',
        cssClassAvailable:false,
        saveState: false,
        autoAnchor: false,
        pagination: false,
        tabsPostion: 'top',
        wrapInnerTabs: '',
        firstTabClass: 'first',
        lastTabClass: 'last',
        clearfixClass: 'group'
      };

  function uniqueId (p, q, r) {
    r = (r === undefined) ? '' : '-'+r;
    return p + q + r;
  }

  function NeoTabs( element, options ) {
    this.element = element;
    this.options = $.extend( {}, defaults, options) ;
    this._defaults = defaults;
    this._name = pluginName;
    this.list = '';
    this.tabCound = 0;
    this.$el = $(this.element);


    this.$el.wrapInner('<div class="' + this.options.wrapperClass + '"></div>');

    this.$el.find(this.options.tabheadElement).each(function (i) {
      var id = '',
          elId = $(this).attr('id');

      if (elId) {
        if (elId.indexOf('accessibletabscontent') === 0) {
          return;
        }
        id = 'id="' + elId + '"';
      }
      var tabId = uniqueId('accessibletabscontent',
    });


    this.init();
  }

  NeoTabs.prototype.init = function () {

  };

  $.fn[pluginName] = function ( options ) {
    return this.each(function () {
      if (!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName, new NeoTabs( this, options ));
      }
    });
  }

}(jQuery, window));
