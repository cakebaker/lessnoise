// ==UserScript==
// @name             LessNoise
// @version          0.0.3
// @namespace        https://github.com/cakebaker
// @description      LessNoise improves Twitter's UI by hiding sidebar elements, showing expanded URLs, and more
// @include          https://twitter.com/
// @require          http://code.jquery.com/jquery-1.8.2.min.js
// @require          filtermodule.js
// @require          filterstorage.js
// @require          filterengine.js
// @require          tweet.js
// @require          streamwatcher.js
// @resource         css lessnoise.css
// @resource         filtermodule filtermodule.html
// ==/UserScript==

$(document).ready(function() {
  GM_addStyle(GM_getResourceText('css'));

  var streamWatcher = StreamWatcher();
  var filterStorage = FilterStorage();
  var filterEngine = FilterEngine(filterStorage.getFilters());

  var filterUI = FilterModule($('.dashboard'), filterStorage.getFilters());
  filterUI.onAdd(filterStorage.add);
  filterUI.onAdd(filterEngine.add);
  filterUI.onRemove(filterStorage.remove);
  filterUI.onRemove(filterEngine.remove);
  streamWatcher.onAdd(filterEngine.process);

  $('.stream-item').each(function() {
    filterEngine.process(Tweet($(this)));
  });

  LessNoise.setupObserver('.stream-container', LessNoise.clickNewTweetsBar, { childList: true });
  LessNoise.setupObserver('#stream-items-id', streamWatcher.watch, { childList: true });
});

function LessNoise() {
}

LessNoise.clickNewTweetsBar = function() {
  $('.new-tweets-bar').click();
}

LessNoise.setupObserver = function(selector, fn, config) {
  var target = document.querySelector(selector);
  var observer = new MutationObserver(fn);
  observer.observe(target, config);
}
