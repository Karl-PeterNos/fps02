spieleUpload = new Meteor.Collection(null);

Template.spielImport.spieleUpload = function(){
    return spieleUpload.find({});
};

Template.spielImport.rendered = function () {
  $('.ui.checkbox').checkbox();  
};


Template.spielImport.events({    
  'change': function (evt, tmpl) { 
    if (Session.get(evt.target.name)) Session.set(evt.target.name, false); else Session.set(evt.target.name, true);
    console.log(Session.get(evt.target.name));
  }
});

Template.spielImport.events({
  "change #spielFiles": function(e) {
    var files = e.target.files || e.dataTransfer.files;
    for (var i = 0, file; file = files[i]; i++) {
      if (file.type.indexOf("text") == 0) {
        var reader = new FileReader();
        reader.onloadend = function (e) {
          var text = e.target.result;
          console.log(text);
          console.log(Session.get('semSepUpload'));
          if(Session.get('semSepUpload'))
            var all = $.csv.toObjects(text, {separator:';'});          
          else
            var all = $.csv.toObjects(text, {separator:','});                    
          spieleUpload.remove({});
          if(Session.get('echtUpload')&&Session.get('fullUpload'))
            Meteor.call('deleteAllSpiel');
          console.log(all);          
            _.each(all, function (entry) {      
            console.log( entry.spiel); 
            if(!entry.wertung)
              entry.wertung="aktiv";
            console.log( entry.spiel+' '+entry.verlag+' '+entry.autor+' '+entry.quote+' '+entry.wertung);       
            spieleUpload.insert({spiel: entry.spiel, verlag: entry.verlag, autor: entry.autor, quote: entry.quote, wertung: entry.wertung });
            if(Session.get('echtUpload'))
              Meteor.call('insertSpiel', entry.spiel, entry.verlag, entry.autor, entry.quote, entry.wertung);                        
          });
        }
        reader.readAsText(file);
      }
    }
  }
})