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

Easy-peasy! Just checkout the [documentation](http://github.com/PascalPrecht/jquery.neotabs.js#documentation) or jump directly to the [Installation section](http://github.com/PascalPrecht/jquery.neotabs.js#installation).  

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
Boom. That's all. NeoTabs generates a list from your heading elements and make them behave like tabs. But what if my markup differs from the code above? No problem mucho. NeoTabs is pretty flexible when it comes to customization.

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

## License

This software is released under [MIT License](http://www.opensource.org/licenses/mit-license.php)
