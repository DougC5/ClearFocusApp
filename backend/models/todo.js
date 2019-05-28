const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    title: {type: String, required: true},
    project: {type: String, default: 'No Project Defined'}
});

module.exports = mongoose.model('Todo', todoSchema);