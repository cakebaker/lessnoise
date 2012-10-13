var FilterStorage = function(key) {
  var filterRules = JSON.parse(localStorage.getItem(key)) || [];

  function add(filterRule) {
    filterRules.push(filterRule);
    updateLocalStorage();
  }

  function getFilterRules() {
    return filterRules;
  }

  function remove(filterRule) {
    var index = filterRules.indexOf(filterRule);

    if (index != -1) {
      filterRules.splice(index, 1);
      updateLocalStorage();
    }
  }

  function updateLocalStorage() {
    localStorage.setItem(key, JSON.stringify(filterRules));
  }

  return {
    add: add,
    getFilterRules: getFilterRules,
    remove: remove
  }
}
