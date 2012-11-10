var CurrentUserHighlighter = function(username) {
  var currentUser = username.toLowerCase();

  function highlight(tweet) {
    return tweet.mentions().some(function(mention) {
      return (mention === currentUser.toLowerCase());
    });
  }

  return {
    highlight: highlight
  }
}
