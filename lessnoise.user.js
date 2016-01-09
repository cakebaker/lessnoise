// ==UserScript==
// @name             LessNoise
// @version          0.0.10
// @namespace        https://github.com/cakebaker
// @description      LessNoise is a filter for Twitter's timeline
// @include          https://twitter.com/
// @include          https://twitter.com/*
// @require          lib/jquery-2.2.0.min.js
// @require          new-tweets-bar-clicker.js
// @require          timeline.js
// @require          url-expander.js
// @require          title-tweet-counter.js
// @require          tweet.js
// @require          tweet-filter-rule-menu.js
// @require          filter.js
// @require          filter-rules.js
// @require          sidebar/sidebar.js
// @require          sidebar/new-filter-rule-form.js
// @require          sidebar/filter-rule-list.js
// @require          filters/hashtag-filter.js
// @require          filters/mention-filter.js
// @require          filters/foreign-characters-filter.js
// @require          filters/author-filter.js
// @require          filters/retweet-filter.js
// @require          filters/keyword-filter.js
// @require          highlighter.js
// @require          highlighters/current-user-highlighter.js
// @resource         css css/lessnoise.css
// @grant            GM_xmlhttpRequest
// @grant            GM_getResourceText
// @grant            GM_addStyle
// ==/UserScript==

$(document).ready(function() {
  GM_addStyle(GM_getResourceText('css'));

  var currentUser = $('div.js-mini-current-user').data('screen-name');

  if (typeof(currentUser) != 'undefined') {
    var init = function() {
      var color = $('.ProfilePage, .user-style-' + currentUser).css('background-color');
      GM_addStyle('.ln-toggle-sidebar-link a { color: ' + color + '; filter: invert(100%);}');

      var filter = Filter();

      Timeline(Highlighter(currentUser), filter);
      Sidebar($('div.dashboard-left, div.ProfileSidebar--withLeftAlignment'), filter);
    };

    init();

    var location = window.location.href;
    setInterval(function() {
      if (location != window.location.href) {
        location = window.location.href;
        init();
      }
    }, 1000);
  }
});
