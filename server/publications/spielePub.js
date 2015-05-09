
Meteor.publish('spiele', function (limit) {
  
  console.log('getSpiele'+limit);    
  if(Roles.userIsInRole(this.userId, "admin")){
    if(limit>0)
      return spiele.find({ },{sort:{spiel: 1},limit:limit});
    return spiele.find({ },{sort:{spiel: 1}});
  }else{
    console.log('with quote');    
    if(limit>0)
      return spiele.find({'quote': {$gt: "0"}},{fields:{spielId:1, _id:1, spiel:1, autor:1, verlag:1, quote:1, wertung:1, wetteGesamt: 1},sort:{spiel: 1},limit:limit});
    return spiele.find({'quote': {$gt: "0"}},{fields:{spielId:1, _id:1, spiel:1, autor:1, verlag:1, quote:1, wertung:1, wetteGesamt: 1},sort:{spiel: 1}});                           
  }
});

Meteor.methods({
  'insertSpiel': function(spiel, verlag, autor, quote, wertung){
    if (!Roles.userIsInRole(this.userId, "admin")) return;
    console.log('InsertBackend');
    console.log(spiel);
    console.log(verlag);    
    console.log(autor);   
    console.log(wertung);   
    if(!(spiel)){
      console.log("Empty");    
    }
    else if(spiele.findOne({spiel:spiel})){
      spiele.upsert({spielId: spielId},
              {$set: {spiel: spiel, verlag: verlag, autor: autor, quote: quote, wertung: wertung }});
    }else{
      spiele.insert({
        spiel: spiel,
        verlag: verlag,
        autor: autor,
        quote: quote,    
        wertung: wertung
      }, function (error,result) {
        if(error)
          console.log("Error during Insert");
        else
          console.log("Insert Done");      
      }); 
    }
  },
  'updateSpiel': function(spielId, spiel, verlag, autor, quote, wertung){
    if (!Roles.userIsInRole(this.userId, "admin")) return;
    console.log('UpdateBackend');
    console.log(spiel);
    console.log(verlag);    
    console.log(autor);    
    console.log(wertung);   
    spiele.update(spielId, 
          {$set: {spiel: spiel, verlag: verlag, autor: autor, quote: quote, wertung: wertung}}
    );    
  },
  'deleteSpiel': function(spielId){
    if (!Roles.userIsInRole(this.userId, "admin")) return;
    console.log('DeleteBackend');
    spiele.remove(spielId); 
  },
  'deleteAllSpiel': function(spielId){
    if (!Roles.userIsInRole(this.userId, "admin")) return;    
    console.log('DeleteAllBackend');
    spiele.remove({}); 
  }   
});
