Template.verlagAnlegen.rendered = function(){
	console.log('verlag anlegen gerendert');
    $('.ui.form').form();
}


Template['verlagAnlegen'].helpers({
});

Template.verlagAnlegen.events({
	'click .cre': function(theEvent, theTemplate){
		console.log('Angelegt?');
		theEvent.preventDefault();		
		var verlag = theTemplate.find('#neuverlag').value;
		var stand = theTemplate.find('#neustand').value;
		Meteor.call('insertVerlag', verlag, stand);	
	}
});

