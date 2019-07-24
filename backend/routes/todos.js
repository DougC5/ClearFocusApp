const express = require("express");
const Todo = require('../models/todo');

const router = express.Router();

router.post('', (req, res, next)=>{
    const todo = new Todo({
        title: req.body.title,
        type: req.body.type,
        project: req.body.project,
        isScheduledCal: req.body.isScheduledCal,
    });
    console.log(todo);
    todo.save().then(createdTodo =>{
        res.status(201).json({
            message: 'todo added successfully!!!',
            todoId: createdTodo._id
        });
    });
    
});

router.put('/:id', (req, res, next)=>{
    const todo = new Todo({
        _id: req.body._id,
        title: req.body.title,
        type: req.body.type,
        notes: req.body.notes,
        project: req.body.project,
        parent: req.body.parent,
        color: req.body.color,
        start: req.body.start,
        isScheduledCal: req.body.isScheduledCal,
        draggable: req.body.draggable

    });
    Todo.updateOne({_id: req.params.id}, todo).then(result => {
        console.log(result);
        res.status(200).json({message: 'todo updated successfully!!!'})
    })
});

router.patch('/:id', (req, res, next)=>{
    const todo = new Todo({
        _id: req.body._id,
        isScheduledCal: req.body.isScheduledCal,
        start: req.body.start,
        end: req.body.end
    });
    Todo.updateOne({_id: req.params.id}, todo).then(result => {
        console.log(result);
        res.status(200).json({message: 'todo Calendar Patched successfully!!!'});
    });
});

router.get('', (req, res, next)=>{
    Todo.find()
    .then(documents =>{
        console.log(documents);
        res.status(200).json({
            message: 'Todos fetched successfully',
            todos: documents 
        });
    });
});

router.delete('/:id', (req, res, next) =>{
 console.log(req.params.id);
 Todo.deleteOne({_id: req.params.id})
.then(
    console.log( req.params.id + ' ***Deleted***')
);
 res.status(200).json({message: 'post deleted'});
});

module.exports = router;