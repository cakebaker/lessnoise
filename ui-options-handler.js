browser.storage.onChanged.addListener(updateUI);
updateUI();

function updateUI() {
  browser.storage.local.get('uiOptions').then(doUpdateUI, onError);
}

function doUpdateUI(options) {
  display($('div.module.trends'), options.uiOptions.trends);
  display($('div.module.wtf-module'), options.uiOptions.wtf);
  display($('div.module.Footer'), options.uiOptions.footer);
}

function display(elem, doShow) {
  elem.attr('style', `display: ${doShow ? 'block' : 'none'} !important;`);
}

function onError(error) {
  console.log(error);
}
