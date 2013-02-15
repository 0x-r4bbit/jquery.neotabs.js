;(function ($, window) {

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
        wrapOuterTabsList: '',
        dropdownTabLabel: '&#x25BE;',
        dropdownTabClass: 'dropdown',
        dropdownTabActiveClass: 'hidden-active',
        dropdownTabsListClass: 'tabs-list',
        dropdownTabsClearfixClass: 'group'
      },
      tabbableCount =  0,
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

  var generateId = function (name, tabsCount, tabCount) {
    var id = name + tabbableCount;

    if (tabCount !== undefined) {
      id += '-' + tabCount;
    }
    return id;
  };

  function NeoTabs(element, options) {

    var o = this;

    $.extend(o, {options: $.extend({}, defaults, options)});

    var getClassList = (function () {
      if (o.options.cssClassAvailable) {
        return function (origObj, tabObj) {
          if (origObj.attr('class')) {
            return [origObj.attr('class'), o.options.tabHeadClass].join();
          }
          return o.options.tabHeadClass;
        };
      }
      return function () {
        return o.options.tabHeadClass;
      };
    }());

    var clone = element.clone(),
        tabHeads = clone.find(o.options.tabHeadElement),
        len = tabHeads.length,
        tabsList = $(document.createElement('ul'));

    tabsList.attr('class', [
      o.options.clearfixClass,
      o.options.tabsListClass
    ].join(' '));

    clone.wrapInner('<div class="' + o.options.wrapperClass + '"/>');

    for (var i = 0; i < len; ++i) {

      var tabHead = $(tabHeads[i]),
          tab = $(document.createElement('li')),
          tabLink = $(document.createElement('a'));

      (i === 0) && tab.addClass(o.options.firstTabClass);

      if (tabHead.hasDataAttr('neotabs-active')) {
        tab.addClass(o.options.activeClass);
      }

      if (!tabHead.hasDataAttr('neotabs-dropdown')) {
        tabLink.html(tabHead.text());
        tabLink.attr('href', ['#accessibletabscontent-', tabbableCount, '-', i].join(''));

        tab.append(tabLink);
        tab.addClass(getClassList(tabHead, tab));
        (i === len-1) && tab.addClass(o.options.lastTabClass);
        tab.attr('id', ['accessibletabsnavigation-', tabbableCount, '-', i].join(''));

        if (o.options.wrapInnerTabs) {
          tab.replaceWith('<span class="'+o.options.wrapInnerTabs+'">'+tab.html()+'</span>');
        }

        tabsList.append(tab);
        //console.dir(tabHead.parent());
        tabHead.parent().attr('id', ['accessibletabscontent-', tabbableCount, '-', i].join(''));
      } else {
        var ddTabsList = $(document.createElement('ul')), j = i;

        tabLink.html(o.options.dropdownTabLabel);
        tabLink.attr('href', '#');
        tab.append(tabLink);
        tab.addClass(o.options.tabHeadClass);
        tab.addClass(o.options.dropdownTabClass);

        ddTabsList.attr('class', [
          o.options.dropdownTabsClearfixClass,
          o.options.dropdownTabsListClass
        ].join(' '));

        for (; j < len; j++) {
          var ddTabHead = $(tabHeads[j]),
              ddTab = $(document.createElement('li')),
              ddTabLink = $(document.createElement('a'));

          ddTabLink.html(ddTabHead.text());
          ddTabLink.attr('href', ['#accessibletabscontent-', tabbableCount, '-', j].join(''));

          ddTab.append(ddTabLink);
          ddTab.addClass(getClassList(ddTabHead, ddTab));

          if (o.options.wrapInnerTabs) {
            ddTab.replaceWith('<span class="'+o.options.wrapInnerTabs+'">'+ddTab.html()+'</span>');
          }

          ddTab.attr('id', ['accessibletabsnavigation-', tabbableCount, '-', j].join(''));
          ddTabsList.append(ddTab);
          ddTabHead.parent().attr('id', ['accessibletabscontent-', tabbableCount, '-', j].join(''));
        }

        tab.append(ddTabsList);
        tabsList.append(tab);

        break;
      }
    }
 
    if (o.options.wrapOuterTabsList) {
      tabsList = tabsList.wrap('<div class="'+o.options.wrapOuterTabsList+'" />').parent();
    }

    clone[positions[o.options.tabsPosition]](tabsList);

    var content = clone.find('.' + o.options.tabBodyClass);

    content.attr('aria-hidden', true).hide();
    content.first().attr('aria-hidden', false).show();

    tabsList.on('click', 'li', function (e) {

      e.preventDefault();
      e.stopPropagation();
      
      var _tab = $(this),
          _hash = _tab.children()[0].hash;

      if (_tab.hasClass(o.options.dropdownTabClass) &&
        _tab.hasClass(o.options.activeClass)) {

        _tab.removeClass(o.options.activeClass);
      } else {
        console.log(tabsList.find('.'+o.options.activeClass));
        tabsList.find('.'+o.options.activeClass).removeClass(o.options.activeClass);
        _tab.addClass(o.options.activeClass);
      }

      if(_hash.length) {
        clone.find('.' + o.options.tabBodyClass).attr('aria-hidden', true).hide();
        clone.find(_hash).attr('aria-hidden', false)[o.options.fx](o.options.fxSpeed);
      }
      

      /*if (_tab.hasClass(o.options.dropdownTabClass) &&
        _tab.hasClass(o.options.activeClass)) {
        _tab.removeClass(o.options.activeClass);
      }*/

      
    });

    element.replaceWith(clone);

    /*$.extend(o, {
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
    o.tabsList = new TabsList({
      clearfixClass: o.opts.clearfixClass,
      tabsListClass: o.opts.tabsListClass
    });

    o.$el.wrapInner('<div class="' + o.opts.wrapperClass + '"/>');

    o.$el.find(o.opts.tabHeadElement).each(function (i) {

      var $tabHeadElement = $(this);

      // Does our markup want us to make a dropdown?
      if (!o.hasDropdown() && $tabHeadElement.hasDataAttr('neotabs-dropdown')) {
        o.dropdownTabsList = new TabsList({
          clearfixClass: o.opts.dropdownTabsClearfixClass,
          tabsListClass: o.opts.dropdownTabsListClass
        });
        o.dropdown = true;
      }

      // Is there a pre-active tab?
      if (!o.hasPreActiveTab && $tabHeadElement.hasDataAttr('neotabs-active')) {
        $tabHeadElement.addClass(o.opts.activeClass);
        o.hasPreActiveTab = true;
      }

      // Build a new tab with all the options
      var tab = new Tab({
        label: $tabHeadElement.html(),
        id: generateId('accessibletabscontent', tabbableCount, i),
        navigationId: generateId('accessibletabsnavigation', tabbableCount, i),
        tabsList: null,
        cssClass: (o.opts.cssClassAvailable) ?
          (($tabHeadElement.attr('class') || '') + ' ' + o.opts.tabHeadClass) :
          o.opts.tabHeadClass
      });
      // If we have a dropdown, add the tab to the dropdown list instead to the tabslist
      if (o.hasDropdown()) {
        o.dropdownTabsList.addTab(tab);
      } else {
        o.tabsList.addTab(tab);
      }

      if (o.hasPreActiveTab && o.preActiveId === '') {
        o.preActiveId = tab.id;
      }

      // Add an equivalent id to equivalent tabbody
      $tabHeadElement
        .parent('.' + o.opts.tabBodyClass)
        .attr('id', generateId('accessibletabscontentbody', tabbableCount, i));

      // Give the tabhead the following attributes
      $tabHeadElement.attr({
        'id': tab.id,
        'class': o.opts.tabHeadClass,
        'tab-index': '-1'
      });

      o.ids.push(tab.id);
    });


    // Generate dropdown tab if hasDropdown flag is true
    if (o.hasDropdown()) {
      o.tabsList.addTab(new Tab({
        label: o.opts.dropdownTabLabel,
        id: generateId('accessibletabsdropdown', tabbableCount),
        navigationId: '',
        tabsList: o.dropdownTabsList,
        cssClass: o.opts.tabHeadClass + ' ' + o.opts.dropdownTabClass
      }));
    }

    // [append/prepend] the generated tablist
    if (!o.$el.find('.' + o.opts.tabsListClass).length) {
      o.$el[positions[o.opts.tabsPosition]](o.tabsList.toHtml());
    }*/

    /*var $content = o.$el.find('.' + o.opts.tabBodyClass),
        $tabsList = o.$el.find('.' + o.opts.tabsListClass);

    // Show the first tab content by default
    if ($content.length > 0) {
      $content.attr('aria-hidden', true).hide();
      $($content[0]).attr('aria-hidden', false).show();
    }

    // Which tab should be active?
    $tabsList.find(' > li:first')
      .addClass(o.opts.firstTabClass + ((!o.hasPreActiveTab) ?
        ' ' + o.opts.activeClass :
        ''
      ))
      .closest('ul').find('> li:last')
      .addClass(o.opts.lastTabClass);


    if (o.opts.wrapInnerTabs) {
      $tabsList.find('> li > a').wrapInner(o.opts.wrapInnerTabs);
    }*/

/*    $tabsList.find('> li a').each(function (i) {

      $(this).on('click', function (e) {
        e.preventDefault();
        $(this).unbind('keyup');

        var $parent = $(this).parent(),
            isActive = $parent.hasClass(o.opts.activeClass),
            isDropdownTab = $parent.hasClass(o.opts.dropdownTabClass),
            tabWithinDropdown = !!$(this).closest('.' + o.opts.dropdownTabClass).length && !isDropdownTab;

        if (!isDropdownTab) {
          $tabsList
            .find('.' + o.opts.activeClass)
            .removeClass(o.opts.activeClass);

            $parent.addClass(o.opts.activeClass);
        } else {
          if (!isActive) {
            $parent.addClass(o.opts.activeClass);
          } else {
            $parent.removeClass(o.opts.activeClass + ' ' + o.opts.dropdownTabActiveClass);
          }
        }

        if (!tabWithinDropdown) {
          $tabsList
            .find('.' + o.opts.dropdownTabActiveClass)
            .removeClass(o.opts.dropdownTabActiveClass);
        } else {
          $tabsList
            .find('.' + o.opts.dropdownTabClass)
            .addClass(o.opts.dropdownTabActiveClass)
            .find('> a').focus();
        }

        if (!isDropdownTab) {
          o.$el.find('.' + o.opts.tabBodyClass + ':visible').hide();

          var tabBodyId = $(this)
            .attr('id')
            .replace('accessibletabscontent', 'accessibletabscontentbody');

          var $tabBody = o.$el.find('#' + tabBodyId);

          // Show tab with equivalent id
          if ($tabBody.length > 0) {
            o.$el.find('.' + o.opts.tabBodyClass).attr('aria-hidden', true);
            $tabBody.attr('aria-hidden', false)[o.opts.fx](o.opts.fxSpeed);
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
              o.activateTab('#' + $parent.next().find('a').attr('id'));
            }
            if (e.keyCode === 37) {
              o.activateTab('#' + $parent.prev().find('a').attr('id'));
            }

            if ($parent.hasClass(o.opts.dropdownTabClass)) {
              if (!$parent.hasClass(o.opts.activeClass)) {
                if (e.keyCode === 40 || e.keyCode === 32) {
                  o.openDropdown();
                }
              } else {
                if (e.keyCode === 40) {
                  $parent.find('.' + o.opts.tabsListClass + ' li:first a').focus();
                }
              }
            } else {
              if (e.keyCode === 40) {
                o.activateTab('#' + $parent.prev().find('a').attr('id'));
              }
            }
          } else {
            // Okay it's a tab within a dropdown

            if (e.keyCode === 38) {
              if ($parent.hasClass(o.opts.firstTabClass)) {
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
    if (o.opts.autoAnchor && window.location.hash) {
      o.activateTab(window.location.hash);
    }
    if (o.hasPreActiveTab) {
      o.activateTab('#' + o.preActiveId);
    }*/
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
