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
        dropdownTabActiveClass: 'hidden-active',
        dropdownTabsListClass: 'tabs-list',
        dropdownTabsClearfixClass: 'group'
      },
      tabsCount = 0,
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

  var generateId = function (name, tabsCount, tabCount) {
    var id = name + tabsCount;

    if (tabCount !== undefined) {
      id += '-' + tabCount;
    }
    return id;
  };
  // Helper function to check exclusively for an HTML5 data-attribute. Thanks to
  // @cburgdorf for typing down this gist for me: (https://gist.github.com/3979912)
  $.fn.hasDataAttr = function (attr) {
    var value = this.attr('data-' + attr);
    return typeof value !== 'undefined' && value !== false;
  };

  if ($('body').data('accessibleTabsCount') !== undefined) {
    tabsCount = $('body').data('accessibleTabsCount');
  }

  $('body').data('accessibleTabsCount', tabsCount);

  function NeoTabs(element, options) {
    var _this = this;

    $.extend(_this, {
      $el: element,
      opts: $.extend({}, defaults, options),
      hasDropdown: false,
      hasPreActiveTab: false,
      preActiveId: '',
      tabsList: null,
      dropdownTabsList: null,
      currentTabsCount: tabsCount
    });

    _this.tabsList = new TabsList({
      clearfixClass: _this.opts.clearfixClass,
      tabsListClass: _this.opts.tabsListClass
    });

    _this.$el.wrapInner('<div class="' + _this.opts.wrapperClass + '"></div>');

    _this.$el.find(_this.opts.tabHeadElement).each(function (i) {

      var $tabHeadElement = $(this);

      // Does our markup want us to make a dropdown?
      if (!_this.hasDropdown && $tabHeadElement.hasDataAttr('neotabs-dropdown')) {
        _this.dropdownTabsList = new TabsList({
          clearfixClass: _this.opts.dropdownTabsClearfixClass,
          tabsListClass: _this.opts.dropdownTabsListClass
        });
        _this.hasDropdown = true;
      }

      // Is there a pre-active tab?
      if (!_this.hasPreActiveTab && $tabHeadElement.hasDataAttr('neotabs-active')) {
        $tabHeadElement.addClass(_this.opts.activeClass);
        _this.hasPreActiveTab = true;
      }

      // Build a new tab with all the options
      var tab = new Tab({
        label: $tabHeadElement.html(),
        id: generateId('accessibletabscontent', tabsCount, i),
        navigationId: generateId('accessibletabsnavigation', tabsCount, i),
        tabsList: null,
        cssClass: (_this.opts.cssClassAvailable) ?
          (($tabHeadElement.attr('class') || '') + ' ' + _this.opts.tabHeadClass) :
          _this.opts.tabHeadClass
      });
      // If we have a dropdown, add the tab to the dropdown list instead to the tabslist
      if (_this.hasDropdown) {
        _this.dropdownTabsList.addTab(tab);
      } else {
        _this.tabsList.addTab(tab);
      }

      if (_this.hasPreActiveTab && _this.preActiveId === '') {
        _this.preActiveId = tab.id;
      }

      // Add an equivalent id to equivalent tabbody
      $tabHeadElement
        .parent('.' + _this.opts.tabBodyClass)
        .attr('id', generateId('accessibletabscontentbody', tabsCount, i));

      // Give the tabhead the following attributes
      $tabHeadElement.attr({
        'id': tab.id,
        'class': _this.opts.tabHeadClass,
        'tab-index': '-1'
      });
    });
 
    // Generate dropdown tab if hasDropdown flag is true
    if (_this.hasDropdown) {
      _this.tabsList.addTab(new Tab({
        label: _this.opts.dropdownTabLabel,
        id: generateId('accessibletabsdropdown', tabsCount),
        navigationId: '',
        tabsList: _this.dropdownTabsList,
        cssClass: _this.opts.tabHeadClass + ' ' + _this.opts.dropdownTabClass
      }));
    }

    // [append/prepend] the generated tablist 
    if (!_this.$el.find('.' + _this.opts.tabsListClass).length) {
      _this.$el[positions[_this.opts.tabsPosition]](_this.tabsList.toHtml());
    }

    var $content = _this.$el.find('.' + _this.opts.tabBodyClass),
        $tabsList = _this.$el.find('.' + _this.opts.tabsListClass);

    // Show the first tab content by default
    if ($content.length > 0) {
      $content.attr('aria-hidden', true).hide();
      $($content[0]).attr('aria-hidden', false).show();
    }

    // Which tab should be active?
    $tabsList.find(' > li:first')
      .addClass(_this.opts.firstTabClass + ((!_this.hasPreActiveTab) ? 
        ' ' + _this.opts.activeClass :
        ''
      ))
      .closest('ul').find('> li:last')
      .addClass(_this.opts.lastTabClass);


    if (_this.opts.wrapInnerTabs) {
      $tabsList.find('> li > a').wrapInner(_this.opts.wrapInnerTabs);
    }

    $tabsList.find('> li a').each(function (i) {

      $(this).on('click', function (e) {
        e.preventDefault();

        var $parent = $(this).parent();

        if (!$parent.hasClass(_this.opts.activeClass)) {

          var isDropdownTab = !!($parent.hasClass(_this.opts.dropdownTabClass));
          var tabWithinDropdown = !!$(this).closest('.' + _this.opts.dropdownTabClass).length;

          if (!isDropdownTab) {
            $tabsList
              .find('.' + _this.opts.activeClass)
              .removeClass(_this.opts.activeClass);

            $tabsList
              .find('.' + _this.opts.dropdownTabActiveClass)
              .removeClass(_this.opts.dropdownTabActiveClass);

            if (tabWithinDropdown) {
              $parent
                .closest('.' + _this.opts.dropdownTabClass)
                .addClass(_this.opts.dropdownTabActiveClass);
            }
          } else {
            $parent.removeClass(_this.opts.dropdownTabActiveClass);
          }

          $parent.addClass(_this.opts.activeClass);
        } else {
          if ($parent.hasClass(_this.opts.dropdownTabClass)) {
            $parent.removeClass(_this.opts.activeClass);
          }
          if ($parent.hasClass(_this.opts.dropdownTabActiveClass)) {
            $parent.removeClass(_this.opts.dropdownTabActiveClass);
          }
        }

        $(this).blur();

        var j = i;

        if (!$parent.hasClass(_this.opts.dropdownTabClass)) {
          _this.$el.find('.' + _this.opts.tabBodyClass + ':visible').hide();

          // little hack to because we have more tabHead then tabBodys
          if ($(this).closest('.' + _this.opts.dropdownTabClass).length) {
            j = i-1;
          }

          $(this).focus().keyup(function (e) {
            if (keyCodes[e.keyCode]) {
              if (_this.activateTab(
                  generateId(
                    '#'+'accessibletabscontent',
                    _this.currentTabsCount, 
                    (j + keyCodes[e.keyCode]
                  ))
              )) {
                $(this).unbind('keyup');
              }
            }
          });

          var tabBodyId = $(this).attr('id').replace('accessibletabscontent', 'accessibletabscontentbody');
          var $tabBody = _this.$el.find('#' + tabBodyId);

          // Show tab with equivalent id
          if ($tabBody.length > 0) {
            _this.$el.find('.' + _this.opts.tabBodyClass).attr('aria-hidden', true);
            $tabBody.attr('aria-hidden', false)[_this.opts.fx](_this.opts.fxSpeed);
          }
        }
      });

      $(this).focus(function () {
        $(document).keyup(function (e) {
          if (keyCodes[e.keyCode]) {
            _this.activateTab(
              '#'+generateId('accessibletabscontent',
              _this.currentTabsCount,
              (i + keyCodes[e.keyCode])
            ));
          }
        });
      });

      $(this).blur(function () {
        $(document).unbind('keyup');
      });
    });

    // If we have an anchor in our url, trigger click event on the right tab
    if (_this.opts.autoAnchor && window.location.hash) {
      _this.activateTab(window.location.hash);
    }
    if (_this.hasPreActiveTab) {
      _this.activateTab('#' + _this.preActiveId);
    }
    tabsCount++;
  }

  NeoTabs.prototype = (function () {
    return {

      activateTab: function (id) {
        var $tab = $(id);
        if ($tab.length > 0) {
          $tab.click();
          return true;
        }
        return false;
      },

      toggleDropdown: function () {
        var id = this.$el.find('.' + this.opts.dropdownTabClass + '> a').attr('id');
        return this.activateTab('#' + id);
      },

      openDropdown: function () {
        this.toggleDropdown();
      },

      closeDropdown: function () {
        this.toggleDropdown();
      }
    };
  }());

  function TabsList(options) {
    this.tabs = [];
    this.clearfixClass = options.clearfixClass;
    this.tabsListClass = options.tabsListClass;
  }

  TabsList.prototype.addTab = function (tab) {
    this.tabs.push(tab);
  };

  TabsList.prototype.toHtml = function () {
    var len = this.tabs.length,
        i = 0,
        html = '<ul class="' + this.clearfixClass + ' ' + this.tabsListClass + '">';

    for (; i < len; i++) {
      html += this.tabs[i].toHtml();
    }
    return html;
  };

  function Tab(options) {
    this.label = options.label;
    this.id = options.id;
    this.navigationId = options.navigationId;
    this.tabsList = options.tabsList;
    this.cssClass = options.cssClass;
  }

  Tab.prototype.toHtml = function () {
    var html = '<li class="' + this.cssClass + '" id="' + this.navigationId + '"><a href="#' + this.id + '" id="' + this.id + '">' + this.label + '</a>';
 
    if (this.tabsList) {
      html += this.tabsList.toHtml();
    }
    html += '</li>';
    return html;
  };

  $.fn[pluginName] = function (options) {
    return this.each(function () {
      if (!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName, new NeoTabs($(this), options ));
      }
    });
  };

  window.NeoTabs = NeoTabs;

}(jQuery, window));
