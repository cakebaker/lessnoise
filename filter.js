var Filter = function() {
  var filterRules = FilterRules();
  var filters = [HashtagFilter(filterRules), MentionFilter(filterRules), KeywordFilter(filterRules)];

  function addFilterRule(filterRule) {
    var key;
    for (var i = 0; i < filters.length; i++) {
      if (filters[i].accept(filterRule)) {
        key = filters[i].FILTER_RULES_KEY;
        break;
      }
    }
    filterRules.add(key, filterRule.toLowerCase());
  }

  function removeFilterRule(filterRule) {
    var key;
    for (var i = 0; i < filters.length; i++) {
      if (filters[i].accept(filterRule)) {
        key = filters[i].FILTER_RULES_KEY;
        break;
      }
    }
    filterRules.remove(key, filterRule);
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
