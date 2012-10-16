var FilterRuleModule = function(parentElement, filterRules) {
  var moduleID = 'ln-filter-rule-module-' + createRandomID();
  var module = GM_getResourceText('filter-rule-module').replace('@@', moduleID);
  parentElement.append(module);

  var newFilterRuleForm = NewFilterRuleForm(moduleID);
  var filterRuleList = FilterRuleList(moduleID, filterRules);
  newFilterRuleForm.onSubmit(filterRuleList.add);

  function createRandomID() {
    var randomValue = (Math.random()).toString();

    return randomValue.substring(2, 6);
  }

  return {
    addToList: filterRuleList.add,
    onFilterRuleAdded: newFilterRuleForm.onSubmit,
    onFilterRuleRemoved: filterRuleList.onRemove
  }
}
