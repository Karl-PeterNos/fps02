Router.map(function() {	
	this.route('home', {
		path: '/',
		template: 'suser',
		layoutTemplate: 'fpsLayout',
		waitOn: function () {  
  			return Meteor.subscribe('users');
  		},
		action: function () {	  
    		if (this.ready())
      			this.render();
    		else
      			this.render('Loading');
  		}		
	});
	this.route('spiele', 
		{layoutTemplate: 'fpsLayout',
		waitOn: function () {  
  			return Meteor.subscribe('spiele');
  		},
		action: function () {	  
    		if (this.ready())
      			this.render();
    		else
      			this.render('Loading');
  		}		
	});	
  this.route('scouts', 
    {layoutTemplate: 'fpsLayout',
    waitOn: function () {  
        return Meteor.subscribe('scouts');
      },
    action: function () {   
        if (this.ready())
            this.render();
        else
            this.render('Loading');
      }   
  });   	
	this.route('verlage', 		
		{layoutTemplate: 'fpsLayout',
		waitOn: function () {  
  			return Meteor.subscribe('verlage');
  		},
		action: function () {	  
    		if (this.ready())
      			this.render();
    		else
      			this.render('Loading');
  		}		
	});
	this.route('noten', {layoutTemplate: 'fpsLayout'});
  this.route('suser', {layoutTemplate: 'fpsLayout'});  
  this.route('wetten', {
    layoutTemplate: 'fpsLayout',
    waitOn: function () {  
        return Meteor.subscribe('scouts');
      },
    action: function () {   
        if (this.ready())
            this.render();
        else
            this.render('Loading');
      }   
  });
  this.route('auswerten', {layoutTemplate: 'fpsLayout'});  
  this.route('check', {layoutTemplate: 'fpsLayout'});  
});
