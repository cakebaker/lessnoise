var Sidebar = function(parentElement, filter) {
  var className = 'ln-sidebar';

  parentElement.append('<div class="ln-toggle-sidebar-link"><a href="#">+</a></div>')
               .find('div.ln-toggle-sidebar-link a')
               .click(toggleSidebar);

  function toggleSidebar() {
    var sidebar = $('div.' + className);

    $(this).text($(this).text() === '+' ? '–' : '+');

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
