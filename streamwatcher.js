var StreamWatcher = function() {
  var listeners = [];

  function onAdd(fn) {
    listeners.push(fn);
  }

  function watch(mutations) {
    var tweet;
    mutations.forEach(function(mutation) {
      if (mutation.addedNodes !== null) {
        for (var i = 0; i < mutation.addedNodes.length; i++) {
          tweet = Tweet(mutation.addedNodes[i]);
          listeners.forEach(function(fn) { fn(tweet); });
        }
      }
    });
  }

  return {
    onAdd: onAdd,
    watch: watch
  }
}
