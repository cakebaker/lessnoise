// ==UserScript==
// @name             LessNoise
// @version          0.0.2
// @namespace        https://github.com/cakebaker
// @description      LessNoise improves Twitter's UI by hiding sidebar elements, showing expanded URLs, and more
// @include          https://twitter.com/
// @require          http://code.jquery.com/jquery-1.8.2.min.js
// @require          filtermodule.js
// @resource         css lessnoise.css
// @resource         filtermodule filtermodule.html
// ==/UserScript==

$(document).ready(function() {
  GM_addStyle(GM_getResourceText('css'));

  var currentUser = $('.js-mini-current-user').data('screen-name');
  var streamItemProcessingFn = LessNoise.createStreamItemProcessingFn(currentUser);

  var filters = LessNoise.getFilters();
  var filterUI = FilterModule($('.dashboard'), filters.filters);
  filterUI.onAdd(LessNoise.addFilter);
  filterUI.onRemove(LessNoise.removeFilter);

  $('.stream-item').each(streamItemProcessingFn);

  LessNoise.setupObserver('.stream-container', LessNoise.clickNewTweetsBar, { childList: true });
  LessNoise.setupObserver('#stream-items-id', LessNoise.createMutationHandlerFn(streamItemProcessingFn), { childList: true });
});

LessNoise.getFilters = function() {
  var filters = $.parseJSON(localStorage.getItem('ln-filters')) || { 'filters': [] };

  return filters;
}

LessNoise.addFilter = function(filter) {
  var filters = LessNoise.getFilters();
  filters.filters.push(filter);
  localStorage.setItem('ln-filters', JSON.stringify(filters));
}

LessNoise.removeFilter = function(filter) {
  var filters = LessNoise.getFilters();
  var index = filters.filters.indexOf(filter);

  if (index != -1) {
    filters.filters.splice(index, 1);
    localStorage.setItem('ln-filters', JSON.stringify(filters));
  }
}

LessNoise.filterTweet = function(streamItem) {
  var text = $(streamItem).find('.js-tweet-text').text();
  var filters = LessNoise.getFilters();

  var result = filters.filters.some(function(filter) {
    return (text.indexOf(filter) !== -1);
  });

  if (result) {
    $(streamItem).addClass('ln-invisible');
  }
}

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

LessNoise.createStreamItemProcessingFn = function(userName) {
  return function(index, streamItem) {
    LessNoise.expandUrlsOfTweet($(streamItem));
    LessNoise.highlightMentionedUser($(streamItem), userName);
    LessNoise.filterTweet($(streamItem));
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

LessNoise.handleExpandedUrl = function(linkElement, expandedUrl) {
  $(linkElement).attr('href', expandedUrl);
  $(linkElement).find('.js-display-url').text(expandedUrl);
  $(linkElement).find('.tco-ellipsis').hide();
}

LessNoise.highlightMentionedUser = function(streamItem, userName) {
  var mentions = $(streamItem).find('.tweet').data('mentions');
  if (mentions !== undefined) {
    var mentionsArray = mentions.toLowerCase().split(' ');
    if (mentionsArray.indexOf(userName.toLowerCase()) != -1) {
      $(streamItem).addClass('ln-current-user-mentioned');
    }
  }
}

LessNoise.setupObserver = function(selector, fn, config) {
  var target = document.querySelector(selector);
  var observer = new MutationObserver(fn);
  observer.observe(target, config);
}
