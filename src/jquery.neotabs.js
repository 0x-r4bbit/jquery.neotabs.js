;(function ($, window, undefined) {
  
  var pluginName = 'neoTabs',
      document = window.document,

      defaults = {
        wrapperClass: 'content',
        activeClass: 'active',
        tabHeadClass: 'tabhead',
        tabBodyClass: 'tabbody',
        firstTabClass: 'first',
        lastTabClass: 'last',
        clearfixClass: 'group',
        tabsListClass: 'tabs-list',
        tabHeadElement: 'h4',
        tabsPosition: 'top',
        cssClassAvailable: true,
        fx: 'show',
        fxSpeed: 0,
        autoAnchor: true,
        wrapInnerTabs: '',
        dropdownTabLabel: '&#x25BE;',
        dropdownTabClass: 'dropdown',
        dropdownTabsListClass: 'tabs-list',
        dropdownTabsClearfixClass: 'group'
      },

      keyCodes {
        37: -1,
        38: -1,
        39: +1,
        40: +1
      };

  function NeoTabs(element, options) {
    var _this = this;

    $.extend(_this, {
      $element ; element,
      options: $.extend({}, defaults, options),
      keyCodes: keyCodes
    });
  }

}(jQuery, window));








/**
 * NeoTabs - jQuery plugin
 *
 * source: http://github.com/PascalPrecht/jquery.neotabs.js/
 * site: http://pascalprecht.github.com/jquery.neotabs.js/
 *
 * @author: Pascal Precht <pascal.precht@gmail.com>
 * Released under the MIT and GPL Licenses.
 */
