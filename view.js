var template = null;
var data = null;

$(function() {
  $.get("leden.mustache", function (leden_template) {
    template = leden_template;
    render();
  });

  $.getJSON("leden", function (leden_data) {
    data = leden_data;
    render();
  });

  function render() {
    if (template === null || data === null) {
      return;
    }
    var ledenlijst = $.mustache(template, data);
    $('body').append(ledenlijst);
  }
});
