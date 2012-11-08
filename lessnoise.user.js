// ==UserScript==
// @name             LessNoise
// @version          0.0.3
// @namespace        https://github.com/cakebaker
// @description      LessNoise improves Twitter's UI by hiding sidebar elements, showing expanded URLs, and more
// @include          https://twitter.com/
// @include          https://twitter.com/#
// @require          http://code.jquery.com/jquery-1.8.2.min.js
// @require          new-tweets-bar-clicker.js
// @require          timeline.js
// @require          tweet.js
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
// @resource         filter-rule-module resources/filter-rule-module.html
// @resource         single-filter-rule resources/single-filter-rule.html
// ==/UserScript==

$(document).ready(function() {
  GM_addStyle(GM_getResourceText('css'));
  var currentUser = $('div.js-mini-current-user').data('screen-name');

  NewTweetsBarClicker();

  var filter = Filter();

  // TODO: remove this migration script in v0.0.4
  var oldFilterRules = JSON.parse(localStorage.getItem('ln-filters')) || [];
  if (oldFilterRules !== []) {
    oldFilterRules.forEach(function(oldRule) {
      filter.addFilterRule(oldRule);
    });
    localStorage.removeItem('ln-filters');
  }

  Timeline(Highlighter(currentUser), filter);
  FilterRuleModule($('div.dashboard'), filter);
});
