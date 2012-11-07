(function () {

  "use strict";

  describe('jQuery NeoTabs TestSuite', function () {

    var fixture = '<div class="tabs">' +
      '<div class="tabbody">' +
        '<h4>Tabbody Heading</h4>' +
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
      var $el = $(fixture),
          $neoTabs = new NeoTabs($el);

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
      var $el = $(fixture),
          $neoTabs = new NeoTabs($el);

      it('should assign an element', function () {
        expect($neoTabs.$el).toBe($el);
      });

      it('should inject a tabs list', function () {
        expect($neoTabs.$el).toContain('.tabs-list');
        expect($neoTabs.$el.find('.tabs-list')).toBe('ul');
        expect($neoTabs.$el.find('.tabs-list')).not.toBe('ol');
      });

      it('should prepend tabs list in tabs by default', function () {
        expect($neoTabs.$el.children(0).hasClass('tabs-list')).toBe(true);
      });

      it('should set the first tab active', function () {
        expect($neoTabs.$el.find('.tabs-list').children(0).hasClass('active')).toBe(true);
      });
    });
  });
}());
