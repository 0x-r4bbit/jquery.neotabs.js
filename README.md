# jQuery NeoTabs

A flexible jQuery plugin for generating accessible tabs **AND**  tabs as dropdown inspired by
[Dirk Ginader's Accessible-Tabs](http://github.com/ginader/Accessible-Tabs)

## What? Another jQuery Plugin for Accessible Tabs?

Yes. But it's not just another jQuery Plugin for accessible tabs. This plugin solves a problem, which isn't solved by any plugin I found in the interwebs (This is the moment you should ping me, if you know a plugin which **does** solve the problem, which is explained below).

## Why NeoTabs?
So why did I spend the time to revamp Dirk's code from his Accessible Tabs Plugin? The reason is, I used his plugin in a project and it really does a great job! But there's one thing it doesn't cover. The Accessible-Tabs Plugin can not generate tabs, which are also able to behave like a dropdown, so that one can collapse a few tabs if there are too many of 'em.

The first thought was to take Accessible-Tabs and extend it for my needs and maybe sending a pull request on GitHub. Unfortunately it turned out, that the code isn't extendable at all. There's no way to get an instance of Accessible-Tabs or teaching the prototype new things. In addition to that, I found that the code is a bit outdated.

## The Goal

I've never written a jQuery Plugin before and I also never would, If I know that there's a plugin which fits to my needs. So **the goal of NeoTabs is to close this little gap** and provide a jQuery Plugin which is as accessible as Dirk Ginader's  Accessible-Tabs Plugin and is also extendable via lightweight extensions sitting on top of it.

**Attention:**
The current version **does not** support all of Accesssible-Tabs features. This includes:

- SyncHeights
- Info texts (known as 'currentInfoText')
- SaveState (Using Cookies)
- Pagination
- Keyboard support

## Okay got it, where can I start?

Easy-peasy! Just checkout the [documentation](http://github.com/PascalPrecht/jquery.neotabs.js#documentation) or jump directly to the [Installation section](http://github.com/PascalPrecht/jquery.neotabs.js#installation) and run the [tests](http://github.com/PascalPrecht/jquery.neotabs.js#tests).

If you first want to see some examples, check [**them**](http://github.com/PascalPrecht/jquery.neotabs.js#examples) out!

#### One last thing: Why "NeoTabs"?**

'Cause they're new. yeap.

## Documentation

### Installation

To get started, just [download](http://github.com/PascalPrecht/jquery.neotabs.js/downloads) the code from GitHub or open your beautiful CLI to do some cloning with:

````
git clone http://github.com/PascalPrecht/jquery.neotabs.js.git
````

NeoTabs sits on top of jQuery, so please include jQuery first:

````
<!doctype html>
<html lang="en">
  <head>
    <meta charset=utf-8>
    <title>jQuery NeoTabs</title>
  </head>

  <body>

    <script src=path/to/jquery/source></script>
    <script src=path/to/jquery.neotabs.js></script>
  </body>
</html>
````

### Usage

NeoTabs is built to make progressively enhanced tabbed-content. Progressively enhanced means, you start by writing well-formed and semantic markup. So, this is how it should look like:

#### The Markup

````
<html lang="en">
  <head>
    <meta charset=utf-8>
    <title>jQuery NeoTabs</title>
  </head>

  <body>

    <div class=tabs>
      <div class=tabbody>
        <h4>Tabbody Heading</h4>

        <p>Lorem Ipsum</p>
      </div>

      <div class=tabbody>
        <h4>Tabbody Heading 2</h2>

        <p>Lorem Ipsum wakka wakka</p>
      </div>
    </div>

    <script src=path/to/jquery/source></script>
    <script src=path/to/jquery.neotabs.js></script>
  </body>
</html>
````

Easy hah? Now to make this beautiful valid HTML5 Markup behave like a tabbed-content, all you have to do is to call the NeoTabs plugin on it.

#### The JavaScript

````
<html lang="en">
  <head>
    <meta charset=utf-8>
    <title>jQuery NeoTabs</title>
  </head>

  <body>

    <div class=tabs>
      <div class=tabbody>
        <h4>Tabbody Heading</h4>

        <p>Lorem Ipsum</p>
      </div>

      <div class=tabbody>
        <h4>Tabbody Heading 2</h4>

        <p>Lorem Ipsum wakka wakka</p>
      </div>
    </div>

    <script src=path/to/jquery/source></script>
    <script src=path/to/jquery.neotabs.js></script>
    <script>
      $('.tabs').neoTabs();
    </script>
  </body>
</html>
````
Boom. That's all. NeoTabs generates a list from your heading elements and make them behave like tabs. But what if your markup differs from the code above? No problem mucho. NeoTabs is pretty flexible when it comes to [customization](http://github.com/PascalPrecht/jquery.neotabs.js#options).

### Generating dropdowns

NeoTabs also provides a pretty simple way to let you generate not only just tabs but also tabs which behave like dropdowns, which was the original goal behind NeoTabs. So, how can you tell NeoTabs to generate a dropdown tab from a set of tabs? Take a look at the following markup:

````
<html lang="en">
  <head>
    <meta charset=utf-8>
    <title>jQuery NeoTabs</title>
  </head>

  <body>

    <div class=tabs>
      <div class=tabbody>
        <h4>Tabbody Heading</h4>

        <p>Lorem Ipsum</p>
      </div>

      <div class=tabbody>
        <h4>Tabbody Heading 2</h4>

        <p>Lorem Ipsum wakka wakka</p>
      </div>

      <div class=tabbody>
        <h4 data-dropdown>Tabbody Heading 3</h4>

        <p>Lorem Ipsum wakka wakka</p>
      </div>

      <div class=tabbody>
        <h4>Tabbody Heading 4</h4>

        <p>Lorem Ipsum wakka wakka</p>
      </div>
    </div>

    <script src=path/to/jquery/source></script>
    <script src=path/to/jquery.neotabs.js></script>
    <script>
      $('.tabs').neoTabs();
    </script>
  </body>
</html>
````

Noticed the data attribute in the third heading element? Allright. Open your browser and take a look at the result. As you can see, NeoTabs automatically generated a dropdown tab from all tabs sitting behind the tab with the data-attribute. So you can easily say: "I want this tabs to be a dropdown and **this** included.". Just set the data attribute to one of your tabs.

### Options

NeoTabs provides a huge list of options to customize the generated markup. The list below shows'em all up with their default values and a short description:

````
$('.tabs').neoTabs({
  wrapperClass: 'content', // Classname of div to apply around the content
  activeClass: 'active', // Classname to apply to active tab
  tabHeadClass: 'tabhead', // Classname to apply to each generated tab
  tabBodyClass: 'tabbody', // Classname which describes the body of a tab content
  firstTabClass: 'first', // Classname to apply to the first tab of a tabs list
  lastTabClass: 'last', // Classname to apply to the last tab of a tabs list
  clearfixClass: 'group', // Class name for clearfix
  tabsListClass: 'tabs-list', // Classname to apply to a tabs list
  tabHeadElement: 'h4', // Selector which represents a tab
  tabsPosition: 'top', // Tabs-list position 'top' || 'bottom'
  cssClassAvailable: true, // Applying existing classes from tabHeadElement to tab
  fx: 'show', // Collapsing effect
  fxSpeed: 0, // Effect speed in milliseconds
  autoAnchor: true, // Making tabs linkable or not
  wrapInnerTabs: '', // Fragment for tab inner wrapping
  dropdownTabLabel: '&#x25BE;', // Dropdown tab label
  dropdownTabClass: 'dropdown', // Classname to apply to tab which represents a dropdown
  dropdownTabsListClass: 'tabs-list', // Classname to apply to tabs list within a dropdown
  dropdownTabsClearfixClass: 'group' // Clearfix for dropdown
});
````

### Examples

Here are a few examples. Play with'em!

* [Basic NeoTabs](http://github.com/PascalPrecht/jquery.neotabs.js/blob/master/examples/basic-neotabs.html)
* [NeoTabs with dropdown](http://github.com/PascalPrecht/jquery.neotabs.js/blob/master/examples/dropdown-neotabs.html)

### Tests

This is the first time I want to try out [Vojta's](http://github.com/vojtajina) beautiful testrunner [Testacular.js](http://github.com/vojtajina/testacular). When downloading or cloning this project you can find a 'tests' folder should include all the tests.

**Attention:** There are currently no tests, I'll write'em as soon as possible. Also, if you want to add unit tests, feel free to fork and send me a pull request!

To run the tests, you have to install **Testacular**. It sits on top of Node.js and Socket.io. If you're familiar with [npm](http://npm.org), this should be no problem for you. Otherwise please checkout the installations instructions of Testacular to get it installed correctly.

After installing Testacular you can simple navigate to the project's tests folder via CLI:

````
$ cd path/to/jquery.neotabs.js/tests
````

And run:

````
$ testacular start
````

This should run all the test in the command line and opens up a browser. If there are any failing tests, feel free to fix them.

## License

This software is released under [MIT License](http://www.opensource.org/licenses/mit-license.php)
