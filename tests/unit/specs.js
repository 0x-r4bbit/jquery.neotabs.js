'use strict';
/* jasmine specs for controllers go here */

describe('jQuery NeoTabs tests', function () {

  var fixture;

  beforeEach(function () {
    fixture = $('<div class="tabs">' +
      '<div class="tabbody">' +
        '<h4>Heading</h4>' +
        '<p>Lorem Ipsum</p>' +
      '</div>' +
      '<div class="tabbody">' +
        '<h4>Heading 2</h4>' +
        '<p>Lorem Ipsum</p>' +
      '</div>' +
      '<div class="tabbody">' +
        '<h4>Heading 3</h4>' +
        '<p>Lorem Ipsum</p>' +
      '</div>' +
    '</div>');
  });

  it('shoud return true if NeoTabs is available', function () {
    expect(typeof($.fn.neoTabs)).toBe('function');
  });
});
