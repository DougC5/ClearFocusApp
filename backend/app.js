const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const todoRoutes = require("./routes/todos");

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
app.use(bodyParser.urlencoded({ extended: false}));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    next();
});

app.use("/api/todos", todoRoutes);


module.exports = app;