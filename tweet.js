var Tweet = function(streamItem) {
  var hashtags = parseForHashtags();
  var links = parseForLinks();
  var mentions = parseForMentions();
  var username = parseForUsername();
  var text = parseForText();

  function hide() {
    $(streamItem).addClass('ln-invisible');
  }

  function highlight() {
    $(streamItem).addClass('ln-highlight');
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
    hide: hide,
    highlight: highlight
  }
}
