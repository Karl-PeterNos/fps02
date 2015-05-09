Template. wetten.rendered = function(){
  $('.ui.popup').popup();
};

Template.wetten.getWette = function(){ 
  if(parseInt(this.wette)>0){
    return this.wette;
    }else{
    return 0;
    };
  };

Template.wette.getWette = function(){ 
  if(parseInt(this.wette)>0){
    return this.wette;
    }else{
    return 0;
    };
  };


Template.wetten.aktivSpiel = function(){
  if(this.wertung == "aktiv")
    return "green legal";
  return "red privacy";
};


Template.wetten.spiele = function(){
    var keyword  = Session.get("wettenFilter");
    var query = new RegExp( keyword, 'i' );    
    if(keyword){
      Session.set("spieleLimit",0);
    }
    $('.ui.sticky').sticky('refresh'); 
    return spiele.find( { $or: [{'spiel': query},
                                {'verlag': query},
                                {'autor': query}]},
                        {sort: {spiel: 1}} );    	
};

Template.wetten.joinWithWette = function(){
  var spiel = this;
  var wette = wetten.findOne({spielId: this._id});
  console.log("join wette");
  console.log(this._id);
  console.log(wette);  
  if(!wette)
    spiel.wette = 0;
  return _.extend(spiel, _.omit(wette, '_id'));
};

Template.wetten.moreResults = function() {
    // If, once the subscription is ready, we have less rows than we
    // asked for, we've got all the rows in the collection.  
  console.log("more?");
  if((spiele.find().count() < Session.get("spieleLimit")))
    return false;
  console.log("more!");  
  return true;
}

Template.wettensuche.getFilter = function() {
  return Session.get("wettenFilter");
}

Template.wettensuche.events({
  'keyup .wettenSuche': _.throttle(function (evt, theTemplate) {
      console.log("Keyup value: " + evt.which);
      var wettenFilter = theTemplate.find('#wettenFilter').value;
      Session.set("wettenFilter", wettenFilter);        
    },500)  
});


function istZahl (c) {
 return ((c >= 48 && c <= 57)||c==0||c==8);
}
Template.wette.events({
  'keypress': function(evt, tmpl){
    var keyCode = evt.which;
    console.log(keyCode);
    if(!istZahl(keyCode)){
      console.log("verboten");
      evt.preventDefault();
      return false;
    }
  }
});

var activateInput = function (input) {
  input.focus();
  input.select();
};

Template.wetten.events({    
  'click': function (evt, tmpl) { 
    if (this._id&&this.wertung=="aktiv"){        
      Session.set("active_spiel", this._id);
    }
    Deps.flush(); // force DOM redraw, so we can focus the edit field    
  }
});

Template.wetten.editing = function () {
  return Session.equals('active_spiel', this._id);
};

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

Template.wette.events(okCancelEvents(
  '#scoutWette',
  {
    ok: function (value) {
      var spielId = Session.get("active_spiel");
      var wette=value;
    Meteor.call('upsertWette', spielId, wette);
    },
    cancel: function () {
      Session.set('active_spiel', null);
    }
  }));


Template.wettverbrauch.getGesamtEinsatz = function(){
  var gesamtEinsatz = statistik.findOne({typ: 'gesamtEinsatz'});
  if(parseInt(gesamtEinsatz.wert)>0)
    return gesamtEinsatz.wert;
  return 0;
  
};


Template.wettverbrauch.getGesamtWetter = function(){
  var gesamtWetter = statistik.findOne({typ: 'gesamtWetter'});
  if(parseInt(gesamtWetter.wert)>0)
    return gesamtWetter.wert;
  return 0;
  
};

Template.wettverbrauch.spent = function(){
  var scout = scouts.findOne({userId: Meteor.userId()});
  if(parseInt(scout.scoutSpent)>0)
    return scout.scoutSpent;
  return 0;
  
};

Template.wettverbrauch.budget = function(){
  var scout = scouts.findOne({userId: Meteor.userId()});
  return scout.scoutBudget;
};

Template.wettverbrauch.percent = function(){
  var scout = scouts.findOne({userId: Meteor.userId()});
  return scout.scoutSpent/scout.scoutBudget;
};


Template.wettverbrauch.rendered = function(){  
  Meteor.setTimeout(function () {
    $('.ui.indicating.progress').progress();
  },300);
  Meteor.setTimeout(function () {
    $('.ui.sticky').sticky({ offset: 50, bottomOffset:50, context:"#navend"});
  },300);    
};

Template.wette.rendered = function(){  
  this.$('input').focus();  
};
 
// whenever #showMoreResults becomes visible, retrieve more results
function showMoreVisible() {
    var threshold, target = $("#showMoreResults");

    if (!target.length) return;
 
    threshold = $(window).scrollTop() + $(window).height() - target.height();    
    if (target.offset().top < threshold+1) {
   
        if (!target.data("visible")) {
            console.log("target became visible (inside viewable area)");
            target.data("visible", true);
            Session.set("spieleLimit",
                Session.get("spieleLimit") + 20);  
        }
              
    } else {
        if (target.data("visible")) {
            console.log("target became invisible (below viewable arae)");
            target.data("visible", false);
        }
    }       
}
 
// run the above func every time the user scrolls
$(window).scroll(showMoreVisible);

