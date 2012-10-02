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

  $('.stream-item').each(function() {
    LessNoise.expandUrlsOfTweet($(this));
  });

  LessNoise.setupObserver('.stream-container', LessNoise.clickNewTweetsBar, { childList: true });
  LessNoise.setupObserver('#stream-items-id', LessNoise.processTweets, { childList: true });
});

function LessNoise() {
}

LessNoise.clickNewTweetsBar = function() {
  $('.new-tweets-bar').click();
}

LessNoise.expandUrlsOfTweet = function(tweet) {
  $(tweet).find('.twitter-timeline-link').each(function() {
    var urlToExpand = $(this).data('expanded-url');
    if (urlToExpand !== undefined) {
      var linkElement = this;
      GM_xmlhttpRequest({
        url: urlToExpand,
        method: "HEAD",
        onload: function(response) { LessNoise.handleExpandedUrl(linkElement, response.finalUrl); }
      });
    }
  });
}

LessNoise.handleExpandedUrl = function(linkElement, expandedUrl) {
  $(linkElement).attr('href', expandedUrl);
  $(linkElement).find('.js-display-url').text(expandedUrl);
  $(linkElement).find('.tco-ellipsis').hide();
}

LessNoise.processTweets = function(mutations) {
  mutations.forEach(function(mutation) {
    if (mutation.addedNodes !== null) {
      for (var i = 0; i < mutation.addedNodes.length; i++) {
        LessNoise.expandUrlsOfTweet(mutation.addedNodes[i]);
      }
    }
  });
}

LessNoise.setupObserver = function(selector, fn, config) {
  var target = document.querySelector(selector);
  var observer = new MutationObserver(fn);
  observer.observe(target, config);
}
