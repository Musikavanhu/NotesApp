const notes_info = require("../db/note_data");

module.exports = function(app) {
    app.get("/api/notes", function(req,res){
        res.json(notes_info);
    });

    app.posts("/api/notes/", function(res,res) {
        notes_info.push(req.body);
        res.json(true);
    })

app.delete("/api/notes/", function(req,res){
    notes_info.length = 0;

    res.json({ok: true});
})


};


