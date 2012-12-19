var NewFilterRuleForm = function(parentClass, filter) {
  var MODULE = '.' + parentClass;
  var BUTTON = 'input.ln-new-filter-rule-btn';
  var INPUT_FIELD = 'input.ln-new-filter-rule';
  var PLACEHOLDER_TEXT = 'Enter new filter';

  setPlaceholder(PLACEHOLDER_TEXT);

  $(MODULE).find(BUTTON).click(addFilterRule);
  // override the default placeholder behavior of FF and hide the placeholder text when focusing the input element
  // to make it consistent with Twitter's "Compose new Tweet" behavior
  $(MODULE).find(INPUT_FIELD).focusin(function() { setPlaceholder(''); });
  $(MODULE).find(INPUT_FIELD).focusout(function() { setPlaceholder(PLACEHOLDER_TEXT); });
  $(MODULE).find(INPUT_FIELD).keyup(function() {
    $(MODULE).find(BUTTON).attr('disabled', !$(this).val());
  });
  
  function addFilterRule() {
    var newFilterRule = $(MODULE).find(INPUT_FIELD).val();

    filter.addFilterRule(newFilterRule);
    resetInput();

    return false;
  }

  function resetInput() {
    $(MODULE).find(INPUT_FIELD).val('');
  }

  function setPlaceholder(text) {
    $(MODULE).find(INPUT_FIELD).attr('placeholder', text);
  }
}
