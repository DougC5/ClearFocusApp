const express = require("express");
const Todo = require('../models/todo');
const multer = require("multer");

const router = express.Router();
const checkAuth = require("../middleware/check-auth");


    // Multer for File Upload
// const MIME_TYPE_MAP = {

// };
    
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "backend/files");
//     },
//     filename: (req, file, cb) => {
//         const name = file.originalname.toLowerCase().split(' ').join('-');
//     }
// });

router.post('', checkAuth, (req, res, next)=>{
    console.log('*******is Focus: ', req.body.isFocus);
    const todo = new Todo({
        user: req.userData.userId,
        title: req.body.title,
        type: req.body.type,
        project: req.body.project,
        isScheduledCal: req.body.isScheduledCal,
        isFocus: req.body.isFocus
    });
    console.log(todo);
    todo.save().then(createdTodo =>{
        res.status(201).json({
            message: 'todo added successfully!!!',
            todoId: createdTodo._id,
            user: createdTodo.user
        });
    });
    
});

router.put('/:id', checkAuth, (req, res, next)=>{
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
    Todo.updateOne({_id: req.params.id, user: req.userData.userId}, todo).then(result => {
        console.log(result);
        if (result.nModified > 0){
            res.status(200).json({message: 'todo updated successfully!!!'});
        } else {
            res.status(401).json({message: 'Not Authorized'});
        }
    });
});

router.patch('/:id', checkAuth, (req, res, next)=>{
    const todo = new Todo({
        _id: req.body._id,
        isScheduledCal: req.body.isScheduledCal,
        start: req.body.start,
        end: req.body.end,
        isFocus: req.body.isFocus 
    });
    Todo.updateOne({_id: req.params.id, user: req.userData.userId}, todo).then(result => {
        console.log(result);
        if (result.nModified > 0){
            res.status(200).json({message: 'todo Calendar Patched successfully!!!'});
        } else {
            res.status(401).json({message: 'Not Authorized'});
        }
    });
});

router.get('', checkAuth, (req, res, next)=>{
    Todo.find({user: req.userData.userId})
    .then(documents =>{
        console.log('Docs', documents);
        res.status(200).json({
            message: 'Todos fetched successfully',
            todos: documents,
            
        });
    });
});

router.delete('/:id', checkAuth, (req, res, next) =>{
 console.log(req.params.id);
 Todo.deleteOne({_id: req.params.id, user: req.userData.userId})
.then(
    console.log( req.params.id + ' ***Deleted***')
);
 res.status(200).json({message: 'post deleted'});
});

module.exports = router;

