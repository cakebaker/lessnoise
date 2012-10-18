var MentionFilter = function(filterRulesStorage) {
  var FILTER_RULES_KEY = 'ln-mentions';
  var mentions;

  updateMentions();
  filterRulesStorage.onUpdate(FILTER_RULES_KEY, updateMentions);

  function accept(filterRule) {
    return (filterRule[0] === '@');
  }

  function filter(tweet) {
    return tweet.mentions.some(function(mention) {
      var wantedMention = '@' + mention.toLowerCase();
      return (mentions.indexOf(wantedMention) !== -1);
    });
  }

  function updateMentions() {
    mentions = filterRulesStorage.get(FILTER_RULES_KEY);
  }

  return {
    accept: accept,
    filter: filter,
    FILTER_RULES_KEY: FILTER_RULES_KEY
  }
}
