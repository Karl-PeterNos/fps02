Meteor.publish('verlage', function () {
  console.log('getVerlage');	
  return verlage.find();
});

Meteor.methods({
	'insertVerlag': function(verlag, stand){
		if (!Roles.userIsInRole(this.userId, "admin")) return;
		console.log('InsertBackend');
		console.log(stand);
		console.log(verlag);		
		if((verlage.findOne({verlag:verlag}))||!(verlag)){
			console.log("Duplicate or empty");		
		}else{
			verlage.insert({
				verlag: verlag,
				stand: stand
			}, 
			function (error,result) {
		    	if(error)
	    	    	console.log("Error during Insert");
	      		else
	        		console.log("Insert Done");      
	    	});	
		}
	},
	'updateVerlag': function(verlagId, verlag, stand){
		if (!Roles.userIsInRole(this.userId, "admin")) return;
		console.log('UpdateBackend');
		console.log(stand);
		console.log(verlag);		
		verlage.update(verlagId, 
					{$set: {verlag: verlag, stand: stand}}

		);		
	},
	'deleteVerlag': function(verlagId){
		if (!Roles.userIsInRole(this.userId, "admin")) return;
		console.log('DeleteBackend');
		verlage.remove(verlagId);	
	}		
});

Meteor.startup(function () {
  	
	var query = verlage.find();
	var handle = query.observe({
		changed: function (verlagNeu, verlagAlt) {
			if(verlagNeu.verlag != verlagAlt.verlag){
				console.log("changed"+verlagAlt.verlag+" to "+verlagNeu.verlag);			
			   	spiele.update({verlag: verlagAlt.verlag},{set: {verlag: verlagNeu.verlag}},{multi:true, upsert:false})
			}
		}
	});
});