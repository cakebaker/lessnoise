var Sidebar = function(parentElement, filter) {
  var className = 'ln-sidebar';

  parentElement.append('<div class="ln-toggle-sidebar-link"><a href="#" title="Show filters">+</a></div>')
               .find('div.ln-toggle-sidebar-link a')
               .click(toggleSidebar);

  function toggleSidebar() {
    var sidebar = $('div.' + className);

    if ($(this).text() === '+') {
      $(this).text('-');
      $(this).attr('title', 'Hide filters');
    } else {
      $(this).text('+');
      $(this).attr('title', 'Show filters');
    }

    if (sidebar.length > 0) {
      sidebar.toggle();
    } else {
      createSidebar();
    }

    return false;
  }

  function createSidebar() {
    parentElement.append(getTemplate());

    NewFilterRuleForm(className, filter);
    FilterRuleList(className, filter);
  }

  function getTemplate() {
    return '<div class="module ln-sidebar">' +
           '  <div class="flex-module">' +
           '    <div class="flex-module-inner">' +
           '      <div>' +
           '        <form>' +
           '          <input type="text" class="ln-new-filter-rule" placeholder="" list="ln-filter-rules" />' +
           '          <input class="ln-new-filter-rule-btn" type="submit" value="Add" disabled="disabled" />' +
           '          <datalist id="ln-filter-rules">' +
           '            <option value="block @">' +
           '            <option value="chinese characters">' +
           '            <option value="japanese characters">' +
           '            <option value="retweets from @">' +
           '          </datalist>' +
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
