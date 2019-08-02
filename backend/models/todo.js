const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User", require: true },
    type: {type: String, required: true},
    title: {type: String, required: true},
    notes: {type: String},
    parent: {type: String},
    color: {type: String},
    start: {type: Date},
    end: {type: Date},
    isScheduledCal: {type: Boolean},
    draggable: {type: Boolean, default: true},
    isFocus: {type: Boolean},
    resizable: {type: Object, default: {
        beforeStart: true, // this allows you to configure the sides the event is resizable from
        afterEnd: true
      }},
    
});

module.exports = mongoose.model('Todo', todoSchema);