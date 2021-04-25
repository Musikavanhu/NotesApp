var $noteText = $(".note-textarea");
var $noteTitle = $(".note-title");
var $savedNoteButton = $(".save-note");
var $newNoteButton = $(".new-note");
var $noteList = $(".list-container .list-group");

var currentNotes = {};

var getNotes = function () {
    return $.ajax({
        url: "/api/notes/",
        method: "GET"
    });
};

var saveNote = function (note) {
    return $.ajax({
        url: "/api/notes/",
        data: note,
        method: "POST"
    });
};

var deleteNote = function(id){
    return $.ajax({
        url: "api/notes/" + id,
        method: "DELETE"
    });
};

var renderActiveNote = function() {
    $newNoteButton.hide();

    if (renderActiveNote.id){
        $noteTitle.attr("readonly", true);
        $noteText.attr("readonly", true );
        $noteTitle.val(currentNotes.title);
        $noteText.val(currentNotes.text);
    } else {
        $noteTitle.attr("readonly", false);
        $noteText.attr("readonly", false);
        $noteTitle.val("");
        $noteText.val("");

    }
};
var handleNotesSaved = function(){
    var newNote = {
        title: $noteTitle.val(),
        text: $noteText.val()
    };
    saveNote(newNote).then(function(date){
        getAndRenderNotes();
        renderActiveNote();
            });
        
    
};
var handleNoteDelete = function (event){
    event.stopPropagation();
    var note = $(this)
    .parent(".list-group-item")
    .data();
if (currentNotes.id === note.id){
    currentNotes = {};
}
deleteNote(note.id).then(function (){
    getAndRenderNotes();
    renderActiveNote();
})
};
 var handleNotes =function () {
     currentNotes = $(this).data();
     renderActiveNote();
 }
 var handleNewNotes = function (){
     currentNotes = {};
     renderActiveNote();
 };
 var handleRenderSave = function () {
     if (!$noteTitle.val().trim() || !$noteText.val().trim()){
         $savedNoteButton.hide();
     } else {
         $savedNoteButton.show();
     }
 };
 var renderNoteList = function(notes) {
     $noteList.empty();
     var noteListObjects = [];

     for (var i = 0; i < notes.length; i++) {
         var note = notes[i];

         var $li = ("<li class='list-group-item'>").data(note);
         var $span = $("<span>").text(note.title);
         var $delButton = $("<i class='fas fa-trash-alt float-right text-danger delete-note'>");
     
     $li.append($span, $delButton);
     noteListObjects.push($li);
     
        }
 $noteList.append(noteListObjects);
    };
    var getAndRenderNotes = function () {
        return getNotes().then(function (data){
            renderNoteList(data);
        });
    };

    $savedNoteButton.on("click", handleNotesSaved);
    $noteList.on("click", ".list-group-item", handleNotes);
    $newNoteButton.on("click", handleNotesSaved);
    $noteList.on("click", ".delete-note", handleNoteDelete);
    $noteList.on("keyup", handleRenderSave);
    $noteText.on("keyup". handleRenderSave);
    getAndRenderNotes();