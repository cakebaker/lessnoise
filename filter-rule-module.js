var FilterRuleModule = function(parentElement, filter) {
  var moduleID = 'ln-filter-rule-module-' + createRandomID();

  parentElement.append('<div class="ln-toggle-filter-rule-module-link"><a href="#">+</a></div>')
               .find('div.ln-toggle-filter-rule-module-link a')
               .click(toggleModule);

  function createRandomID() {
    var randomValue = (Math.random()).toString();

    return randomValue.substring(2, 6);
  }

  function toggleModule() {
    var filterRuleModule = $('div#' + moduleID);

    $(this).text($(this).text() === '+' ? '–' : '+');

    if (filterRuleModule.length > 0) {
      filterRuleModule.toggle();
    } else {
      createFilterRuleModule();
    }

    return false;
  }

  function createFilterRuleModule() {
    var module = GM_getResourceText('filter-rule-module').replace('@@', moduleID);
    parentElement.append(module);

    NewFilterRuleForm(moduleID, filter);
    FilterRuleList(moduleID, filter);
  }
}
