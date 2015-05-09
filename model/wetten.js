wetten = new Meteor.Collection('wetten', {
  schema: new SimpleSchema({
    spielId: {
      type: String,
      index: 1
    },
    wette: {
      type: Number      
    },        
    wetteChangedAt: { 
      type: Date,
      index: 1        
    },
    userId: {
      type: String,
      index: 1
    },
  })
});


// Collection2 already does schema checking
// Add custom permission rules if needed
wetten.allow({
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


statistik = new Meteor.Collection('statistik', {
  schema: new SimpleSchema({
    typ: {
      type: String,
      index: 1
    },
    wert: {
      type: Number      
    }
  })
});


// Collection2 already does schema checking
// Add custom permission rules if needed
statistik.allow({
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