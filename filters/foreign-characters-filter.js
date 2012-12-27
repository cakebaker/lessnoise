var ForeignCharactersFilter = function(filterRulesStorage) {
  var FILTER_RULES_KEY = 'ln-foreign-characters';
  var characterSets;

  updateCharacterSets();
  filterRulesStorage.onUpdate(FILTER_RULES_KEY, updateCharacterSets);

  function accept(filterRule) {
    return /^(japanese|chinese) characters$/.test(filterRule);
  }

  function filter(tweet) {
    var characterSet = tweet.characterSet();

    if (characterSet === undefined) {
      return false;
    }

    return (characterSets.indexOf(characterSet) > -1);
  }

  function updateCharacterSets() {
    var filterRules = filterRulesStorage.get(FILTER_RULES_KEY);

    characterSets = filterRules.map(function(filterRule) {
      return filterRule.replace(' characters', '');
    });
  }

  return {
    accept: accept,
    filter: filter,
    FILTER_RULES_KEY: FILTER_RULES_KEY
  }
}
