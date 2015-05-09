Template.spiele.spiele = function(){
    var keyword  = Session.get("spielFilter");
    var query = new RegExp( keyword, 'i' );
    return spiele.find( { $or: [{'spiel': query},
                                {'verlag': query},
                                {'autor': query}] },
                        {sort: {spiele: 1}} );    	
};

Template.spiele.active = function () {
	var active = Session.equals("active_spiel", this._id) ? "active" : '';
	console.log(active);
	return active;
};

Template.spiele.wertungsFarbe = function(){ 
  switch (this.wertung){
    case 'aktiv': return "blue";
    case 'erfolg': return "green";
    case 'niete': return "red";    
  }
  return "teal";
};

Template.spiele.get_active = function () {
	return Session.get("active_spiel");
};

Template.spiele.events({
	'click': function () {
		if (this._id){
			console.log("spiel click");		
  			Session.set("active_spiel", this._id);
  		}
	}
});

Template.spiele.events({
  'keyup .spielSuche': function (evt, theTemplate) {
  	evt.preventDefault();
    console.log("Keyup value: " + evt.which);
    var spielFilter = theTemplate.find('#spielFilter').value;
    console.log(spielFilter);
    Session.set("spielFilter", spielFilter);    
  }
});