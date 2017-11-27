const trendsOption = document.querySelector('#trends');
const wtfOption    = document.querySelector('#wtf');
const footerOption = document.querySelector('#footer');

function saveOptions() {
  browser.storage.local.set({
    uiOptions: {
      trends: trendsOption.checked,
      wtf:    wtfOption.checked,
      footer: footerOption.checked
    }
  });
}

function updateUI(options) {
  trendsOption.checked = options.uiOptions.trends;
  wtfOption.checked    = options.uiOptions.wtf;
  footerOption.checked = options.uiOptions.footer;
}

function onError(error) {
  console.log(error);
}

browser.storage.local.get('uiOptions').then(updateUI, onError);
document.querySelector('form').addEventListener('change', saveOptions);
