Template.spielAendern.rendered = function(){
	console.log('Spiel aendern gerendert');
    $('.ui.form').form();
}


Template.spielAendern.events({
	'click .chg': function(theEvent, theTemplate){
		console.log('Spiel Geaendert?');
		theEvent.preventDefault();
		var spielId = Session.get("active_spiel");
		var spiel = theTemplate.find('#chgspiel').value;
		var verlag = theTemplate.find('#chgverlag').value;
		var autor = theTemplate.find('#chgautor').value;
		var quote = theTemplate.find('#chgquote').value;
		var wertung = theTemplate.find('#chgwertung').value;
		Meteor.call('updateSpiel', spielId, spiel, verlag, autor, quote, wertung);	
	},
	'click .del': function(theEvent, theTemplate){
    	console.log("delete Spiel");
    	theEvent.preventDefault();
    	var spielId = Session.get("active_spiel");
    	Meteor.call('deleteSpiel', spielId);
	}
});

Template.spielAendern.spiel = function () {
    var spiel = spiele.findOne(Session.get("active_spiel"));
    return spiel;
  };

Template.spielAendern.rendered = function(){

	$('.ui.dropdown').dropdown();

}