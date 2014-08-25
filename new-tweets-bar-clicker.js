var NewTweetsBarClicker = function() {
  // XXX fix for Chrome
  if (typeof(MutationObserver) == 'undefined') {
    MutationObserver = WebKitMutationObserver;
  }

  var clickNewTweetsBar = function() {
    $('div.new-tweets-bar').click();
  }

  var target = document.querySelector('div.js-new-items-bar-container');
  var observer = new MutationObserver(clickNewTweetsBar);
  observer.observe(target, { childList: true });
}
