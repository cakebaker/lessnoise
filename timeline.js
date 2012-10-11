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

  // Notice: a listener will not only receive an "Add" event for newly added tweets but also for all existing tweets in the timeline.
  function onAdd(listener) {
    $('div.stream-item').each(function() {
      listener(Tweet($(this)));
    });

    listeners.push(listener);
  }

  return {
    onAdd: onAdd
  }
}
