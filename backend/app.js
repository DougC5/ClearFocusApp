const express = require('express');
const bodyParser = require('body-parser');

const app = express();

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
    const todo = req.body;
    console.log(todo);
    res.status(201).json({
        message: 'todo added successfully'
    });
});

app.get('/api/todos', (req, res, next)=>{
    const todos = [
        {
            id: '1gfgdf555',
            title: 'todo 1 from server'
        },
        {
            id: 'josdhgr85',
            title: 'Second todo 2 from server'
        },
        {
            id: 'iuwhefnjd87t',
            title: 'Third todo 3 from server'
        }
    ];
    res.status(200).json({
        message: 'Todos fetched successfully',
        todos: todos 
    });
});

module.exports = app;