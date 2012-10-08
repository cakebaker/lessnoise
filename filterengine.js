var FilterEngine = function(filtersArray) {
  var filters = filtersArray.slice(0);
  var currentUser = $('.js-mini-current-user').data('screen-name');
  var filterFns = filters.map(createFilterFn);

  function add(filter) {
    var filterFn = createFilterFn(filter);
    filters.push(filter);
    filterFns.push(filterFn);

    $('.stream-item').not('.ln-invisible').each(function() {
      process(Tweet($(this)));
    });
  }

  function remove(filter) {
    var index = filters.indexOf(filter);
    if (index !== -1) {
      filters.splice(index, 1);
      filterFns.splice(index, 1);

      $('.stream-item.ln-invisible').each(function() {
        var tweet = Tweet($(this));
        if (!filterMatches(tweet)) {
          tweet.unhide();
        }
      });
    }
  }

  function process(tweet) {
    if (isCurrentUserMentioned(tweet)) {
      tweet.highlight();
    } else if (filterMatches(tweet)) {
      tweet.hide();
    }
  }

  function createFilterFn(filter) {
    if (filter[0] === '#') {
      return function(tweet) {
        var wantedHashtag = filter.substring(1).toLowerCase();
        return tweet.hashtags.some(function(hashtag) {
          return (hashtag.toLowerCase() === wantedHashtag);
        });
      }
    } else if (filter[0] === '@') {
      return function(tweet) {
        var wantedMention = filter.substring(1).toLowerCase();
        return tweet.mentions.some(function(mention) {
          return (mention.toLowerCase() === wantedMention);
        });
      }
    } else {
      return function(tweet) {
        var regex = new RegExp(filter, 'i');
        return (tweet.text.search(regex) !== -1);
      }
    }
  }

  function filterMatches(tweet) {
    return filterFns.some(function(filterFn) {
      return filterFn(tweet);
    });
  }

  function isCurrentUserMentioned(tweet) {
    return tweet.mentions.some(function(mention) {
      return (mention.toLowerCase() === currentUser.toLowerCase());
    });
  }

  return {
    add: add,
    process: process,
    remove: remove
  }
}
