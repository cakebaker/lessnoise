// ==UserScript==
// @name             LessNoise
// @version          0.0.2
// @namespace        https://github.com/cakebaker
// @description      LessNoise improves Twitter's UI by hiding sidebar elements, showing expanded URLs, and more
// @include          https://twitter.com/
// @require          http://code.jquery.com/jquery-1.8.2.min.js
// @require          filtermodule.js
// @require          filterstorage.js
// @require          tweet.js
// @resource         css lessnoise.css
// @resource         filtermodule filtermodule.html
// ==/UserScript==

$(document).ready(function() {
  GM_addStyle(GM_getResourceText('css'));

  var currentUser = $('.js-mini-current-user').data('screen-name');
  var filterStorage = FilterStorage();
  var streamItemProcessingFn = LessNoise.createStreamItemProcessingFn(currentUser, filterStorage.getFilters);

  var filterUI = FilterModule($('.dashboard'), filterStorage.getFilters());
  filterUI.onAdd(filterStorage.add);
  filterUI.onRemove(filterStorage.remove);

  $('.stream-item').each(streamItemProcessingFn);

  LessNoise.setupObserver('.stream-container', LessNoise.clickNewTweetsBar, { childList: true });
  LessNoise.setupObserver('#stream-items-id', LessNoise.createMutationHandlerFn(streamItemProcessingFn), { childList: true });
});

function LessNoise() {
}

LessNoise.clickNewTweetsBar = function() {
  $('.new-tweets-bar').click();
}

LessNoise.createMutationHandlerFn = function(streamItemProcessingFn) {
  return function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.addedNodes !== null) {
        for (var i = 0; i < mutation.addedNodes.length; i++) {
          streamItemProcessingFn(i, mutation.addedNodes[i]);
        }
      }
    });
  }
}

LessNoise.createStreamItemProcessingFn = function(username, getFiltersFn) {
  return function(index, streamItem) {
    var tweet = Tweet(streamItem);
    LessNoise.expandUrlsOfTweet($(streamItem)); // TODO should also use the tweet object
    LessNoise.highlightMentionedUser(tweet, username);
    LessNoise.filterTweet(tweet, getFiltersFn);
  }
}

LessNoise.expandUrlsOfTweet = function(streamItem) {
  $(streamItem).find('.twitter-timeline-link').each(function() {
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

LessNoise.filterTweet = function(tweet, getFiltersFn) {
  var filters = getFiltersFn();
  var result = filters.some(function(filter) {
    var regex = new RegExp(filter, 'i');
    return (tweet.text.search(regex) !== -1);
  });

  if (result) {
    tweet.hide();
  }
}

LessNoise.handleExpandedUrl = function(linkElement, expandedUrl) {
  $(linkElement).attr('href', expandedUrl);
  $(linkElement).find('.js-display-url').text(expandedUrl);
  $(linkElement).find('.tco-ellipsis').hide();
}

LessNoise.highlightMentionedUser = function(tweet, username) {
  var isUserMentioned = tweet.mentions.some(function(mention) {
    return (mention.toLowerCase() === username.toLowerCase());
  });

  if (isUserMentioned) {
    tweet.highlight();
  }
}

LessNoise.setupObserver = function(selector, fn, config) {
  var target = document.querySelector(selector);
  var observer = new MutationObserver(fn);
  observer.observe(target, config);
}
