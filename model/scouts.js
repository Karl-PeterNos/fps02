scouts = new Meteor.Collection('scouts', {
  schema: new SimpleSchema({
    userId: {
      type: String,
      index: 1,
      unique: true
    },
    scoutId: {
      type: String,
      optional: true    
    },
    scoutStatusCode: {
      type: String,
      optional: true    
    },
    scoutLand: {
      type: String,
      optional: true    
    },        
    scoutName: {
      type: String,
      optional: true    
    },
    scoutBudget: {
      type: Number,
      optional: true
    },
    scoutSpent: {
      type: Number,
      optional: true
    }    
  })
});


// Collection2 already does schema checking
// Add custom permission rules if needed
scouts.allow({
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
