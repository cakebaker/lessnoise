var FilterRules = function() {
  var addListeners = [];
  var removeListeners = [];
  var listeners = {};

  function add(key, filterRule) {
    var filterRules = get(key);
    filterRules.push(filterRule);
    save(key, filterRules);
    notifyAddListeners(filterRule);
  }

  function remove(key, filterRule) {
    var filterRules = get(key);
    var index = filterRules.indexOf(filterRule);

    if (index !== -1) {
      filterRules.splice(index, 1);
      save(key, filterRules);
      notifyRemoveListeners(filterRule);
    }
  }

  function get(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
  }

  function save(key, rules) {
    localStorage.setItem(key, JSON.stringify(rules));
    notifyListeners(key);
  }

  function notifyAddListeners(filterRule) {
    addListeners.forEach(function(listener) {
      listener(filterRule);
    });
  }

  function notifyRemoveListeners(filterRule) {
    removeListeners.forEach(function(listener) {
      listener(filterRule);
    });
  }

  function notifyListeners(key) {
    var keyListeners = listeners[key] || [];
    keyListeners.forEach(function(listener) {
      listener();
    });
  }

  function onAdd(listener) {
    addListeners.push(listener);
  }

  function onRemove(listener) {
    removeListeners.push(listener);
  }

  function onUpdate(key, listener) {
    var keyListeners = listeners[key] || [];
    keyListeners.push(listener);
    listeners[key] = keyListeners;
  }

  return {
    add: add,
    remove: remove,
    get: get,
    onAdd: onAdd,
    onRemove: onRemove,
    onUpdate: onUpdate
  }
}
