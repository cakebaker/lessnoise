// ==UserScript==
// @name             LessNoise
// @version          0.0.3
// @namespace        https://github.com/cakebaker
// @description      LessNoise improves Twitter's UI by hiding sidebar elements, showing expanded URLs, and more
// @include          https://twitter.com/
// @include          https://twitter.com/#
// @require          http://code.jquery.com/jquery-1.8.2.min.js
// @require          filtermodule.js
// @require          filterstorage.js
// @require          filterengine.js
// @require          tweet.js
// @require          new-tweets-bar-clicker.js
// @require          timeline.js
// @resource         css lessnoise.css
// @resource         filtermodule filtermodule.html
// ==/UserScript==

$(document).ready(function() {
  GM_addStyle(GM_getResourceText('css'));

  NewTweetsBarClicker();
  var timeline = Timeline();
  var filterStorage = FilterStorage();
  var filterEngine = FilterEngine(filterStorage.getFilters());

  var filterUI = FilterModule($('.dashboard'), filterStorage.getFilters());
  filterUI.onAdd(filterStorage.add);
  filterUI.onAdd(filterEngine.add);
  filterUI.onRemove(filterStorage.remove);
  filterUI.onRemove(filterEngine.remove);
  timeline.onAdd(filterEngine.process);
});
