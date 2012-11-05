var Tweet = function(streamItem) {
  expandUrls();
  var hashtags = parseForHashtags();
  var links = parseForLinks();
  var mentions = parseForMentions();
  var username = parseForUsername();
  var text = parseForText();

  function hide() {
    $(streamItem).addClass('ln-invisible');
  }

  function unhide() {
    $(streamItem).removeClass('ln-invisible');
  }

  function highlight() {
    $(streamItem).addClass('ln-highlight');
  }

  function expandUrls() {
    $(streamItem).find('.twitter-timeline-link').each(function() {
      var urlToExpand = $(this).data('expanded-url');
      if (urlToExpand !== undefined) {
        var linkElement = this;
        GM_xmlhttpRequest({
          url: urlToExpand,
          method: "HEAD",
          onload: function(response) { handleExpandedUrl(linkElement, response.finalUrl); }
        });
      }
    });
  }

  function handleExpandedUrl(linkElement, expandedUrl) {
    $(linkElement).attr('href', expandedUrl);
    $(linkElement).find('.js-display-url').text(expandedUrl);
    $(linkElement).find('.tco-ellipsis').hide();
  }

  function parseForHashtags() {
    var result = [];

    $(streamItem).find('.twitter-hashtag b').each(function() {
      result.push($(this).text());
    });

    return result;
  }

  function parseForLinks() {
    var result = [];

    $(streamItem).find('.twitter-timeline-link').each(function() {
      var url = $(this).data('expanded-url');
      if (url === undefined) {
        url = $(this).attr('href');
      }
      result.push(url);
    });

    return result;
  }

  function parseForMentions() {
    var mentionsString = $(streamItem).find('.tweet').data('mentions');
    if (mentionsString !== undefined) {
      return mentionsString.split(' ');
    }

    return [];
  }

  function parseForUsername() {
    return $(streamItem).find('.username b').text();
  }

  function parseForText() {
    return $.trim($(streamItem).find('.js-tweet-text').text());
  }

  return {
    hashtags: hashtags,
    links: links,
    mentions: mentions,
    username: username,
    text: text,
    streamItem: streamItem,
    hide: hide,
    unhide: unhide,
    highlight: highlight
  }
}
