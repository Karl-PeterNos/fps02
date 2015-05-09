verlage = new Meteor.Collection('verlage', {
  schema: new SimpleSchema({
    verlag: {
      type: String,
      index: 1,
      unique: true
    },
    stand: {
      type: String,
      optional: true
    }
  })
});


// Collection2 already does schema checking
// Add custom permission rules if needed
verlage.allow({
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
