var TweetFilterRuleMenu = function(tweet, filter) {
  var tweetSelector = 'div#stream-item-tweet-' + tweet.id();

  $(tweetSelector).find('ul.tweet-actions')
                  .prepend('<li class="ln-action-filter"><a title="Filter" href="#"><b>Filter</b></a></li>')
                  .find('li.ln-action-filter a')
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
    tweet.hashtags().forEach(function(hashtag) {
      filterRuleList += '<li><a href="#" data-filter="#' + hashtag + '">#' + hashtag + '</a></li>';
    });
    tweet.mentions().forEach(function(mention) {
      filterRuleList += '<li><a href="#" data-filter="@' + mention + '">@' + mention + '</a></li>';
    });

    return filterRuleList;
  }

  function addFilterRule() {
    $(this).parents('div.stream-item-footer').find('div.ln-filter-list-module').toggle();

    var newFilterRule = $(this).data('filter');
    filter.addFilterRule(newFilterRule);

    return false;
  }
}
