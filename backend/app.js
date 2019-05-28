const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Todo = require('./models/todo');

const app = express();

mongoose.connect("mongodb+srv://RWuser:4am5BT89G4NoNU@cluster0-2yhie.mongodb.net/clearfocus?retryWrites=true", { useNewUrlParser: true })
.then(() => {
    console.log('connected to the database!!!');
})
.catch((err) => {
    console.error('connection failed', err.stack);
});

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    next();
});

app.post('/api/todos', (req, res, next)=>{
    const todo = new Todo({
        title: req.body.title,
        project: req.body.project
    });
    console.log(todo);
    todo.save();
    res.status(201).json({
        message: 'todo added successfully'
    });
});

app.get('/api/todos', (req, res, next)=>{
    Todo.find()
    .then(documents =>{
        console.log(documents);
        res.status(200).json({
            message: 'Todos fetched successfully',
            todos: documents 
        });
    });
    
});

module.exports = app;