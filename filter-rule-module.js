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
    var module = getTemplate().replace('@@', moduleID);
    parentElement.append(module);

    NewFilterRuleForm(moduleID, filter);
    FilterRuleList(moduleID, filter);
  }

  function getTemplate() {
    return '<div class="module ln-filter-rule-module" id="@@">' +
           '  <div class="flex-module">' +
           '    <div class="flex-module-inner">' +
           '      <div>' +
           '        <form>' +
           '          <input type="text" class="ln-new-filter-rule" placeholder="" />' +
           '          <input class="ln-new-filter-rule-btn" type="submit" value="Add" disabled="disabled" />' +
           '        </form>' +
           '      </div>' +
           '      <div class="flex-module-header">' +
           '      </div>' +
           '      <ul class="content ln-filter-rule-list">' +
           '      </ul>' +
           '    </div>' +
           '  </div>' +
           '</div>';
  }
}
