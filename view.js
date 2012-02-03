var template = null;
var data = null;

$.get("leden.mustache", function(leden_template) {
  template = leden_template;
  render();
});

$.getJSON("leden", function(leden_data) {
  data = leden_data;
  render();
});

function render() {
  if (template === null || data === null) {
    return;
  }
  var ledenlijst = $.mustache(template, data);
  $(function() {
    $('body').append(ledenlijst);
  });
}

$(function() {
  window.Member = Backbone.Model.extend({
  });

  window.MemberCollection = Backbone.Collection.extend({
    model: Member,
    url: '/leden'
  });

  window.Members = new MemberCollection;

  window.MemberView = Backbone.View.extend({
    className: 'member',
    model: Member
  });

  window.AddMemberDialog = Backbone.View.extend({
    events: {
      'keypress #new-member-name': 'saveOnEnter'
    },
    render: function() {
      this.$el.html('<div class="add-member-dialog"><input type="text" id="new-member-name"></div>');
      return this;
    },
    saveOnEnter: function(event) {
      console.info("key pressed");
      console.info(event);
      if (event.keyCode === 13) {
        Members.create({name: $('#new-member-name').val()});
      }
    }
  });

  window.AppView = Backbone.View.extend({
    el: $('body'),
    events: {
      'click #new_leden': 'addMemberDialog'
    },
    addMemberDialog: function(event) {
      console.info('hier');
      event.preventDefault();
      var view = new AddMemberDialog();
      $('body').append(view.render().el);
    }
  });

  window.App = new AppView;
});
