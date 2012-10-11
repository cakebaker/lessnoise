var Timeline = function() {
  var listeners = [];
  var filterListeners = [];
  var target = document.querySelector('div#stream-items-id');
  var observer = new MutationObserver(handleMutations);
  observer.observe(target, { childList: true });

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
        notifyListeners(mutation.addedNodes);
      }
    });
  }

  function handleFilter() {
    var filter = $(this).data('filter');
    $(this).parents('div.stream-item-footer').find('div.ln-filter-list-module').toggle();

    filterListeners.forEach(function(listener) {
      listener(filter);
    });

    return false;
  }

  function toggleFilterMenu() {
    $(this).parents('div.stream-item-footer').find('div.ln-filter-list-module').toggle();

    return false;
  }

  function notifyListeners(addedNodes) {
    var tweet;
    for (var i = 0; i < addedNodes.length; i++) {
      tweet = createTweet(addedNodes[i]);
      listeners.forEach(function(listener) { listener(tweet); });
    }
  }

  // Notice: a listener will not only receive an "Add" event for newly added tweets but also for all existing tweets in the timeline.
  function onAdd(listener) {
    var tweet;
    $('div.stream-item').each(function() {
      tweet = createTweet(this);
      listener(tweet);
    });

    listeners.push(listener);
  }

  function onFilter(listener) {
    filterListeners.push(listener);
  }

  return {
    onAdd: onAdd,
    onFilter: onFilter
  }
}
