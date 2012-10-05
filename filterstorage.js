var FilterStorage = function() {
  var key = 'ln-filters';
  var filters = $.parseJSON(localStorage.getItem(key)) || [];

  function add(filter) {
    filters.push(filter);
    updateLocalStorage();
  }

  function getFilters() {
    return filters;
  }

  function remove(filter) {
    var index = filters.indexOf(filter);

    if (index != -1) {
      filters.splice(index, 1);
      updateLocalStorage();
    }
  }

  function updateLocalStorage() {
    localStorage.setItem(key, JSON.stringify(filters));
  }

  return {
    add: add,
    getFilters: getFilters,
    remove: remove
  }
}
