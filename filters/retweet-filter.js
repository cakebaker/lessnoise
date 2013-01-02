var RetweetFilter = function(filterRulesStorage) {
  var FILTER_RULES_KEY = 'ln-retweets';
  var blockedRetweeters;

  updateBlockedRetweeters();
  filterRulesStorage.onUpdate(FILTER_RULES_KEY, updateBlockedRetweeters);

  function accept(filterRule) {
    return /^retweets from @.+/.test(filterRule);
  }

  function filter(tweet) {
    if (!tweet.isRetweet()) {
      return false;
    }

    return (blockedRetweeters.indexOf(tweet.author().toLowerCase()) > -1);
  }

  function updateBlockedRetweeters() {
    blockedRetweeters = filterRulesStorage.get(FILTER_RULES_KEY).map(function(filterRule) {
      return filterRule.substring('retweets from @'.length);
    });
  }

  return {
    accept: accept,
    filter: filter,
    FILTER_RULES_KEY: FILTER_RULES_KEY
  }
}
