const fs = require('fs');
const chalk = require('chalk');
const addNote = function (title, description) {
    const notes = loadNotes();
    const duplicateNotes = notes.filter((note)=>{
        return note.title === title;
    });
    if (duplicateNotes.length === 0) {
        notes.push({
            title: title,
            description: description
        });
        saveNote(notes);
        console.log(chalk.green.inverse("New note added!"));
    } else {
        console.log(chalk.red.inverse("Note already taken!"));
    }
    
}

const loadNotes = function () {
    try{
        let dataBuffer = fs.readFileSync('notes.json');
        let notes = JSON.parse(dataBuffer.toString());
        return notes;
    } catch(e) {
        return [];
    }
}

const saveNote = function ( notes ) {
    if(notes){
        var noteJsonString = JSON.stringify(notes);
        fs.writeFileSync('notes.json', noteJsonString);
    }
}

const removeNote = function ( title ) {
    const notes = loadNotes();
    const notesToKeep = notes.filter(function(note){
        return note.title !== title;
    });
    saveNote(notesToKeep);
    console.log("Note rempoved: "+title);
}

const list = function(){
    const notes = loadNotes();
    notes.forEach(note => {
        console.log(chalk.blue.inverse(note.title));
    });
}

const readNote = (title) => {
    const notes = loadNotes();
    const note = notes.find( (note) => note.title === title );
    
    if(note){
        console.log(note.title);
    } else {
        console.log("No note find!");
    }
}
module.exports = {
    'add': addNote,
    'remove': removeNote,
    'list': list,
    'read': readNote
};