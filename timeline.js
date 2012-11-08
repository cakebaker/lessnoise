// TODO this object needs a refactoring!
var Timeline = function(highlighter, filter) {
  filter.onAdd(applySingleFilter);
  filter.onRemove(refilterFilteredTweets);

  initObserver();
  $('div.stream-item').each(filterTweet);

  function initObserver() {
    var target = document.querySelector('div#stream-items-id');
    var observer = new MutationObserver(handleMutations);
    observer.observe(target, { childList: true });
  }

  function filterTweet(index, streamItem) {
    var tweet = createTweet(streamItem);
    if (highlighter.highlight(tweet)) {
      tweet.highlight();
    } else {
      var result = filter.filter(tweet);
      if (result) {
        tweet.hide();
      }
    }
  }

  function applySingleFilter(filterRule) {
    var filterFn = filter.getFilter(filterRule);

    $('div.stream-item').not('.ln-invisible').not('.ln-highlight').each(function() {
      var tweet = Tweet($(this));
      var result = filterFn(tweet);
      if (result) {
        tweet.hide();
      }
    });
  }

  function refilterFilteredTweets() {
    $('div.stream-item.ln-invisible').each(function() {
      var tweet = Tweet($(this));
      var result = filter.filter(tweet);
      if (!result) {
        tweet.unhide();
      }
    });
  }

  function createTweet(streamItem) {
    var tweet = Tweet(streamItem);
    $(streamItem).find('ul.tweet-actions')
                 .prepend('<li class="ln-action-filter"><a title="Filter" href="#"><b>Filter</b></a></li>')
                 .find('li.ln-action-filter a')
                 .click(toggleFilterMenu);
    $(streamItem).find('div.stream-item-footer').append('<div class="ln-filter-list-module"><ul class="ln-filter-list"></ul></div>');
    $(streamItem).find('ul.ln-filter-list').append(createFilterList(tweet));
    $(streamItem).find('ul.ln-filter-list').on('click', 'a', handleFilter);
    return tweet;
  }

  function createFilterList(tweet) {
    var filterList = '';
    tweet.hashtags.forEach(function(hashtag) {
      filterList += '<li><a href="#" data-filter="#' + hashtag + '">#' + hashtag + '</a></li>';
    });
    tweet.mentions.forEach(function(mention) {
      filterList += '<li><a href="#" data-filter="@' + mention + '">@' + mention + '</a></li>';
    });

    return filterList;
  }

  function handleMutations(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.addedNodes !== null) {
        handleNewTweets(mutation.addedNodes);
      }
    });
  }

  function handleFilter() {
    var newFilter = $(this).data('filter');
    $(this).parents('div.stream-item-footer').find('div.ln-filter-list-module').toggle();

    filter.addFilterRule(newFilter);

    return false;
  }

  function toggleFilterMenu() {
    $(this).parents('div.stream-item-footer').find('div.ln-filter-list-module').toggle();

    return false;
  }

  function handleNewTweets(addedNodes) {
    for (var i = 0; i < addedNodes.length; i++) {
      filterTweet(i, addedNodes[i]);
    }
  }
}
