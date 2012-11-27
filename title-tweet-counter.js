var TitleTweetCounter = function() {
  var tweetCount = 0;

  window.onfocus = (function() {
    tweetCount = 0;
    updateTitle();
  });

  function inc() {
    if (!document.hasFocus()) {
      tweetCount++;
      updateTitle();
    }
  }

  function updateTitle() {
    if (tweetCount > 0) {
      document.title = '(' + tweetCount + ') Twitter';
    } else {
      document.title = 'Twitter';
    }
  }

  return {
    inc: inc
  }
}
