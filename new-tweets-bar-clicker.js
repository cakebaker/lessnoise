var NewTweetsBarClicker = function() {
  // XXX fix for Chrome
  if (typeof(MutationObserver) == 'undefined') {
    MutationObserver = WebKitMutationObserver;
  }
  var target = document.querySelector('div.stream-container');
  var observer = new MutationObserver(function() { $('div.new-tweets-bar').click(); });
  observer.observe(target, { childList: true });
}
