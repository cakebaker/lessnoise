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
    var listItemTemplate = '<li><a href="#" data-filter-rule="@@">@@</a></li>';

    filterRuleList += listItemTemplate.replace(/@@/g, 'block @' + tweet.author());

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
