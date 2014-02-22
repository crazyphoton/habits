####Basics

We use Ionic Framework to build a cross platform app mainly targeted at iphone and android. We also spin it off into a web app that can be accessed from the laptop.
We should not need to access too much phone hardware, so this should be relatively simple.
iPhone app store certification is a pain in the ass, so it d probably make sense to use android for initial development and testing. And then make a iOS version once things settle down.

####Database Architecture
Intially, the data we store will be -
1. List of users
2. List of tasklists
3. List of tasks

In an sql db, these will ofcourse be tables, but in a document database, we are looking at each task being a document and belonging to a documents. Tasks could have API integration with lots of metadata attached to it, so they need their own document for easy access. Tasks may also be shared between task lists, and have other parameters (how many times a week, intensity etc.)

Given this, the structre of the app seems to lend itself more towards a sql type architecture, so MySql would be best.

####Starting point
We pick the example tasklist app provided with Ionic and build it from there. This document will be updated with design / architectural choices and decisions that we make
