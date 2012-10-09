var StreamWatcher = function() {
  var listeners = [];

  setupObserver('.stream-container', clickNewTweetsBar);
  setupObserver('#stream-items-id', handleMutations);

  function setupObserver(selector, fn) {
    var target = document.querySelector(selector);
    var observer = new MutationObserver(fn);
    observer.observe(target, { childList: true });
  }

  function clickNewTweetsBar() {
    $('.new-tweets-bar').click();
  }

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
