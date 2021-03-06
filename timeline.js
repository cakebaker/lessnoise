var Timeline = function(highlighter, filter) {
  var tweetCounter = TitleTweetCounter();
  filter.onAdd(filterTweetsWithSingleFilter);
  filter.onRemove(refilterFilteredTweets);

  $('.js-stream-item[data-item-type="tweet"]').each(function() { processTweet(Tweet(this)) });

  // watching for new tweets
  (function() {
    // ol#stream-items-id:  used on "/" and "/i/notifications"
    // .GridTimeline-items: used on "/<username>"
    var target = document.querySelector('ol#stream-items-id') || document.querySelector('.GridTimeline-items');
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
        if ($(addedNodes[i]).find('.js-stream-item').length == 0) {
          // process tweet from "/" or "/i/notifications"
          processTweet(Tweet(addedNodes[i]));
        } else {
          // process tweet from "/<username>"
          processTweet(Tweet($(addedNodes[i]).find('.js-stream-item')));
        }
      }
    }
  })();

  function processTweet(tweet) {
    var filterFn = (tweet.hasLinks()) ? filterTweet : filterAndCountTweet;

    TweetFilterRuleMenu(tweet, filter);
    highlightTweet(tweet);
    filterFn(tweet);

    if (tweet.hasLinks()) {
      var expander = UrlExpander(tweet);
      expander.onAllUrlsExpanded(filterAndCountTweet);
    }
  }

  function highlightTweet(tweet) {
    if (highlighter.highlight(tweet)) {
      tweet.highlight();
    }
  }

  function filterAndCountTweet(tweet) {
    filterTweet(tweet);

    if (!tweet.isHidden()) {
      tweetCounter.inc();
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

    $('.js-stream-item').not('.ln-invisible').not('.ln-highlight').each(function() {
      var tweet = Tweet($(this));
      if (filterFn(tweet)) {
        tweet.hide();
      }
    });
  }

  function refilterFilteredTweets() {
    $('.js-stream-item.ln-invisible').each(function() {
      var tweet = Tweet($(this));
      if (!filter.filter(tweet)) {
        tweet.unhide();
      }
    });
  }
}
