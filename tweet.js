var Tweet = function(streamItem) {
  var INVISIBLE = 'ln-invisible';
  var HIGHLIGHTED = 'ln-highlighted';
  var cache = {};

  function hide() {
    $(streamItem).addClass(INVISIBLE);
  }

  function unhide() {
    $(streamItem).removeClass(INVISIBLE);
  }

  function isHidden() {
    return $(streamItem).hasClass(INVISIBLE);
  }

  function highlight() {
    $(streamItem).addClass(HIGHLIGHTED);
  }

  function isHighlighted() {
    return $(streamItem).hasClass(HIGHLIGHTED);
  }

  function id() {
    if (!cache.id) {
      cache.id = $(streamItem).data('item-id');
    }

    return cache.id;
  }

  // Returns either the author of a tweet, or the name of the retweeter if it is a retweet
  function author() {
    if (!cache.author) {
      if (isRetweet()) {
        cache.author = $(streamItem).find('div.stream-item-footer a.js-user-profile-link').attr('href').substring(1);
      } else {
        cache.author = $(streamItem).find('div.stream-item-header span.username b').text();
      }
    }

    return cache.author;
  }

  function isRetweet() {
    return $(streamItem).find('div.tweet').data('retweet-id') !== undefined;
  }

  function characterSet() {
    var txt = text();
    var characterRanges = {
      'arabic': '[\u0600-\u06FF]+', // http://en.wikipedia.org/wiki/Arabic_script_in_Unicode
      'japanese': '[\u3040-\u309F]+', // Hiragana
      'chinese': '[\u4E00-\u9FCC\u3400-\u4DB5]+' // http://stackoverflow.com/questions/1366068/whats-the-complete-range-for-chinese-characters-in-unicode
    }

    for (var key in characterRanges) {
      if ((new RegExp(characterRanges[key])).test(txt)) {
        return key;
      }
    }

    return undefined;
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

  function hasLinks() {
    return (links().length > 0);
  }

  function text() {
    return $.trim($(streamItem).find('.js-tweet-text').text());
  }

  return {
    id: id,
    author: author,
    characterSet: characterSet,
    hashtags: hashtags,
    mentions: mentions,
    links: links,
    hasLinks: hasLinks,
    isRetweet: isRetweet,
    text: text,
    hide: hide,
    unhide: unhide,
    isHidden: isHidden,
    highlight: highlight,
    isHighlighted: isHighlighted
  }
}
