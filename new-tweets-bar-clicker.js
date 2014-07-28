var NewTweetsBarClicker = function() {
  // XXX fix for Chrome
  if (typeof(MutationObserver) == 'undefined') {
    MutationObserver = WebKitMutationObserver;
  }

  var clickNewTweetsBar = function() {
    // XXX disabling Twitter's auto-scrolling to the top by temporarily replacing jQuery's animate() function
    var animateFn = unsafeWindow.$.fn.animate;
    unsafeWindow.$.fn.animate = exportFunction(function() {}, unsafeWindow);

    $('div.new-tweets-bar').click();

    unsafeWindow.$.fn.animate = exportFunction(animateFn, unsafeWindow);
  }

  var target = document.querySelector('div.js-new-items-bar-container');
  var observer = new MutationObserver(clickNewTweetsBar);
  observer.observe(target, { childList: true });
}