;(function ($, window, undefined) {

  var pluginName = 'neoTabs',
      document = window.document,

      defaults = {
        wrapperClass: 'content',
        activeClass: 'active',
        tabHeadClass: 'tabhead',
        tabBodyClass: 'tabbody',
        firstTabClass: 'first',
        lastTabClass: 'last',
        clearfixClass: 'group',
        tabsListClass: 'tabs-list',
        tabHeadElement: 'h4',
        tabsPosition: 'top',
        cssClassAvailable: true,
        fx: 'show',
        fxSpeed: 0,
        autoAnchor: true,
        wrapInnerTabs: '',
        dropdownTabLabel: '&#x25BE;',
        dropdownTabClass: 'dropdown',
        dropdownTabsListClass: 'tabs-list',
        dropdownTabsClearfixClass: 'group'
      },

      tabCount = 0,
      keyCodes = {
        37: -1,
        38: -1,
        39: +1,
        40: +1
      },
      positions = {
        top: 'prepend',
        bottom: 'append'
      };

  if ($('body').data('accessibleTabsCount') !== undefined) {
    tabCount = $('body').data('accessibleTabsCount');
  }

  $('body').data('accessibleTabsCount', tabCount);

  function NeoTabs(element, options) {
    var _this = this,
        dropdownTabs = null,
        hasDropdown = false,
        preActive = false,
        count = 0;

    $.extend(_this, {
      $el: element,
      options: $.extend({}, defaults, options)
    });

    var tabs = new TabList({
          clearfixClass: _this.options.clearfixClass,
          tabsListClass: _this.options.tabsListClass
        });

    _this.$el.wrapInner('<div class="'+_this.options.wrapperClass+'"></div>');

    _this.$el.find(_this.options.tabHeadElement).each(function (i) {

      var $tabHeadElement = $(this);

      if (!hasDropdown && typeof($tabHeadElement.data('neotabs-dropdown')) !== 'undefined') {
        hasDropdown = true;
        dropdownTabs = new TabList({
          clearfixClass: _this.options.dropdownTabsClearfixClass,
          tabsListClass: _this.options.dropdownTabsListClass
        });
      }

      if (!preActive && typeof($tabHeadElement.data('neotabs-active')) !== 'undefined') {
        $tabHeadElement.addClass(_this.options.activeClass);
        preActive = true;
      }

      var tab = new Tab({
        label:  $tabHeadElement.html(),
        id: 'accessibletabscontent' + tabCount + '-' + i,
        tabList: null,
        cssClass: (_this.options.cssClassAvailable) ?
          (($tabHeadElement.attr('class') || '') + ' ' + _this.options.tabHeadClass):
          _this.options.tabHeadClass
      });

      if (hasDropdown) {
        dropdownTabs.addTab(tab);
      } else {
        tabs.addTab(tab);
      }

      $tabHeadElement.attr({
        'id': tab.id,
        'class': _this.options.tabheadClass,
        'tabindex': '-1'
      });

      count = i;
    });

    if (hasDropdown) {
      tabs.addTab(new Tab({
        label: _this.options.dropdownTabLabel,
        id: '',
        tabList: dropdownTabs,
        cssClass: _this.options.tabHeadClass + ' ' + _this.options.dropdownTabClass
      }));
    }

    if (!_this.$el.find('.' + _this.options.tabsListClass).length) {
      _this.$el[positions[_this.options.tabsPosition]](tabs.toHtml());
    }

    var $content = _this.$el.find('.' + _this.options.tabBodyClass),
        $tabsList = _this.$el.find('.' + _this.options.tabsListClass);

    if ($content.length > 0) {
      $content.hide();
      $($content[0]).show();
    }

    $tabsList.find(' > li:first')
      .addClass(_this.options.firstTabClass + ((!preActive) ? ' ' + _this.options.activeClass : ''))
      .closest('ul').find('> li:last').addClass(_this.options.lastTabClass);

    if (_this.options.wrapInnerTabs) {
      $tabsList.find('> li > a').wrapInner(_this.options.wrapInnerTabs);
    }

    $tabsList.find('> li a').each(function (i) {
      var $tab = $(this);

      $tab.on('click', function (e) {
        e.preventDefault();

        $tabsList
          .find('>li.' + _this.options.activeClass)
          .removeClass(_this.options.activeClass);

        $(this).parent().addClass(_this.options.activeClass);
        if (!$(this).parent().hasClass(_this.options.dropdownTabClass)) {
          _this.$el.find('.' + _this.options.tabBodyClass + ':visible').hide();

          var j = i;

          if ($(this).closest('.' + _this.options.dropdownTabClass).length) {
            j = i-1;
          }

          _this.$el.find('.' + _this.options.tabBodyClass).eq(j)[_this.options.fx](_this.options.fxSpeed);
        }
      });
 
      $tab.focus(function (e) {
        $(document).keyup(function (e) {
          if (keyCodes[e.keyCode]) {
            console.log(e.keyCode);
          }
        });
      });
    });

    if (_this.options.autoAnchor && window.location.hash) {
      var $anchorTab = $('.' + _this.options.tabsListClass).find(window.location.hash);
      if ($anchorTab.size()) {
        $anchorTab.click();
      }
    }

    if (preActive) {
      $('.' + _this.options.tabsListClass + ' .' + _this.options.activeClass + ' a').click();
    }

    tabCount++;
  }

  function Tab(options) {
    this.label = options.label;
    this.id = options.id;
    this.tabList = options.tabList;
    this.cssClass = options.cssClass;
  }

  Tab.prototype.toHtml = function () {
    var html = '<li class="' + this.cssClass + '"><a href="#' + this.id + '" id="' + this.id + '">' + this.label + '</a>';


    if (this.tabList) {
      html += this.tabList.toHtml();
    }

    html += '</li>';
    return html;
  };

  function TabList(options) {
    this.clearfixClass = options.clearfixClass;
    this.tabsListClass = options.tabsListClass;
    this.tabs = [];
  }

  TabList.prototype.addTab = function (tab) {
    this.tabs.push(tab);
  };

  TabList.prototype.toHtml = function () {
    var len = this.tabs.length,
        i = 0,
        html = '<ul class="' + this.clearfixClass + ' ' + this.tabsListClass + '">';

    for (; i < len; i++) {
      html += this.tabs[i].toHtml();
    }

    return html;
  };

  $.fn[pluginName] = function (options) {
    return this.each(function () {
      if (!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName, new NeoTabs($(this), options ));
      }
    });
  };
}(jQuery, window));
