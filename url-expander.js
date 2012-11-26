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
        onload: function(response) { handleExpandedUrl(linkElement, processUrl(response.finalUrl)); }
      });
    } else {
      urlsToExpandCount--;
    }
  }

  function processUrl(url) {
    var urlElement = document.createElement('a');
    urlElement.href = url;

    if (urlElement.search !== '') {
      urlElement.search = cleanupQuerystring(urlElement.search);
    }

    return urlElement.href;
  }

  function cleanupQuerystring(querystring) {
    var unwantedKeys = ['buffer_share', 'utm_content', 'utm_source', 'utm_medium', 'utm_campaign'];
    var cleanParams = [];
    var params = querystring.substring(1).split('&');

    params.forEach(function(param) {
      var containsUnwantedKey = unwantedKeys.some(function(unwantedKey) {
        return (param.indexOf(unwantedKey) > -1)
      });

      if (!containsUnwantedKey) {
        cleanParams.push(param);
      }
    });

    return '?' + cleanParams.join('&');
  }

  function handleExpandedUrl(linkElement, expandedUrl) {
    expandedUrlsCount++;
    $(linkElement).data('expanded-url', expandedUrl);
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
