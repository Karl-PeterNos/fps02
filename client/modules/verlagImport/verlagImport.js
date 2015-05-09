Template.verlagImport.events({
  "change #verlagFiles": function(e) {
    console.log("Import");
    var files = e.target.files || e.dataTransfer.files;
    for (var i = 0, file; file = files[i]; i++) {
      if (file.type.indexOf("text") == 0) {
        var reader = new FileReader();
        reader.onloadend = function (e) {
          var text = e.target.result;
          console.log(text);
          var all = $.csv.toObjects(text, {separator:';'});
          console.log(all);
          _.each(all, function (entry) {
            console.log(entry.verlag);
            console.log(entry.stand);
            Meteor.call('insertVerlag', entry.verlag, entry.stand);            
          });
        };
        reader.readAsText(file);
      }
    }
  }
})