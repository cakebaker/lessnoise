var TweetFilterRuleMenu = function(tweet, filter) {
  var tweetSelector = 'li#stream-item-tweet-' + tweet.id();

  // XXX since about a month the UI on twitter.com changes regularly between two designs
  // XXX this hack attempts to make the filter menu work in both designs

  // XXX code for "old" twitter UI
  $(tweetSelector).find('ul.tweet-actions')
                  .prepend('<li class="ln-action-filter"><a title="Filter"><b>Filter</b></a></li>')
                  .find('li.ln-action-filter a')
                  .click(toggleFilterRuleMenu);

  // XXX code for "new" twitter UI
  $(tweetSelector).find('ul.tweet-actions-sidebar li:eq(0)')
                  .after('<li class="ln-action-filter"><a title="Filter">+</a></li>');

  $(tweetSelector).find('ul.tweet-actions-sidebar li.ln-action-filter a')
                  .click(toggleFilterRuleMenu);

  function toggleFilterRuleMenu() {
    var filterRuleMenu = $(this).parents('div.stream-item-footer').find('div.ln-filter-list-module');

    if (filterRuleMenu.length > 0) {
      filterRuleMenu.toggle();
    } else {
      createFilterRuleMenu();
    }

    return false;
  }

  function createFilterRuleMenu() {
    $(tweetSelector).find('div.stream-item-footer').append('<div class="ln-filter-list-module"><ul class="ln-filter-list"></ul></div>');
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
    $(this).parents('div.stream-item-footer').find('div.ln-filter-list-module').toggle();

    var newFilterRule = $(this).data('filter-rule');
    filter.addFilterRule(newFilterRule);

    return false;
  }
}
