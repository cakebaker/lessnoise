var KeywordFilter = function(filterRulesStorage) {
  var FILTER_RULES_KEY = 'ln-keywords';
  var keywords;

  updateKeywords();
  filterRulesStorage.onUpdate(FILTER_RULES_KEY, updateKeywords);

  function accept(filterRule) {
    return true;
  }

  function filter(tweet) {
    var text = tweet.text().toLowerCase();
    return keywords.some(function(keyword) {
      return (text.indexOf(keyword) !== -1);
    });
  }

  function updateKeywords() {
    keywords = filterRulesStorage.get(FILTER_RULES_KEY);
  }

  return {
    accept: accept,
    filter: filter,
    FILTER_RULES_KEY: FILTER_RULES_KEY
  }
}
