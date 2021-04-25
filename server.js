var express = require("express");
var paths = require("path");
var fs =require("fs");
var util = require("util");

var app = express();

var PORT = process.env.PORT || 8000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(paths.join(__dirname, "./public")));

const writeFileA = util.promisify(fs.watchFile);
const readFileA = util.promisify(fs.readFile);
let allNotes;

app.get("/notes", function(req, res){
    res.sendFile(paths.join(__dirname, "./public/assets/notes.html"));
});
app.get("/", function(req, res){
    res.sendFile(paths.join(__dirname, "./public/assets/index.html"));
});
app.get("/api/notes", function(req, res){
    readFileA(paths.join(__dirname, "./db/db.json"), "utf8"
    ) .then(function(data){
        return res.json(JSON.parse(data));
    });
});
app.post("/api/notes", function(req, res){
    var newNote = req.body;
    readFileA(paths.join(__dirname, "./db/db.json"), "utf8").then(function (data){
        allNotes = JSON.parse(data);
        if (newNote.id || newNote.id === 0){
            let currentNote = allNotes[newNote.id];
            currentNote.title = newNote.title;
            currentNote.text = newNote.text;
        } else {
            allNotes.push(newNote);
        }
        writeFileA(paths.join(__dirname, "./db/db.json"), JSON.stringify(allNotes))
        .then(function(){
            console.log("wrote to json");
        })
    });
res.json(newNote);
});
app.delete("/api/notes/:id", function(req, res){
    var id = req.params.id;
    readFileA(paths.join(__dirname, "./db/db,json"), JSON.stringify(allNotes))
    .then(function (){
        console.log("Delted json");
    })

res.join(id);
});
app.listen(PORT, function(){
    console.log("listening to PORT" + PORT);
});