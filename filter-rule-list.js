var FilterRuleList = function(moduleID, filter) {
  var MODULE = '#' + moduleID;
  var FILTER_RULE_LIST = 'div.ln-filter-rule-list';
  var filterRuleTemplate = GM_getResourceText('single-filter-rule');

  filter.onAdd(add);
  $(MODULE).find(FILTER_RULE_LIST).on('click', 'a', remove);

  filter.getFilterRules().forEach(add);

  function add(filterRule) {
    var filterRuleListItem = filterRuleTemplate.replace(/@@/g, filterRule);
    $(MODULE).find(FILTER_RULE_LIST).append(filterRuleListItem);
  }

  function remove() { 
    var removedFilterRule = $(this).data('filter-rule');
    filter.removeFilterRule(removedFilterRule);
    $(this).parent().remove();

    return false;
  }
}
