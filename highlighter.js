var Highlighter = function(currentUser) {
  var currentUserHighlighter = CurrentUserHighlighter(currentUser);

  function highlight(tweet) {
    return currentUserHighlighter.highlight(tweet);
  }

  return {
    highlight: highlight
  }
}
