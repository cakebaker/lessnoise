var HashtagFilter = function(filterRulesStorage) {
  var FILTER_RULES_KEY = 'ln-hashtags';
  var hashtags;

  updateHashtags();
  filterRulesStorage.onUpdate(FILTER_RULES_KEY, updateHashtags);

  function accept(filterRule) {
    return (filterRule[0] === '#');
  }

  function filter(tweet) {
    return tweet.hashtags.some(function(hashtag) {
      var wantedHashtag = '#' + hashtag.toLowerCase();
      return (hashtags.indexOf(wantedHashtag) !== -1);
    });
  }

  function updateHashtags() {
    hashtags = filterRulesStorage.get(FILTER_RULES_KEY);
  }

  return {
    accept: accept,
    filter: filter,
    FILTER_RULES_KEY: FILTER_RULES_KEY
  }
}
