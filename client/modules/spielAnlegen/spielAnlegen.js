Template.spielAnlegen.rendered = function(){
    console.log('Spiel anlegen gerendert');
    $('.ui.form').form();
}


Template.spielAnlegen.events({
	'click .cre': function(theEvent, theTemplate){
		console.log('Spiel Angelegt?');
		theEvent.preventDefault();		
		var spiel = theTemplate.find('#neuspiel').value;
		var verlag = theTemplate.find('#neuverlag').value;
		var autor = theTemplate.find('#neuautor').value;
    var quote = theTemplate.find('#neuquote').value;
    var wertung = theTemplate.find('#neuwertung').value;
		Meteor.call('insertSpiel', spiel, verlag, autor, quote, wertung);	
	}
});

Template.spielAnlegen.settings = function() {
  return {
   position: "bottom",
   limit: 10,
   rules: [
     {
       collection: verlage,
       field: "verlag",
       template: Template.verlagPick,
       options: 'i',
       matchAll: true
     }            
   ]
  }
};
