// ==UserScript==
// @name             LessNoise
// @version          0.0.1
// @namespace        https://github.com/cakebaker
// @description      LessNoise removes some clutter from twitter.com, auto-clicks on the "new tweets" bar
// @include          https://twitter.com/
// @require          http://code.jquery.com/jquery-1.8.2.min.js
// ==/UserScript==

$(document).ready(function() {
  $('div.module.wtf-module').hide();
  $('div.module.trends').hide();
  $('div.module.site-footer').hide();

  var observer = new MutationObserver(function(mutations) {
    $('.new-tweets-bar').click();
  });
  var config = { childList: true }
  var target = document.querySelector('.stream-container');
  observer.observe(target, config);
});
