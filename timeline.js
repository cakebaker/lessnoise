var Timeline = function() {
  var listeners = [];
  var target = document.querySelector('div#stream-items-id');
  var observer = new MutationObserver(handleMutations);
  observer.observe(target, { childList: true });

  function handleMutations(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.addedNodes !== null) {
        notifyListeners(mutation.addedNodes);
      }
    });
  }

  function notifyListeners(addedNodes) {
    var tweet;
    for (var i = 0; i < addedNodes.length; i++) {
      tweet = Tweet(addedNodes[i]);
      listeners.forEach(function(listener) { listener(tweet); });
    }
  }

  function onAdd(listener) {
    listeners.push(listener);
  }

  return {
    onAdd: onAdd
  }
}
