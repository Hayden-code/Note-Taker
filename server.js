// DEPENDENCIES
const express = require('express');
const fs = require('fs');
const path = require('path');
const notes_db = require('public/assets/db.json')

// EXPRESS CONFIG
// Telling node we're creating an express server.
const app = express()
// Setting PORT
const PORT = process.env.PORT || 8080;

// Setting up app to pass data
app.use(express.urlencoded({extended : true}));
app.use(express.json());

// ROUTES

// Setting up route to notes.html
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

// Setting up route to db.json (notesStorage)
app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, notes_db));
});

// Route to homepage
app.get("homepage", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
});


// Storing notes and displaying them.
app.post("/api/notes", (req, res) => {
    var newNote = req.body;
    var noteList = JSON.parse(fs.readFileSync("assets/db.json", "utf8"));
    noteList.push(newNote);

    fs.writeFileSync("assets/db.json", JSON.stringify(noteList));
    res.JSON(noteList);
});

// app listener
app.listen(PORT, () => {
    console.log(`Note Taker is listening on port ${PORT}`);
});
