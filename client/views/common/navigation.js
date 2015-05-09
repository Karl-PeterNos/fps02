Template.registerHelper('activeRouteClass', function () {/* routes names */
	console.log('Navigation');
	var args = Array.prototype.slice.call(arguments, 0),
    	active;
	args.pop();

	active = _.any(args, function (name) {
    	return Router.current().route.name === name;
	});
	if (active) {
    	return 'active';
	}
	return '';
});



Accounts.ui.config({
   passwordSignupFields: 'USERNAME_AND_EMAIL'
});