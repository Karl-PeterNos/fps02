var getWishIcon = function(userWish){
  switch (userWish){
    case 1: return "red bookmark link icon";
    case 3: return "disabled ban circle link icon";
    case 2: return "green thumbs up link icon";
    default:  return "blue bookmark empty link icon";
  }
}
 

Template.noten.spiele = function(){
    var keyword  = Session.get("notenFilter");
    var query = new RegExp( keyword, 'i' );
    return spiele.find( { $or: [{'spiel': query},
                                {'verlag': query},
                                {'autor': query}] },
                        {sort: {spiele: 1}} );    	
};

Template.noten.rbt = function(refNote){
  if (!this.note||this.note==0)
    return "empty star icon";
  if (this.note-refNote>=0)
    return "star icon";
  return "empty star icon";
}

Template.noten.joinWithNote = function(){
  var spiel = this;
  var note = noten.findOne({spielId: this._id});
  console.log("join");
  console.log(this._id);
  console.log(note);  
  return _.extend(spiel, _.omit(note, '_id'));
};


Template.noten.userWishIcon = function(){ return getWishIcon(this.userWish);};

Template.notensuche.events({
  'keyup .notenSuche': function (evt, theTemplate) {

    console.log("Keyup value: " + evt.which);
    var notenFilter = theTemplate.find('#notenFilter').value;
    console.log(notenFilter);
    Session.set("notenFilter", notenFilter);    

  }
});

var activateInput = function (input) {
  input.focus();
  input.select();
};

Template.noten.events({
  'mouseenter': function () {
    if (this._id){        
        console.log("mouse enter");
        Session.set("active_spiel", this._id);
      }
  }
});

Template.noten.editing = function () {
  return Session.equals('active_spiel', this._id);
};

Template.wertung.events({
  'click #userWish': function() {
    console.log("wishclick");
    var spielId = Session.get("active_spiel");    
    var userWish = this.userWish;    
    if(!userWish)
      userWish = 0;
    userWish++;
    if(userWish > 3)
      userWish = 0;
    Meteor.call('upsertUserWish', spielId, userWish);
    Deps.flush();
  }

});

Template.wertung.userWishIcon = function(){ return getWishIcon(this.userWish);};

Template.wertung.rendered = function(){       

  console.log("Noten Rendered");   
  Meteor.setTimeout(function () {   

    $('.ui.rating').rating();
    $('.ui.rating').rating('setting', 'onRate', function(value) {      
      console.log("Rate Callback called");
      var note = value;
      console.log(note);
      var spielId = Session.get("active_spiel");
      console.log(spielId);
      Meteor.call('upsertNote', spielId, note);
    });
    $('.ui.popup').popup();    
    $('.ui.rating').rating('setting', 'clearable', true);
    $('.ui.rating').rating('setting', 'interactive', true);  
    } , 100);  
}
