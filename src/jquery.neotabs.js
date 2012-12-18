;(function ($, window, undefined) {

var it = 50000;
var document = window.document;
var start = new Date().getTime();
for (i = 0; i < it; ++i)  {
  var e = document.createElement('div');
/*var e = $( document.createElement('div') );  // ~300ms*/
/*var e = $('<div>');                          // ~3100ms*/
/*var e = $('<div></div>');                    // ~3200ms*/
/*var e = $('<div/>');                         // ~3500ms*/


}
var end = new Date().getTime();
console.log(end-start);

  var pluginName = 'neoTabs',
      document = window.document,
      $body = $('body'),

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
        wrapOuterTabsList: '',
        dropdownTabLabel: '&#x25BE;',
        dropdownTabClass: 'dropdown',
        dropdownTabActiveClass: 'hidden-active',
        dropdownTabsListClass: 'tabs-list',
        dropdownTabsClearfixClass: 'group'
      },
      tabbableCount = ($body.data('tabbableCount') ? $body.data('tabbableCount') : 0),
      positions = {
        top: 'prepend',
        bottom: 'append'
      };
  
  // Helper function to check exclusively for an HTML5 data-attribute. Thanks to
  // @cburgdorf for typing down this gist for me: (https://gist.github.com/3979912)
  $.fn.hasDataAttr = function (attr) {
    var value = this.attr('data-' + attr);
    return typeof value !== 'undefined' && value !== false;
  };
 
  function toArray(collection) {
    var i = 0,
        a = [],
        len = collection.length;

    for (; i < len; i++) {
      a[i] = collection[i];
    }
    return a;
  }

  var hasAttribute = (function () {

    // IE8 fallback
    if (!document.createElement().hasAttribute) {

      return function (obj, attr) {
        var value = obj.getAttribute(attr);
        if (attr.split('-').indexOf('data') === 0) { 
          return value === '';
        }
        return !!value;
      };
    }
    return function (obj, attr) {
      return obj.hasAttribute(attr);
    };
  }());

  function hasDataAttr(obj, attr) {
    return hasAttribute(obj, 'data-' + attr);
  }

  $('body').data('tabbableCount', tabbableCount);

  var generateId = function (name, tabsCount, tabCount) {
    var id = name + tabbableCount;

    if (tabCount !== undefined) {
      id += '-' + tabCount;
    }
    return id;
  };


  function NeoTabs(element, options) {

    $.extend(this, {options: $.extend({}, defaults, options)});

    var o = this,
        _this = this,

        // Back to the roots!
        el = (element instanceof jQuery) ? 
          element.get(0).cloneNode(true) : 
          element.cloneNode(true),

        tabHeads = el.querySelectorAll(o.options.tabHeadElement),
        len = tabHeads.length,
        i = 0,
        tabsList = document.createElement('ul'),
        tabNoob = document.createElement('li'),
        anchorNoob = document.createElement('a'),

        // I love this function nesting
        getTabClassList = (function () {

          if (!o.options.cssClassAvailable) {
            return function () {
              return o.options.tabHeadClass;
            };
          }

          return function (origObj, tabobj) {
            if (hasAttribute(origObj, 'class')) {
              return [
                origObj.getAttribute('class'),
                o.options.tabHeadClass
              ].join(' ');
            }
            return o.options.tabHeadClass;
          };

        }());

    tabsList.setAttribute('css', [
      o.options.clearfixClass,
      o.options.tabsListClass
    ].join(' '));

    var start1 = new Date().getTime();

    for (; i < len; i++) {

      var tabHead = tabHeads[i],
          tab = tabNoob.cloneNode(false),
          tabLabel = anchorNoob.cloneNode(false);

      if (!hasDataAttr(tabHead, 'neotabs-dropdown')) {

        tabLabel.innerHTML = tabHead.innerHTML;
        tabLabel.href = '#accessibletabscontent-' + tabbableCount + '-' + i;
        tab.appendChild(tabLabel);

        tab.setAttribute('class', getTabClassList(tabHead, tab));
        tab.id = 'accessibletabsnavigation-' + tabbableCount + '-' + i;
        tabsList.appendChild(tab);
      } else {

        var ddTabs = tabsList.cloneNode(false), j = i;

        tabLabel.innerHTML = o.options.dropdownTabLabel;
        tab.appendChild(tabLabel);
        tab.setAttribute('class', getTabClassList(tabHead, tab));
        tab.id = 'accessibletabsnavigation-' + tabbableCount + '-' + i;

        for (; j < len; j++) {
          var ddTab = tabNoob.cloneNode(false),
              ddTabLabel = anchorNoob.cloneNode(false),
              ddTabHead = tabHeads[j];

          ddTabLabel.innerHTML = ddTabHead.innerHTML;
          ddTabLabel.href = '#accessibletabscontent-' + tabbableCount + '-' + j;
          ddTab.appendChild(ddTabLabel);
          ddTab.id = 'accessibletabsnavigation-' + tabbableCount + '-' + j;

          ddTab.setAttribute('class', getTabClassList(ddTabHead, ddTab));
          ddTabs.appendChild(ddTab);
        }

        tab.appendChild(ddTabs);
        tabsList.appendChild(tab);

        break;
      }
    }
    var end1 = new Date().getTime();
/*console.log(start1);
console.log(end1);
console.log('Result new:', end1-start1);*/

    $.extend(_this, {
      $el: element,
      opts: $.extend({}, defaults, options),
      dropdown: false,
      hasPreActiveTab: false,
      preActiveId: '',
      tabsList: null,
      dropdownTabsList: null,
      currentTabsCount: tabbableCount,
      ids: []
    });
    _this.tabsList = new TabsList({
      clearfixClass: _this.opts.clearfixClass,
      tabsListClass: _this.opts.tabsListClass
    });

    _this.$el.wrapInner('<div class="' + _this.opts.wrapperClass + '"/>');

    var start2 = new Date().getTime();

    _this.$el.find(_this.opts.tabHeadElement).each(function (i) {

      var $tabHeadElement = $(this);

      // Does our markup want us to make a dropdown?
      if (!_this.hasDropdown() && $tabHeadElement.hasDataAttr('neotabs-dropdown')) {
        _this.dropdownTabsList = new TabsList({
          clearfixClass: _this.opts.dropdownTabsClearfixClass,
          tabsListClass: _this.opts.dropdownTabsListClass
        });
        _this.dropdown = true;
      }

      // Is there a pre-active tab?
      if (!_this.hasPreActiveTab && $tabHeadElement.hasDataAttr('neotabs-active')) {
        $tabHeadElement.addClass(_this.opts.activeClass);
        _this.hasPreActiveTab = true;
      }

      // Build a new tab with all the options
      var tab = new Tab({
        label: $tabHeadElement.html(),
        id: generateId('accessibletabscontent', tabbableCount, i),
        navigationId: generateId('accessibletabsnavigation', tabbableCount, i),
        tabsList: null,
        cssClass: (_this.opts.cssClassAvailable) ?
          (($tabHeadElement.attr('class') || '') + ' ' + _this.opts.tabHeadClass) :
          _this.opts.tabHeadClass
      });
      // If we have a dropdown, add the tab to the dropdown list instead to the tabslist
      if (_this.hasDropdown()) {
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
        .attr('id', generateId('accessibletabscontentbody', tabbableCount, i));

      // Give the tabhead the following attributes
      $tabHeadElement.attr({
        'id': tab.id,
        'class': _this.opts.tabHeadClass,
        'tab-index': '-1'
      });

      _this.ids.push(tab.id);
    });

    var end2 = new Date().getTime();
/*console.log(start2);
console.log(end2);
console.log('Result old:', end2-start2);*/

    // Generate dropdown tab if hasDropdown flag is true
    if (_this.hasDropdown()) {
      _this.tabsList.addTab(new Tab({
        label: _this.opts.dropdownTabLabel,
        id: generateId('accessibletabsdropdown', tabbableCount),
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
        $(this).unbind('keyup');

        var $parent = $(this).parent(),
            isActive = $parent.hasClass(_this.opts.activeClass),
            isDropdownTab = $parent.hasClass(_this.opts.dropdownTabClass),
            tabWithinDropdown = !!$(this).closest('.' + _this.opts.dropdownTabClass).length && !isDropdownTab;

        if (!isDropdownTab) {
          $tabsList
            .find('.' + _this.opts.activeClass)
            .removeClass(_this.opts.activeClass);

            $parent.addClass(_this.opts.activeClass);
        } else {
          if (!isActive) {
            $parent.addClass(_this.opts.activeClass);
          } else {
            $parent.removeClass(_this.opts.activeClass + ' ' + _this.opts.dropdownTabActiveClass);
          }
        }

        if (!tabWithinDropdown) {
          $tabsList
            .find('.' + _this.opts.dropdownTabActiveClass)
            .removeClass(_this.opts.dropdownTabActiveClass);
        } else {
          $tabsList
            .find('.' + _this.opts.dropdownTabClass)
            .addClass(_this.opts.dropdownTabActiveClass)
            .find('> a').focus();
        }

        if (!isDropdownTab) {
          _this.$el.find('.' + _this.opts.tabBodyClass + ':visible').hide();

          var tabBodyId = $(this)
            .attr('id')
            .replace('accessibletabscontent', 'accessibletabscontentbody');

          var $tabBody = _this.$el.find('#' + tabBodyId);

          // Show tab with equivalent id
          if ($tabBody.length > 0) {
            _this.$el.find('.' + _this.opts.tabBodyClass).attr('aria-hidden', true);
            $tabBody.attr('aria-hidden', false)[_this.opts.fx](_this.opts.fxSpeed);
          }
        }
        $(this).focus();
      });

      $(this).focus(function (e) {

        var $parent = $(e.target).parent();

        $(this).unbind('keyup').on('keyup', function (e) {
          // is $(this) a tab within a dropdown?
          var tabWithinDropdown = $parent.parents().get(1).tagName === 'LI';

          if (!tabWithinDropdown) {

            if (e.keyCode === 39 || e.keyCode === 38) {
              _this.activateTab('#' + $parent.next().find('a').attr('id'));
            }
            if (e.keyCode === 37) {
              _this.activateTab('#' + $parent.prev().find('a').attr('id'));
            }

            if ($parent.hasClass(_this.opts.dropdownTabClass)) {
              if (!$parent.hasClass(_this.opts.activeClass)) {
                if (e.keyCode === 40 || e.keyCode === 32) {
                  _this.openDropdown();
                }
              } else {
                if (e.keyCode === 40) {
                  $parent.find('.' + _this.opts.tabsListClass + ' li:first a').focus();
                }
              }
            } else {
              if (e.keyCode === 40) {
                _this.activateTab('#' + $parent.prev().find('a').attr('id'));
              }
            }
          } else {
            // Okay it's a tab within a dropdown

            if (e.keyCode === 38) {
              if ($parent.hasClass(_this.opts.firstTabClass)) {
                $parent.closest('ul').parent().find('> a').focus();
              } else {
                $parent.prev().find('a').focus();
              }
            }
            if (e.keyCode === 40) {
              $parent.next().find('a').focus();
            }
          }
        });
      });
    });

    // If we have an anchor in our url, trigger click event on the right tab
    if (_this.opts.autoAnchor && window.location.hash) {
      _this.activateTab(window.location.hash);
    }
    if (_this.hasPreActiveTab) {
      _this.activateTab('#' + _this.preActiveId);
    }
    tabbableCount++;
  }

  NeoTabs.prototype.activateTab = function (id) {
    var $tab = $(id);
    if ($tab.length > 0) {
      $tab.click();
      return true;
    }
      return false;
  };

  NeoTabs.prototype.toggleDropdown = function () {
    var id = this.$el.find('.' + this.opts.dropdownTabClass + '> a').attr('id');
    return this.activateTab('#' + id);
  };

  NeoTabs.prototype.openDropdown = function () {
    this.toggleDropdown();
  };

  NeoTabs.prototype.closeDropdown = function () {
    this.toggleDropdown();
  };

  NeoTabs.prototype.hasDropdown = function () {
    return this.dropdown;
  };

  function TabsList(options) {
    this.tabs = [];
    this.clearfixClass = options.clearfixClass;
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
    var html = '<li class="' +
      this.cssClass + '" id="' +
      this.navigationId +
      '"><a href="#' +
      this.id + '" id="' +
      this.id + '">' +
      this.label + '</a>';

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
