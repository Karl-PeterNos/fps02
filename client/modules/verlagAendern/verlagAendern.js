Template.verlagAendern.rendered = function(){
	console.log('verlag aendern gerendert');
    $('.ui.form').form();
}


Template.verlagAendern.events({
	'click .chg': function(theEvent, theTemplate){
		console.log('Geaendert?');
		theEvent.preventDefault();
		var verlagId = Session.get("active_verlag");
		var verlag = theTemplate.find('#chgverlag').value;
		var stand = theTemplate.find('#chgstand').value;
		Meteor.call('updateVerlag', verlagId, verlag, stand);	
	},
	'click .del': function(theEvent, theTemplate){
    	console.log("delete");
    	theEvent.preventDefault();
    	var verlagId = Session.get("active_verlag");
    	Meteor.call('deleteVerlag', verlagId);
	}
});

Template.verlagAendern.verlag = function () {
    var verlag = verlage.findOne(Session.get("active_verlag"));
    return verlag;
  };