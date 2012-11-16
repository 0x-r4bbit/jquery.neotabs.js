(function () {

  "use strict";

  describe('jQuery NeoTabs TestSuite', function () {

    var fixtureBasic = '<div class="tabs">' +
      '<div class="tabbody">' +
        '<h4 class="foo">Tabbody Heading</h4>' +
        '<p>Lorem Ipsum</p>' +
      '</div>' +
      '<div class="tabbody">' +
        '<h4>Tabbody Heading 2</h4>' +
        '<p>Lorem Ipsum</p>' +
      '</div>' +
      '<div class="tabbody">' +
        '<h4>Tabbody Heading 3</h4>' +
        '<p>Lorem Ipsum</p>' +
      '</div>' +
      '<div class="tabbody">' +
        '<h4>Tabbody Heading 4</h4>' +
        '<p>Lorem Ipsum</p>' +
      '</div>' +
    '</div>';

    var fixtureDropdown = '<div class="tabs">' +
      '<div class="tabbody">' +
        '<h4 class="foo">Tabbody Heading</h4>' +
        '<p>Lorem Ipsum</p>' +
      '</div>' +
      '<div class="tabbody">' +
        '<h4>Tabbody Heading 2</h4>' +
        '<p>Lorem Ipsum</p>' +
      '</div>' +
      '<div class="tabbody">' +
        '<h4 data-neotabs-dropdown>Tabbody Heading 3</h4>' +
        '<p>Lorem Ipsum</p>' +
      '</div>' +
      '<div class="tabbody">' +
        '<h4>Tabbody Heading 4</h4>' +
        '<p>Lorem Ipsum</p>' +
      '</div>' +
    '</div>';

    var defaultOptions = {
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
    };

    var options;


    beforeEach(function () {
      options = defaultOptions;
    });

    describe('Setup', function () {

      it('tests if jQuery is loaded', function () {
        expect(!!$).toBe(true);
        expect(typeof($)).toBe('function');
      });

      it('tests if NeoTabs is a jQuery plugin', function () {
        expect(typeof($.fn.neoTabs)).toBe('function');
      });

      it('tests if NeoTabs constructor is avaible in global scope', function () {
        expect(!!NeoTabs).toBe(true);
        expect(typeof(NeoTabs)).toBe('function');
      });
    });

    describe('Public API', function () {
      var $el = $(fixtureBasic),
          $neoTabs = new NeoTabs($el, options);

      it('should have a method to activate tabs', function () {
        var methodExists = (typeof($neoTabs.activateTab) === 'function');
        expect(methodExists).toBe(true);
      });

      it('should have a method to open a dropdown', function () {
        var methodExists = (typeof($neoTabs.openDropdown) === 'function');
        expect(methodExists).toBe(true);
      });
    });

    describe('Initialization', function () {
      var $el = $(fixtureBasic),
          $neoTabs = new NeoTabs($el, options);

      it('should assign an element', function () {
        expect($neoTabs.$el).toBe($el);
      });

      it('should inject a content wrapper', function () {
        expect($neoTabs.$el).toContain('.' + options.wrapperClass);
      });

      it('should inject a tabs list', function () {
        expect($neoTabs.$el).toContain('.' + options.tabsListClass);
        expect($neoTabs.$el.find('.' + options.tabsListClass)).toBe('ul');
        expect($neoTabs.$el.find('.' + options.tabsListClass)).not.toBe('ol');
      });

      it('should give the tabs list a cleafix class', function () {
        expect($neoTabs.$el.find('.' + options.tabsListClass).hasClass(options.clearfixClass)).toBe(true);
      });

      it('should set the first tab active', function () {
        expect($neoTabs.$el.find('.' + options.tabsListClass).children(0).hasClass(options.activeClass)).toBe(true);
      });

      it('should give the first tab the firstTabClass', function () {
        expect($neoTabs.$el.find('.' + options.tabsListClass).children(0).hasClass(options.firstTabClass)).toBe(true);
      });

      it('should give each tab a tabhead class', function () {
        $neoTabs.$el.find('.' + options.tabsListClass).children().each(function (i, tab) {
          expect($(tab).hasClass(options.tabHeadClass)).toBe(true);
        });
      });

      it('should give the last tab the lastTabClass', function () {
        expect($neoTabs.$el.find('.' + options.tabsListClass).children(':last').hasClass(options.lastTabClass)).toBe(true);
      });

      it('should prepend tabs list in tabs by default', function () {
        expect($neoTabs.$el.children(0)).toBe('ul');
      });

      it('should apply pre-existing class of tabhead by default', function () {
        expect($neoTabs.$el).toContain('.foo');
        expect($neoTabs.$el.find('.foo')).toBe('li');
      });
    });

    describe('Dropdown initialization', function () {
      var $el = $(fixtureDropdown),
          $neoTabs = new NeoTabs($el, options);

      it('should have a dropdown tab', function () {
        expect($neoTabs.$el).toContain('.' + options.dropdownTabClass);
      });

      it('should have a dropdownTabsList of two tabs', function () {
        expect(typeof($neoTabs.dropdownTabsList)).toBe('object');
        expect(typeof($neoTabs.dropdownTabsList.tabs)).toBe('object');
        expect($neoTabs.dropdownTabsList.tabs.length).toBe(2);
      });
    });
  });
}());
