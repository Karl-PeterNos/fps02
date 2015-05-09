Template.verlage.verlage = function(){
	return verlage.find({},{sort: {verlag: 1, stand: 1}});
};

Template.verlage.active = function () {
	var active = Session.equals("active_verlag", this._id) ? "active" : '';
	console.log(active);
	return active;
};

Template.verlage.get_active = function () {
	return Session.get("active_verlag");
};

Template.verlage.events({
	'click': function () {
		if (this._id){
			console.log("verlag click");		
  			Session.set("active_verlag", this._id);
  		}
	}
});

