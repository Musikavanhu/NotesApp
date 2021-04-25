const paths = require("path");

module.exports = function(app){

    app.get("/notes", function(req,res){
        res.sendFile(paths.join(__dirname, "../public/notes.html"));
    });
app.get("*", function(req,res){
    res.sendFile(paths.join(__dirname,"../public/index.html"));
});
};