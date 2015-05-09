noten = new Meteor.Collection('noten', {
  schema: new SimpleSchema({
    spielId: {
      type: String,
      index: 1
    },
    note: {
      type: Number      
    },        
    noteChangedAt: { 
      type: Date,
      index: 1        
    },
    schulNote: {
      type: Number      
    },        
    userId: {
      type: String,
      index: 1
    },
    userWish: {
      type: Number,
      index: 1
    }
  })
});


// Collection2 already does schema checking
// Add custom permission rules if needed
noten.allow({
  insert : function () {
    return true;
  },
  update : function () {
    return true;
  },
  remove : function () {
    return true;
  }
});