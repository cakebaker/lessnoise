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

  LessNoise.expandUrls();

  LessNoise.setupObserver('.stream-container', LessNoise.clickNewTweets, { childList: true });
  LessNoise.setupObserver('#stream-items-id', LessNoise.expandUrls, { childList: true });
});

function LessNoise() {
}

LessNoise.clickNewTweets = function() {
  $('.new-tweets-bar').click();
}

LessNoise.expandUrls = function() {
  $('.twitter-timeline-link').not('.ln-expanded').each(function() {
    var urlToExpand = $(this).data('expanded-url');
    if (urlToExpand !== undefined) {
      var that = this;
      GM_xmlhttpRequest({
        url: urlToExpand,
        method: "HEAD",
        onload: function(response) { LessNoise.handleExpandedUrl(that, response.finalUrl); }
      });
    }
  });
}

LessNoise.handleExpandedUrl = function(that, expandedUrl) {
  $(that).attr('href', expandedUrl);
  $(that).find('.js-display-url').text(expandedUrl);
  $(that).find('.tco-ellipsis').hide();
  $(that).addClass('ln-expanded');
}

LessNoise.setupObserver = function(selector, fn, config) {
  var target = document.querySelector(selector);
  var observer = new MutationObserver(fn);
  observer.observe(target, config);
}
