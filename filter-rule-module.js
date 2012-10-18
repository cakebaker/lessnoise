var FilterRuleModule = function(parentElement, filter) {
  var moduleID = 'ln-filter-rule-module-' + createRandomID();
  var module = GM_getResourceText('filter-rule-module').replace('@@', moduleID);
  parentElement.append(module);

  NewFilterRuleForm(moduleID, filter);
  FilterRuleList(moduleID, filter);

  function createRandomID() {
    var randomValue = (Math.random()).toString();

    return randomValue.substring(2, 6);
  }
}
