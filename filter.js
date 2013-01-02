var Filter = function() {
  var filterRules = FilterRules();
  var filters = [HashtagFilter(filterRules),
                 MentionFilter(filterRules),
                 ForeignCharactersFilter(filterRules),
                 AuthorFilter(filterRules),
                 RetweetFilter(filterRules),
                 KeywordFilter(filterRules)]; // KeywordFilter must be the last filter in the array as it accepts all filter rules

  function addFilterRule(filterRule) {
    var key = getFilterRulesKey(filterRule);
    filterRules.add(key, filterRule.toLowerCase());
  }

  function removeFilterRule(filterRule) {
    var key = getFilterRulesKey(filterRule);
    filterRules.remove(key, filterRule);
  }

  function getFilterRulesKey(filterRule) {
    for (var i = 0; i < filters.length; i++) {
      if (filters[i].accept(filterRule)) {
        return filters[i].FILTER_RULES_KEY;
      }
    }
  }

  function filter(tweet) {
    return filters.some(function(filterObj) {
      return filterObj.filter(tweet);
    });
  }

  function getFilter(filterRule) {
    for (var i = 0; i < filters.length; i++) {
      if (filters[i].accept(filterRule)) {
        return filters[i].filter;
      }
    }
  }

  function getFilterRules() {
    return filters.reduce(function(rules, filter) {
      return rules.concat(filterRules.get(filter.FILTER_RULES_KEY));
    }, []);
  }

  return {
    addFilterRule: addFilterRule,
    removeFilterRule: removeFilterRule,
    getFilterRules: getFilterRules,
    getFilter: getFilter,
    filter: filter,
    onAdd: filterRules.onAdd,
    onRemove: filterRules.onRemove
  }
}
