const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Todo = require('./models/todo');

const app = express();

// mongodb+srv://RWuser:4am5BT89G4NoNU@cluster0-2yhie.mongodb.net/clearfocus?retryWrites=true

mongoose.connect("mongodb+srv://CFAuser:IUPrXMgPSOZofFrA@cluster0-io0te.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true })
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
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    next();
});

app.post('/api/todos', (req, res, next)=>{
    const todo = new Todo({
        title: req.body.title,
        project: req.body.project
    });
    console.log(todo);
    todo.save().then(createdTodo =>{
        res.status(201).json({
            message: 'todo added successfully!!!',
            todoId: createdTodo._id
        });
    });
    
});

app.put('/api/todos/:id', (req, res, next)=>{
    const todo = new Todo({
        _id: req.body._id,
        title: req.body.title,
        project: req.body.project
    });
    Todo.updateOne({_id: req.params.id}, todo).then(result => {
        console.log(result);
        res.status(200).json({message: 'todo updated successfully!!!'})
    })
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

app.delete('/api/todos/:id', (req, res, next) =>{
 console.log(req.params.id);
 Todo.deleteOne({_id: req.params.id})
.then(
    console.log( req.params.id + ' ***Deleted***')
);
 res.status(200).json({message: 'post deleted'});
});



module.exports = app;