const express = require('express');
const collection= require('./mongodb')
const app = express();
const cors = require('cors');
app.use(cors());



const bodyParser = require('body-parser');

const signup= require('./signup-db')
const Login = require("./login-db")
const { toDoApp, toDoPost, toDoDelete, toDoUpdate, fetchTodo } = require('./todo');
const authMiddleware = require('./authMiddleware ')


const mongoose = require('mongoose');
const Todo = require('./mongodb-todo');
mongoose.connect("mongodb+srv://sheikhzohaib:apple123@cluster0.n0sgobn.mongodb.net/?retryWrites=true&w=majority" , {useNewUrlParser: true , useUnifiedTopology :true})

.then(()=>{
    console.log("mongodb connect")
})

.catch(()=>{
    console.log("mongodb not connected")
})




app.use(express.json());


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



// Handle signup request
app.post('/signup', signup);

// Handle login request
app.post('/login', Login);

//Handle todopost request

app.get('/fetch/:userId', fetchTodo)

app.post('/gettodo/:userId', toDoApp);
app.post('/posttodo/:userId', toDoPost);
app.delete('/deletetodo/:id', toDoDelete);
app.put('/updatetodo/:id', toDoUpdate);

//  app.post('/gettodo/:userId', toDoApp)
//  app.post('/posttodo', toDoPost)
//  app.delete('/deletetodo/:id', toDoDelete);
//  app.put('/updatetodo/:id', toDoUpdate);

app.listen(3002, () => {
  console.log('Server started on port 3002');
});
