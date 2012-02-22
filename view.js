window.Member = Backbone.Model.extend({
});

window.MemberList = Backbone.Collection.extend({
  model: Member,
  url: '/leden'
});

window.Members = new MemberList();

window.MemberView = Backbone.View.extend({
  className: 'member',
  model: Member,
  tagName: 'li',
  render: function() {
    this.$el.text(this.model.get('name'));
    return this;
  }
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
    if (event.keyCode === 13) {
      Members.create({name: $('#new-member-name').val()});
      this.$el.remove();
    }
  }
});

$(function() {
  window.AppView = Backbone.View.extend({
    el: $('body'),
    events: {
      'click #new_leden': 'addMemberDialog'
    },
    initialize: function() {
      Members.bind('add', this.addMember, this);
      Members.bind('reset', this.addMembers, this);
    },
    addMember: function(member) {
      var view = new MemberView({model: member});
      $('#members').append(view.render().el);
    },
    addMembers: function() {
      Members.each(this.addMember);
    },
    addMemberDialog: function(event) {
      console.log('clicked add member');
      event.preventDefault();
      var view = new AddMemberDialog();
      $('body').append(view.render().el);
    }
  });

  window.App = new AppView;
  console.log(App.el);
  Members.fetch();
});
