'use strict';
/* jasmine specs for controllers go here */

describe('jQuery NeoTabs TestSuite', function () {

  var $fixture;

  describe('Dependency TestSuite', function () {

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


  describe('DOM Manipulation TestSuite', function () {

    beforeEach(function () {
      $fixture = $(
        '<div class="tabs">' +
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
        '</div>');
    });


    describe('NeoTabs instance', function () {

      var $instance = new NeoTabs($fixture);

      it('tests if constructor returns a NeoTabs instance', function () {
        expect(typeof($instance)).toBe('object');
        expect($instance.constructor).toBe(NeoTabs);
      });
    });
  });
});
