spiele = new Meteor.Collection('spiele', {
  schema: new SimpleSchema({
    spiel: {
      type: String,
      index: 1,
      unique: true
    },
    verlag: {
      type: String,
      optional: true      
    },    
    season: {
      type: String,
      optional: true      
    },    
    autor: {
      type: String,
      optional: true      
    },
    quote: {
      type: Number,
      optional: true
    },
    wetteGesamt: {
      type: Number,
      optional: true
    },
    wertung: {
      type: String,
      optional: true      
    },            
  })
});


// Collection2 already does schema checking
// Add custom permission rules if needed
spiele.allow({
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
