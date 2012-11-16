var Tweet = function(streamItem) {
  var cache = {};

  function hide() {
    $(streamItem).addClass('ln-invisible');
  }

  function unhide() {
    $(streamItem).removeClass('ln-invisible');
  }

  function highlight() {
    $(streamItem).addClass('ln-highlight');
  }

  function id() {
    if (!cache.id) {
      cache.id = $(streamItem).data('item-id');
    }

    return cache.id;
  }

  function hashtags() {
    if (!cache.hashtags) {
      cache.hashtags = getHashtags();
    }

    return cache.hashtags;
  }

  function getHashtags() {
    var result = [];

    $(streamItem).find('.twitter-hashtag b').each(function() {
      result.push($(this).text());
    });

    return result;
  }

  function mentions() {
    if (!cache.mentions) {
      cache.mentions = getMentions();
    }

    return cache.mentions;
  }

  function getMentions() {
    var mentionsString = $(streamItem).find('.tweet').data('mentions');
    if (mentionsString !== undefined) {
      return mentionsString.toString().split(' ');
    }

    return [];
  }

  function links() {
    if (cache.links) {
      return cache.links;
    }

    var links = getLinks();

    if (links.length === 0) {
      cache.links = links;
    }

    return links;
  }

  function getLinks() {
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

  function text() {
    return $.trim($(streamItem).find('.js-tweet-text').text());
  }

  return {
    id: id,
    hashtags: hashtags,
    mentions: mentions,
    links: links,
    text: text,
    hide: hide,
    unhide: unhide,
    highlight: highlight
  }
}
