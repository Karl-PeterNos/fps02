Meteor.publish('scouts', function () {
  console.log('getScouts');  
  if (Roles.userIsInRole(this.userId, "admin")) 
    return scouts.find();
  console.log('getScout');  
  return scouts.find({userId:this.userId});
});

Meteor.publish('users', function () {
  console.log('getUsers');  
  if (Roles.userIsInRole(this.userId, "admin"))
    return Meteor.users.find({},{fields:{'username':1, _id:1, roles:1 }});
  return Meteor.users.find({_id:this.userId},{fields:{'username':1, _id:1, roles:1 }});
});

Meteor.methods({
  'upsertScout': function(scoutKey, userId, scoutValue){
    if (!Roles.userIsInRole(this.userId, "admin")&&userId!=this.userId) return;
    console.log('UpdateBackend');
    console.log(userId);
    console.log(scoutKey);    
    console.log(scoutValue);          
    switch (scoutKey){
      case "scoutId": scouts.upsert({userId: userId},{$set:{scoutId:scoutValue} });break;
      case "scoutName": scouts.upsert({userId: userId},{$set:{scoutName:scoutValue} });break;        
      case "scoutLand": scouts.upsert({userId: userId},{$set:{scoutLand:scoutValue} });break;
      case "scoutBudget": 
        scouts.upsert({userId: userId},{$set:{scoutBudget:scoutValue} });
        if(scoutValue>0)
          Roles.addUsersToRoles(userId, "wetter");
        break;
      case "scoutStatusCode":                   
        if (scoutValue == "ext" || scoutValue == "abo" || scoutValue == "chk" ) 
          Roles.addUsersToRoles(userId, "scout");
        if (scoutValue == "del"){
          console.log('Status before deletion: '+scouts.findOne({userId: userId}).scoutStatusCode);

          if(scouts.findOne({userId: userId}).scoutStatusCode=='blk'||scouts.findOne({userId: userId}).scoutStatusCode=='del'){
//first block -> then delete , or: delete twice
            console.log('Delete User '+Meteor.users.findOne(userId).username);                        
            if(Meteor.users.findOne(userId).username!='kpn')
//never delete myself              
              Meteor.users.remove(userId);
            console.log('User deleted');
          }
        }
        scouts.upsert({userId: userId},{$set:{scoutStatusCode:scoutValue} });
        break;
    }
    if (!Roles.userIsInRole(this.userId, "wetter")&&userId==this.userId){
      var scout = scouts.findOne({userId:this.userId});
      console.log(scout.scoutName);          
      console.log(scout.scoutId);          
      if(scout.scoutName!='' && scout.scoutId!=''){
        console.log("add wetter");          
        Roles.addUsersToRoles(userId, "wetter");
      }
    }      
    if (!Roles.userIsInRole(this.userId, "admin")&&userId!==this.userId){
      var scout = scouts.findOne({userId:userId});
      console.log(scout.scoutName);          
      console.log(scout.scoutId);          
      if(scout.scoutName!='' && scout.scoutId!=''){
        console.log("add wetter");          
        Roles.addUsersToRoles(userId, "wetter");
      }
    }     
  }
});

Accounts.onCreateUser(function(options,user){
  Roles.setUserRoles(user._id, "wetter");  
  console.log(Roles.getRolesForUser(user._id));
  scouts.upsert({userId: user._id},{$set:{scoutBudget:'2000'} });
  console.log(user._id);
  return user;
});