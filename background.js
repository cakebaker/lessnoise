browser.webNavigation.onHistoryStateUpdated.addListener(function(details) {
  browser.tabs.executeScript(null, { file: "ui-options-handler.js" });
});
