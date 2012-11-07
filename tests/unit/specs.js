'use strict';

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
      expect(!!window.$).toBe(true);
      expect(typeof(window.$)).toBe('function');
    });

    it('tests if NeoTabs is a jQuery plugin', function () {
      expect(typeof($.fn.neoTabs)).toBe('function');
    });

    it('tests if NeoTabs constructor is avaible in global scope', function () {
      expect(!!window.NeoTabs).toBe(true);
      expect(typeof(window.NeoTabs)).toBe('function');
    });
  });

  describe('Initialization', function () {
    var $el = $(fixture),
        $neoTabs = new NeoTabs($el);

    it('should assign an element', function () {
      expect($neotabs.$el).toBe($el);
    });
  });

  describe('Public API', function () {
    var $el = $(fixture),
        $neoTabs = new NeoTabs($el);

    it('should have a method to activate tabs', function () {
      var methodExists = (typeof($neoTabs.activateTab) === 'function')
      expect(methodExists).toBe(true);
    });

    it('should have a method to open a dropdown', function () {
      var methodExists = (typeof($neoTabs.openDropdown) == 'function');
      expected(methodExists).toBe(true);
    });
  });
});
