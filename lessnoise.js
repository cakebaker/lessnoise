var currentUser = $('span.DashboardProfileCard-screenname span.username b').text();

if (typeof(currentUser) != 'undefined') {
  var init = function() {
    var filter = Filter();
    Timeline(Highlighter(currentUser), filter);
    Sidebar($('div.dashboard-left, div.ProfileSidebar--withLeftAlignment'), filter);
  }

  init();

  var location = window.location.href;
  setInterval(function() {
    if (location != window.location.href) {
      location = window.location.href;
      init();
    }
  }, 1000);
}
