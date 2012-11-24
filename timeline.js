var Timeline = function(highlighter, filter) {
  filter.onAdd(filterTweetsWithSingleFilter);
  filter.onRemove(refilterFilteredTweets);

  $('div.stream-item').each(function() { processTweet(Tweet(this)) });

  // watching for new tweets
  (function() {
    var target = document.querySelector('div#stream-items-id');
    var observer = new MutationObserver(handleMutations);
    observer.observe(target, { childList: true });

    function handleMutations(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.addedNodes !== null) {
          handleNewTweets(mutation.addedNodes);
        }
      });
    }

    function handleNewTweets(addedNodes) {
      for (var i = 0; i < addedNodes.length; i++) {
        processTweet(Tweet(addedNodes[i]));
      }
    }
  })();

  function processTweet(tweet) {
    if (tweet.links().length > 0) {
      var expander = UrlExpander(tweet);
      expander.onAllUrlsExpanded(filterTweet);
    }
    TweetFilterRuleMenu(tweet, filter);
    highlightTweet(tweet);
    filterTweet(tweet);
  }

  function highlightTweet(tweet) {
    if (highlighter.highlight(tweet)) {
      tweet.highlight();
    }
  }

  function filterTweet(tweet) {
    if (!tweet.isHighlighted() && !tweet.isHidden()) {
      if (filter.filter(tweet)) {
        tweet.hide();
      }
    }
  }

  function filterTweetsWithSingleFilter(filterRule) {
    var filterFn = filter.getFilter(filterRule);

    $('div.stream-item').not('.ln-invisible').not('.ln-highlight').each(function() {
      var tweet = Tweet($(this));
      if (filterFn(tweet)) {
        tweet.hide();
      }
    });
  }

  function refilterFilteredTweets() {
    $('div.stream-item.ln-invisible').each(function() {
      var tweet = Tweet($(this));
      if (!filter.filter(tweet)) {
        tweet.unhide();
      }
    });
  }
}
