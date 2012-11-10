var UrlExpander = function(tweet) {
  var listeners = [];
  var links = $('div#stream-item-tweet-' + tweet.id()).find('a.twitter-timeline-link');
  var urlsToExpandCount = links.length;
  var expandedUrlsCount = 0;

  links.each(expand);

  function expand() {
    var urlToExpand = $(this).data('expanded-url');

    if (urlToExpand !== undefined) {
      var linkElement = this;
      GM_xmlhttpRequest({
        url: urlToExpand,
        method: "HEAD",
        onload: function(response) { handleExpandedUrl(linkElement, response.finalUrl); }
      });
    } else {
      urlsToExpandCount--;
    }
  }

  function handleExpandedUrl(linkElement, expandedUrl) {
    expandedUrlsCount++;
    $(linkElement).attr('href', expandedUrl);
    $(linkElement).attr('title', expandedUrl);
    $(linkElement).find('.js-display-url').text(expandedUrl);
    $(linkElement).find('.tco-ellipsis').hide();

    if (expandedUrlsCount === urlsToExpandCount) {
      notifyListeners();
    }
  }

  function notifyListeners() {
    listeners.forEach(function(listener) {
      listener(tweet);
    });
  }

  function onAllUrlsExpanded(listener) {
    listeners.push(listener);
  }

  return {
    onAllUrlsExpanded: onAllUrlsExpanded
  }
}
