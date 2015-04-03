var TweetFilterRuleMenu = function(tweet, filter) {
  var tweetSelector = 'li#stream-item-tweet-' + tweet.id();

  $(tweetSelector + ' div.ln-action-filter').remove();
  $(tweetSelector).find('div.js-actions')
                .prepend('<div class="ProfileTweet-action ln-action-filter"><button class="ProfileTweet-actionButton js-tooltip u-textUserColorHover" title="Filter"><b>Filter</b></button></div>')
                .find('div.ln-action-filter button')
                .click(toggleFilterRuleMenu);

  function toggleFilterRuleMenu() {
    var filterRuleMenu = $(this).parents('div.content').find('div.ln-filter-list-module');

    if (filterRuleMenu.length > 0) {
      filterRuleMenu.toggle();
    } else {
      createFilterRuleMenu();
    }

    return false;
  }

  function createFilterRuleMenu() {
    $(tweetSelector).find('div.content').append('<div class="ln-filter-list-module"><ul class="ln-filter-list"></ul></div>');
    $(tweetSelector).find('ul.ln-filter-list').append(createFilterRuleList());
    $(tweetSelector).find('ul.ln-filter-list').on('click', 'a', addFilterRule);
    $(tweetSelector).find('div.ln-filter-list-module').toggle();
  }

  function createFilterRuleList() {
    var filterRuleList = '';
    var listItemTemplate = '<li><a href="#" data-filter-rule="@@">@@</a></li>';

    filterRuleList += listItemTemplate.replace(/@@/g, 'block @' + tweet.author());

    if (tweet.isRetweet()) {
      filterRuleList += listItemTemplate.replace(/@@/g, 'retweets from @' + tweet.author());
    }

    var characterSet = tweet.characterSet();
    if (characterSet !== undefined) {
      filterRuleList += listItemTemplate.replace(/@@/g, characterSet + ' characters');
    }

    tweet.hashtags().forEach(function(hashtag) {
      filterRuleList += listItemTemplate.replace(/@@/g, '#' + hashtag);
    });
    tweet.mentions().forEach(function(mention) {
      filterRuleList += listItemTemplate.replace(/@@/g, '@' + mention);
    });
    tweet.links().forEach(function(link) {
      var domain = link.replace(/https?:\/\/(www\.)?/, '').replace(/\/.*/, '');
      filterRuleList += listItemTemplate.replace(/@@/g, domain);
    });

    return filterRuleList;
  }

  function addFilterRule() {
    $(this).parents('div.content').find('div.ln-filter-list-module').toggle();

    var newFilterRule = $(this).data('filter-rule');
    filter.addFilterRule(newFilterRule);

    return false;
  }
}
