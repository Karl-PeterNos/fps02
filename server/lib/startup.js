
Meteor.startup(function () {

  	var users = [
      {username: "kpn" ,roles:['admin','scout','wetter']},
      {username: "kln" ,roles:['admin','scout','wetter']},
    ];

  	_.each(users, function (user) {
    	var id;
      console.log(user.username);    
      id = Meteor.users.findOne({username: user.username});
      console.log(id);    
      if (id) {
        Roles.addUsersToRoles(id, user.roles);
    }
  });

});