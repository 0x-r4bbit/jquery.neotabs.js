'use strict';
/* jasmine specs for controllers go here */

describe('jQuery NeoTabs TestSuite', function () {

  var fixture;

  describe('Dependency Suite', function () {
    it('tests if jQuery is loaded', function () {
      expect(!!window.$).toBe(true);
      expect(typeof(window.$)).toBe('function');
    });

    it('tests if NeoTabs is a jQuery plugin', function () {
      expect(typeof($.fn.neoTabs)).toBe('function');
    });
  });

  describe('DOM Manipulation Suite', function () {

    it('tests if a is b', function () {
      expect(false).toBe(true);
    });
  });
});
