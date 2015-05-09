Meteor.publish('statistik', function () {
  if (Roles.userIsInRole(this.userId, "wetter")){
    console.log('get Stat');
    return statistik.find();
  }
});

Meteor.startup(function () {

  var queryWetten = wetten.find();
  var handleWetten = queryWetten.observe({    
    changed: function (neu, alt) {
      console.log('stat: Einsatz');  
      var gesamtEinsatz = 0;
      wetten.find({wette: {$gt: 0}}).forEach(function (wette) {
          gesamtEinsatz += wette.wette;
      });      
      console.log('wert:'+gesamtEinsatz); 
      statistik.upsert({typ:"gesamtEinsatz"},{$set: {typ:"gesamtEinsatz", wert: gesamtEinsatz}});
    },
    added: function (neu, alt) {
      console.log('stat: Einsatz');  
      var gesamtEinsatz = 0;
      wetten.find({wette: {$gt: 0}}).forEach(function (wette) {
          gesamtEinsatz += wette.wette;
      });      
      console.log('wert:'+gesamtEinsatz); 
      statistik.upsert({typ:"gesamtEinsatz"},{$set: {typ:"gesamtEinsatz", wert: gesamtEinsatz}});
    }
  });

  var queryUsers = Meteor.users.find();
  var handleUsers = queryUsers.observe({    
    changed: function (neu, alt) {
      console.log('stat: Wetter');  
      var gesamtWetter = Roles.getUsersInRole("wetter").count();
      console.log('wert:'+gesamtWetter); 
      statistik.upsert({typ:"gesamtWetter"},{$set: {typ:"gesamtWetter", wert: gesamtWetter}});
    }
  });
});  


Meteor.publish('wetten', function () {
  if(this.userId){
    console.log('getwetten');  
    console.log(wetten.find({userId: this.userId}).fetch());
    
    return wetten.find({userId: this.userId});
  }else{
    console.log('NoUserNoWetten');  
  }
});

Meteor.methods({
  'upsertWette': function(spielId, wette){
    if(this.userId){
      console.log("spiel:"+spielId);
      console.log(spiele.findOne(spielId));
      if(spiele.findOne(spielId).wertung=="aktiv"){
        console.log('UpdateBackend');
        console.log("spiel:"+spielId);
        console.log(wette);    
        console.log("user:"+this.userId);    
        var alteWette = wetten.findOne({spielId: spielId, userId: this.userId});
        var scout = scouts.findOne({userId: this.userId});            
        var spent = parseInt(0);
        console.log(parseInt(scout.scoutSpent));
        if(!parseInt(scout.scoutSpent)){      
          spent = parseInt(0);        
          console.log('test');        
        }else{
          spent = parseInt(scout.scoutSpent);      
          console.log('test2');        
        }
        console.log('SpentAlt:'+spent);
        if(alteWette){
          spent -= parseInt(alteWette.wette);
          console.log('AlteWette'+alteWette.wette);
        }
        wette = parseInt(wette);
        if(wette<0) wette = parseInt(0);
        spent += parseInt(wette);                  
        console.log('SpentNeu:'+spent);      
        if(scout.scoutBudget>=spent){
          var wetteChangedAt = new Date();            
          if(alteWette&&alteWette.wette == wette)
            wetteChangedAt = alteWette.wetteChangedAt;            
          wetten.upsert({spielId: spielId,  userId: this.userId},
                {$set: {wette: wette, wetteChangedAt: wetteChangedAt}}
          );  
          scouts.upsert({userId: this.userId}, {$set: {scoutSpent: spent}});    
          var wettDelta = parseInt(wette)
          if(alteWette)
            wettDelta -=  parseInt(alteWette.wette);
          spiele.update(spielId,
                {$inc: {wetteGesamt: wettDelta}} );
          console.log('Delta'+wettDelta); 
        }
        else
        {
          console.log('Spiel kann nicht bewettet werden');      
        }
      }
    }else{
      console.log('NoUserNoUpdate');  
    }    
  },
  'resetWetten': function(){
    if (Roles.userIsInRole(this.userId, "admin")){
     
      console.log('Reset aller Wetten');
      wetten.remove({});
      scouts.update({},{$set: {scoutSpent:0, scoutBudget:2000}},{multi:true});      
      spiele.update({},{$set: {wetteGesamt:0}},{multi:true});

    }
  }
});
