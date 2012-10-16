var NewFilterRuleForm = function(moduleID) {
  var MODULE = '#' + moduleID;
  var BUTTON = 'input.ln-new-filter-rule-btn';
  var INPUT_FIELD = 'input.ln-new-filter-rule';
  var PLACEHOLDER_TEXT = 'Enter new filter';
  var listeners = [resetInput];

  setPlaceholder(PLACEHOLDER_TEXT);

  $(MODULE).find(BUTTON).click(notifyListeners);
  // override the default placeholder behavior of FF and hide the placeholder text when focusing the input element
  // to make it consistent with Twitter's "Compose new Tweet" behavior
  $(MODULE).find(INPUT_FIELD).focusin(function() { setPlaceholder(''); });
  $(MODULE).find(INPUT_FIELD).focusout(function() { setPlaceholder(PLACEHOLDER_TEXT); });
  
  function notifyListeners() {
    var newFilterRule = $(MODULE).find(INPUT_FIELD).val();

    listeners.forEach(function(listener) { 
      listener(newFilterRule);
    });

    return false;
  }

  function onSubmit(listener) {
    listeners.push(listener);
  }

  function resetInput() {
    $(MODULE).find(INPUT_FIELD).val('');
  }

  function setPlaceholder(text) {
    $(MODULE).find(INPUT_FIELD).attr('placeholder', text);
  }

  return {
    onSubmit: onSubmit
  }
}
