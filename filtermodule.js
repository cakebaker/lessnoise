var FilterModule = function(element, filters) {
  var addListeners = [addToList];
  var removeListeners = [];

  element.append(GM_getResourceText('filtermodule'));
  filters.forEach(addToList);

  $('#ln-new-filter-btn').click(add);
  $('.ln-filter-list').on('click', 'a', remove);

  function add() {
    var newFilter = $('#ln-new-filter').val();
    $('#ln-new-filter').val('');

    addListeners.forEach(function(fn) { fn(newFilter); });

    return false;
  }

  function addToList(filter) {
    var filterTemplate = '<div>$$ <a data-filter="$$" href="#">delete</a></div>';
    var filterHTML = filterTemplate.replace(/\$\$/g, filter);
    $('.ln-filter-module .ln-filter-list').append(filterHTML);
  }

  function remove() {
    var filter = $(this).data('filter');
    $(this).parent().remove();

    removeListeners.forEach(function(fn) { fn(filter); });

    return false;
  }

  function onAdd(fn) {
    addListeners.push(fn);
  }

  function onRemove(fn) {
    removeListeners.push(fn);
  }

  return {
    onAdd: onAdd,
    onRemove: onRemove
  }
};
