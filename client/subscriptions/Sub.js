Meteor.subscribe('verlage');
Meteor.subscribe('noten');
Meteor.subscribe('scouts');
Meteor.subscribe('users');
Meteor.subscribe('wetten');
Meteor.subscribe('statistik');

var SPIELE_INCREMENT = 20;
Session.setDefault('spieleLimit', SPIELE_INCREMENT);
Deps.autorun(function() {    
	Meteor.subscribe('spiele', Session.get('spieleLimit'));
});
