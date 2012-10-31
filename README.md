# jQuery NeoTabs

A flexible jQuery plugin for generating accessible tabs inspired by 
[Dirk Ginader's Accessible-Tabs](http://github.com/ginader/Accessible-Tabs)

## What? Another jQuery Plugin for Accessible Tabs?

Yes. But it's not just another jQuery Plugin for accessible tabs. This plugin solves a problem, which isn't solved by any plugin I found in the interwebs (This is the moment you should ping me, if you know a plugin which **does** solve the problem, which is explained below). 

## Why NeoTabs?
So why did I spend the time to revamp Dirk's code from his Accessible Tabs Plugin? The reason is, I used his plugin in a project and it really does a great job! But there's one thing it doesn't cover. The Accessible-Tabs Plugin can not generate tabs, which are also able to behave like a dropdown, so that one can collapse a few tabs if there are too many of 'em.

The first thought was to take Accessible-Tabs and extend it for my needs and maybe sending a pull request on GitHub. Unfortunately it turned out, that the code isn't extendable at all. There's no way to get an instance of Accessible-Tabs or teaching the prototype new things. In addition to that, I found that the code is a bit outdated. 

## The Goal

I've never written a jQuery Plugin before and I also never would, If I know that there's a plugin which fits to my needs. So **the goal of NeoTabs is to close this little gap** and provide a jQuery Plugin which is as accessible as Dirk Ginader's  Accessible-Tabs Plugin and is also extendable via lightweight extensions sitting on top of it.

## Okay, got it! Gimme the Code!

Fo sho! Just jump to the [documentation](http://github.com/PascalPrecht/jquery.neotabs.js#Documentation)!

#### One last thing: Why "NeoTabs"?** 

'Cause they're new. yeap.

## License

This software is released under [MIT License](http://www.opensource.org/licenses/mit-license.php)
