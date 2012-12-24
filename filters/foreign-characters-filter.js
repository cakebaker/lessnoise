var ForeignCharactersFilter = function(filterRulesStorage) {
  var FILTER_RULES_KEY = 'ln-foreign-characters';
  var characterRanges = {
    'japanese characters': '\u3040-\u309F', // Hiragana
    'chinese characters': '\u4E00-\u9FCC\u3400-\u4DB5' // http://stackoverflow.com/questions/1366068/whats-the-complete-range-for-chinese-characters-in-unicode
  }
  var regex;

  constructRegex();
  filterRulesStorage.onUpdate(FILTER_RULES_KEY, constructRegex);

  function accept(filterRule) {
    return /^(japanese|chinese) characters$/.test(filterRule);
  }

  function filter(tweet) {
    if (regex === '') {
      return false;
    }

    return (new RegExp(regex)).test(tweet.text());
  }

  function constructRegex() {
    var filterRules = filterRulesStorage.get(FILTER_RULES_KEY);
    regex = '';

    for (var key in characterRanges) {
      if (filterRules.indexOf(key) > -1) {
        regex += characterRanges[key];
      }
    }

    if (regex !== '') {
      regex = '[' + regex + ']+';
    }
  }

  return {
    accept: accept,
    filter: filter,
    FILTER_RULES_KEY: FILTER_RULES_KEY
  }
}
