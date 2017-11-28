# Lessnoise

## Purpose

Lessnoise is a web extension to filter Twitter's timeline. It also improves some parts of Twitter's web UI, it does:

* hide the "Who to follow" box
* hide the trends box
* hide the sidebar footer
* hide promoted tweets
* expand URLs

## Requirements

* [Firefox](https://www.mozilla.org/en-US/firefox/new/)

## Installation

* You can install lessnoise via the Firefox Add-ons site: [https://addons.mozilla.org/en-US/firefox/addon/lessnoise/](https://addons.mozilla.org/en-US/firefox/addon/lessnoise/).

## Configuration

In the preferences you can specify which elements ("Who to follow", trends, and sidebar footer) of Twitter's web UI are shown. By default, all elements are hidden.

## Filters

Lessnoise currently provides six ways to filter out unwanted tweets:

* `#example` filters out all tweets tagged with "example"
* `@example` filters out all tweets mentioning the user "example"
* `example` filters out all tweets containing the text "example"
* `block @example` filters out all tweets from the user "example"
* `retweets from @example` filters out all retweets from the user "example"
* `arabic characters`, `chinese characters` and `japanese characters` filter out all tweets containing Arabic, Chinese or Japanese characters, respectively

You can add the filters manually via the filter form, or you can select a filter from the Filter menu that's available below each tweet.

## Changelog

### v0.1.1 (2017-11-28)

* Allowing configuration of which UI elements ("Who to follow", trends, sidebar footer) are visible

### v0.1.0 (2017-11-13)

* Turning lessnoise into a web extension
* Removing dependency on Greasemonkey

### v0.0.10 (2014-12-20)

* Adding filter to filter out tweets containing Arabic characters
* Dropping support for Chrome

### v0.0.9 (2013-01-11)

* Adapting to changes on twitter.com
* Bugfix: Fixing problem with some text filters like '?' or '(example'

### v0.0.8 (2013-01-05)

* Adding filter to filter out all tweets of a user
* Adding filter to filter out all retweets of a user
* Adding filter to filter out tweets containing Chinese or Japanese characters

### v0.0.7 (2012-12-15)

* Support for Chrome

### v0.0.6 (2012-12-06)

* Hiding filter list by default
* Showing the number of new tweets in the title if the window is not focused
* Bugfix: Fixing type error if a tweet contains a "@" followed by a number

### v0.0.5 (2012-11-13)

* Showing urls mentioned in tweets in the filter menu
* Cleaning up querystring of expanded urls (i.e. removing params with keys "utm_source", "utm_content", "utm_medium", or "utm_campaign")

### v0.0.4 (2012-11-10)

* Ordering filters alphabetically
* Bugfix: Filtering expanded urls

### v0.0.3 (2012-10-19)

* Adding filter link to each tweet

### v0.0.2 (2012-10-08)

* Adding filter functionality

### v0.0.1 (2012-10-03)

* Initial release

## Contact

Feel free to contact me via Twitter ([@dhofstet](https://twitter.com/dhofstet)) or by email (daniel.hofstetter@42dh.com) if you have any questions or feedback.

## License

Lessnoise is licensed under the MIT license.
