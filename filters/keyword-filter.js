var KeywordFilter = function(filterRulesStorage) {
  var FILTER_RULES_KEY = 'ln-keywords';
  var keywords;

  updateKeywords();
  filterRulesStorage.onUpdate(FILTER_RULES_KEY, updateKeywords);

  function accept(filterRule) {
    return true;
  }

  function filter(tweet) {
    return keywords.some(function(keyword) {
      var regex = new RegExp(keyword, 'i');
      return (tweet.text().search(regex) !== -1);
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
