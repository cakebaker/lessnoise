// ==UserScript==
// @name             LessNoise
// @version          0.0.6
// @namespace        https://github.com/cakebaker
// @description      LessNoise improves Twitter's UI by hiding sidebar elements, showing expanded URLs, and more
// @include          https://twitter.com/
// @include          https://twitter.com/#
// @require          lib/jquery-1.8.3.min.js
// @require          new-tweets-bar-clicker.js
// @require          timeline.js
// @require          url-expander.js
// @require          title-tweet-counter.js
// @require          tweet.js
// @require          tweet-filter-rule-menu.js
// @require          filter.js
// @require          filter-rules.js
// @require          filter-rule-module.js
// @require          new-filter-rule-form.js
// @require          filter-rule-list.js
// @require          filters/hashtag-filter.js
// @require          filters/mention-filter.js
// @require          filters/keyword-filter.js
// @require          highlighter.js
// @require          highlighters/current-user-highlighter.js
// @resource         css resources/lessnoise.css
// ==/UserScript==

$(document).ready(function() {
  GM_addStyle(GM_getResourceText('css'));
  var currentUser = $('div.js-mini-current-user').data('screen-name');

  NewTweetsBarClicker();

  var filter = Filter();
  Timeline(Highlighter(currentUser), filter);
  FilterRuleModule($('div.dashboard'), filter);
});
