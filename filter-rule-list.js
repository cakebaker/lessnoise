var FilterRuleList = function(moduleID, filter) {
  var MODULE = '#' + moduleID;
  var FILTER_RULE_LIST = 'ul.ln-filter-rule-list';
  var filterRuleTemplate = GM_getResourceText('single-filter-rule');

  filter.onAdd(function(filterRule) { add(filterRule, 'prepend'); });
  $(MODULE).find(FILTER_RULE_LIST).on('click', 'a', remove);

  filter.getFilterRules().forEach(function(filterRule) { add(filterRule, 'append'); });

  function add(filterRule, insertionFn) {
    var filterRuleListItem = filterRuleTemplate.replace(/@@/g, filterRule);
    $(MODULE).find(FILTER_RULE_LIST)[insertionFn](filterRuleListItem);
  }

  function remove() { 
    var removedFilterRule = $(this).data('filter-rule');
    filter.removeFilterRule(removedFilterRule);
    $(this).parent().remove();

    return false;
  }
}
