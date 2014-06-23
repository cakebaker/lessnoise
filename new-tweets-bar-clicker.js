var NewTweetsBarClicker = function() {
  // XXX fix for Chrome
  if (typeof(MutationObserver) == 'undefined') {
    MutationObserver = WebKitMutationObserver;
  }

  var clickNewTweetsBar = function() {
    // XXX disabling Twitter's auto-scrolling to the top by temporarily replacing jQuery's animate() function
    var animateFn = unsafeWindow.$.fn.animate;
    unsafeWindow.$.fn.animate = function() {};

    $('div.new-tweets-bar').click();

    unsafeWindow.$.fn.animate = animateFn;
  }

  var target = document.querySelector('div.stream-container');
  var observer = new MutationObserver(clickNewTweetsBar);
  observer.observe(target, { childList: true });
}
