// ==UserScript==
// @name             LessNoise
// @version          0.0.1
// @namespace        https://github.com/cakebaker
// @description      LessNoise improves Twitter's UI by hiding sidebar elements, showing expanded URLs, and more
// @include          https://twitter.com/
// @require          http://code.jquery.com/jquery-1.8.2.min.js
// @resource         css lessnoise.css
// ==/UserScript==

$(document).ready(function() {
  GM_addStyle(GM_getResourceText('css'));

  LessNoise.expandURLs();

  LessNoise.setupObserver('.stream-container', LessNoise.clickNewTweets, { childList: true });
  LessNoise.setupObserver('#stream-items-id', LessNoise.expandURLs, { childList: true });
});

function LessNoise() {
}

LessNoise.clickNewTweets = function() {
  $('.new-tweets-bar').click();
}

LessNoise.expandURLs = function() {
  // TODO make HEAD request to get the final url
  $('.twitter-timeline-link').each(function() {
    var expandedURL = $(this).data('expanded-url');
    $(this).attr('href', expandedURL);
    $(this).find('.js-display-url').text(expandedURL);
    $(this).find('.tco-ellipsis').hide();
  });
}

LessNoise.setupObserver = function(selector, fn, config) {
  var target = document.querySelector(selector);
  var observer = new MutationObserver(fn);
  observer.observe(target, config);
}
