var AuthorFilter = function(filterRulesStorage) {
  var FILTER_RULES_KEY = 'ln-authors';
  var blockedAuthors;

  updateBlockedAuthors();
  filterRulesStorage.onUpdate(FILTER_RULES_KEY, updateBlockedAuthors);

  function accept(filterRule) {
    return /^block @.+/.test(filterRule);
  }

  function filter(tweet) {
    return (blockedAuthors.indexOf(tweet.author().toLowerCase()) > -1);
  }

  function updateBlockedAuthors() {
    blockedAuthors = filterRulesStorage.get(FILTER_RULES_KEY).map(function(filterRule) {
      return filterRule.substring('block @'.length);
    });
  }

  return {
    accept: accept,
    filter: filter,
    FILTER_RULES_KEY: FILTER_RULES_KEY
  }
}
