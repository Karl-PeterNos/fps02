Meteor.publish('noten', function () {
  if(this.userId){
    console.log('getnoten');  
    return noten.find({userId: this.userId});
  }else{
    console.log('NoUserNoNoten');  
  }
});

Meteor.methods({
  'upsertNote': function(spielId, note){
    if(this.userId){
      console.log('UpdateBackend');
      console.log(spielId);
      console.log(note);    
      console.log(this.userId);    
      var schulNote = 0;      
      if(note>0||note<6){
        schulNote = 6 - note;        
      }
      var noteChangedAt = new Date();      
      var alteNote = noten.findOne({spielId: spielId, userId: this.userId});
      if(alteNote&&alteNote.note == note)
        noteChangedAt = alteNote.noteChangedAt;            
      noten.upsert({spielId: spielId,  userId: this.userId},
            {$set: {note: note, schulNote: schulNote, noteChangedAt: noteChangedAt}}
      );    
    }else{
      console.log('NoUserNoUpdate');  
    }    
  }
});

Meteor.methods({
  'upsertUserWish': function(spielId, userWish){
    if(this.userId){
      console.log('UpdateBackend');
      console.log(spielId);
      console.log(userWish);    
      console.log(this.userId);    
      noten.upsert({spielId: spielId,  userId: this.userId},
            {$set: {userWish: userWish}}
      );    
    }else{
      console.log('NoUserNoUpdate');  
    }    
  }
});