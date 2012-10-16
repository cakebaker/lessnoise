var FilterRuleList = function(moduleID, filterRules) {
  var MODULE = '#' + moduleID;
  var FILTER_RULE_LIST = 'div.ln-filter-rule-list';
  var listeners = [];
  var filterRuleTemplate = GM_getResourceText('single-filter-rule');

  $(MODULE).find(FILTER_RULE_LIST).on('click', 'a', remove);
  filterRules.forEach(add);

  function add(filterRule) {
    var filterRuleListItem = filterRuleTemplate.replace(/@@/g, filterRule);
    $(MODULE).find(FILTER_RULE_LIST).append(filterRuleListItem);
  }

  function remove() { 
    var removedFilterRule = $(this).data('filter-rule');
    $(this).parent().remove();

    notifyListeners(removedFilterRule);

    return false;
  }

  function notifyListeners(removedFilterRule) {
    listeners.forEach(function(listener) { 
      listener(removedFilterRule); 
    });
  }

  function onRemove(listener) {
    listeners.push(listener);
  }

  return {
    add: add,
    onRemove: onRemove
  }
}
