# LessNoise

## Purpose

LessNoise is a [Greasemonkey](http://www.greasespot.net/) application to filter Twitter's timeline. It also improves some parts of Twitter's web UI, it does:

* hide the "Who to follow" box
* hide the trends box
* hide the sidebar footer
* automatically click on the "x new tweets" bar
* bypass the t.co URL shortener
* show expanded URLs
* highlight tweets that mention the logged-in user

## Requirements

* [Firefox](http://www.mozilla.org/en-US/firefox/new/) with the [Greasemonkey](http://www.greasespot.net/) add-on installed (check Tools/Add-ons to see whether Greasemonkey is installed)
* or [Chrome](http://www.chromium.org/)

## Installation

### Firefox

* Install LessNoise by visiting [https://github.com/cakebaker/lessnoise/raw/master/lessnoise.user.js](https://github.com/cakebaker/lessnoise/raw/master/lessnoise.user.js).
* You can also download the latest release from [https://github.com/cakebaker/lessnoise/tags](https://github.com/cakebaker/lessnoise/tags), unpack it, and install it by calling file:///path-to-where-you-have-unpacked-lessnoise/lessnoise.user.js in your browser

### Chrome

* Download the following file: [http://code.42dh.com/lessnoise/lessnoise.crx](http://code.42dh.com/lessnoise/lessnoise.crx)
* Open Chrome's extensions tab (Tools/Extensions)
* Drag and drop the downloaded file to the extensions tab

## Filters

LessNoise currently provides six ways to filter out unwanted tweets:

* `#example` filters out all tweets tagged with "example"
* `@example` filters out all tweets mentioning the user "example"
* `example` filters out all tweets containing the text "example"
* `block @example` filters out all tweets from the user "example"
* `retweets from @example` filters out all retweets from the user "example"
* `chinese characters` and `japanese characters` filter out all tweets containing Chinese or Japanese characters, respectively

You can add the filters manually via the filter form, or you can select a filter from the Filter menu that's available below each tweet.

## Changelog

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

LessNoise is licensed under the MIT license.
