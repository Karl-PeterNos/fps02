var getScoutStatus = function(scoutStatusCode){
  switch (scoutStatusCode){     
    case "ext": return "ohne Abo";
    case "abo": return "mit Abo";
    case "chk": return "verdächtig";
    case "blk": return "blockiert";
    case "del": return "gelöscht";
    default:    return "neu";
  }
};

Template.scouts.rendered = function(){   
  $("#scoutTable").tablesorter();
  $('.ui.accordion').accordion();
;
;
};

Template.scouts.user = function(){
    return Meteor.users.find();    	
};

Template.scouts.joinWithScout = function(){
  var user = this;
  var scout = scouts.findOne({userId: this._id});
  console.log("join user");
  console.log(this._id);
  console.log(scout);  
  return _.extend(user, _.omit(scout, '_id'));
};

Template.scouts.editing = function () {
  return Session.equals('active_scout', this._id);
};

Template.scouts.events({
  'mouseenter': function () {
    if (this._id){        
        Session.set("active_scout", this._id);
      }
  },  
  'mouseleave': function () {
     Session.set("active_scout", null);

  },      
  'click #scoutWettReset': function (evt, tmpl) { 
    console.log('RESET');
    Meteor.call('resetWetten');
  },
  'click ': function (evt, tmpl) { 
    Deps.flush(); // force DOM redraw, so we can focus the edit field    
  }  
});

Template.scouts.scoutStatusClass = function( ){
	if (this.scoutStatusCode=="ext"||this.scoutStatusCode=="abo")
		return "positive";
	if (this.scoutStatusCode=="chk"||this.scoutStatusCode=="blk")
		return "negative";
};

Template.scouts.scoutStatus = function(){
	return getScoutStatus(this.scoutStatusCode);
};

Template.scouts.scoutStatusIcon = function(){
  switch (this.scoutStatusCode){     
    case "ext": return "";
    case "abo": return "icon checkmark";
    case "chk": return "attention icon";
    case "blk": return "icon close";
    default:    return "attention icon";
  }
};

Template.scouts.rollen = function(){
	return Roles.getRolesForUser(this._id).toString();
};

Template.scoutAendern.scoutStatus = function(){
  return getScoutStatus(this.scoutStatusCode);
};

Template.scoutAendern.rendered = function(){
  $('.ui.dropdown').dropdown();
  $('.ui.dropdown').dropdown('setting', 'onChange', function(value,text) {      
      var userId = Session.get("active_scout");
      var scoutStatusCode = value;      
      Meteor.call('upsertScout', 'scoutStatusCode', userId, scoutStatusCode);
      $('.ui.dropdown').dropdown('set text', getScoutStatus(scoutStatusCode));  
    });
  
}

var okCancelEvents = function (selector, callbacks) {
  var ok = callbacks.ok || function () {};
  var cancel = callbacks.cancel || function () {};

  var events = {};
  events['keyup '+selector+', keydown '+selector+', focusout '+selector] =
    function (evt) {
      if (evt.type === "keydown" && evt.which === 27) {
        // escape = cancel
        cancel.call(this, evt);

      } else if (evt.type === "keyup" && evt.which === 13 ||
                 evt.type === "focusout") {
        // blur/return/enter = ok/submit if non-empty
        var value = String(evt.target.value || "");
        if (value)
          ok.call(this, value, evt);
        else
          cancel.call(this, evt);
      }
    };

  return events;
};

Template.scoutAendern.events(okCancelEvents(
  '#scoutName',
  {
    ok: function (value) {
    	var userId = Session.get("active_scout");
    	var scoutName=value;
		Meteor.call('upsertScout', 'scoutName', userId, scoutName);    	      
    },
    cancel: function () {
      Session.set('active_scout', null);
    }
  }));

Template.scoutAendern.events(okCancelEvents(
  '#scoutLand',
  {
    ok: function (value) {
    	var userId = Session.get("active_scout");
    	var scoutLand=value;
		Meteor.call('upsertScout', 'scoutLand', userId, scoutLand);    	      
    },
    cancel: function () {
      Session.set('active_scout', null);
    }
  }));

Template.scoutAendern.events(okCancelEvents(
  '#scoutId',
  {
    ok: function (value) {
    	var userId = Session.get("active_scout");
    	var scoutId=value;
		Meteor.call('upsertScout', 'scoutId', userId, scoutId);    	      
    },
    cancel: function () {
      Session.set('active_scout', null);
    }
  }));

Template.scoutAendern.events(okCancelEvents(
  '#scoutBudget',
  {
    ok: function (value) {
      var userId = Session.get("active_scout");
      var scoutBudget=value;
    Meteor.call('upsertScout', 'scoutBudget', userId, scoutBudget);           
    },
    cancel: function () {
      Session.set('active_scout', null);
    }
  }));



Template.suser.events(okCancelEvents(
  '#scoutName',
  {
    ok: function (value) {
      var userId = Meteor.userId()
      var scoutName=value;
    Meteor.call('upsertScout', 'scoutName', userId, scoutName);           
    }
  }));


Template.suser.events(okCancelEvents(
  '#scoutId',
  {
    ok: function (value) {
      var userId = Meteor.userId()
      var scoutId=value;
    Meteor.call('upsertScout', 'scoutId', userId, scoutId);           
    }
  }));

Template.suser.scout = function () {
    console.log('huh');
    console.log(Meteor.userId());
    var scout = scouts.findOne({userId: Meteor.userId()});
    console.log(scout.scoutId);
    console.log(scout.scoutName);
    return scout;
  };
