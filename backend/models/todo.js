const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    type: {type: String, required: true},
    title: {type: String, required: true},
    notes: {type: String, default: 'No NOTES Defined'},
    project: {type: String, default: 'No PROJECT Defined'}, 
    children: {type: Array, default: ['Child 1', 'Child 2']},
    parent: {type: String, default: 'No PARENT Defined'},
});

module.exports = mongoose.model('Todo', todoSchema);