const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./notes.js');

yargs.version('1.0.0');

yargs.command({
    command: 'add',
    describe: 'Add Note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note Body',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function(argv){
        notes.add(argv.title, argv.body);
    }
});

yargs.command({
    command: 'remove',
    describe: 'Remove note',
    builder: {
        title: {
            describe: "Note Title",
            demandOption: true,
            type: 'string'
        }
    },
    handler: function(argv){
        notes.remove(argv.title);
    }
});

yargs.command({
    command: 'list',
    describe: 'List all notes...',
    handler(){
        notes.list();
    }
});

yargs.command({
    command: 'read',
    describe: 'Read note',
    builder: {
        title:{
            describe: "Note title",
            demandOption: true,
            type: "string"
        } 
    },
    handler: function(argv){
        notes.read(argv.title);
    }
})
yargs.parse();