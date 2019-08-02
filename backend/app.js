const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const todoRoutes = require("./routes/todos");
const userRoutes = require("./routes/user")

const Todo = require('./models/todo');

const app = express();

// mongodb+srv://RWuser:4am5BT89G4NoNU@cluster0-2yhie.mongodb.net/clearfocus?retryWrites=true

mongoose.connect("mongodb+srv://CFAuser:" + process.env.MONGO_ATLAS_PW + "@cluster0-io0te.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true, useCreateIndex: true })
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
        'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    next();
});

app.use("/api/todos", todoRoutes);
app.use("/api/user", userRoutes);


module.exports = app;