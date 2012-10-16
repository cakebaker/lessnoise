// ==UserScript==
// @name             LessNoise
// @version          0.0.3
// @namespace        https://github.com/cakebaker
// @description      LessNoise improves Twitter's UI by hiding sidebar elements, showing expanded URLs, and more
// @include          https://twitter.com/
// @include          https://twitter.com/#
// @require          http://code.jquery.com/jquery-1.8.2.min.js
// @require          filterstorage.js
// @require          filterengine.js
// @require          tweet.js
// @require          new-tweets-bar-clicker.js
// @require          timeline.js
// @require          filter-rule-module.js
// @require          new-filter-rule-form.js
// @require          filter-rule-list.js
// @resource         css resources/lessnoise.css
// @resource         filter-rule-module resources/filter-rule-module.html
// @resource         single-filter-rule resources/single-filter-rule.html
// ==/UserScript==

$(document).ready(function() {
  GM_addStyle(GM_getResourceText('css'));

  NewTweetsBarClicker();
  var timeline = Timeline();
  var filterStorage = FilterStorage('ln-filters');
  var filterEngine = FilterEngine(filterStorage.getFilterRules());

  var filterRuleModule = FilterRuleModule($('.dashboard'), filterStorage.getFilterRules());
  filterRuleModule.onFilterRuleAdded(filterStorage.add);
  filterRuleModule.onFilterRuleAdded(filterEngine.add);
  filterRuleModule.onFilterRuleRemoved(filterStorage.remove);
  filterRuleModule.onFilterRuleRemoved(filterEngine.remove);
  timeline.onTweetAdded(filterEngine.process);
  timeline.onFilterRuleSelected(filterStorage.add);
  timeline.onFilterRuleSelected(filterEngine.add);
  timeline.onFilterRuleSelected(filterRuleModule.addToList);
});
