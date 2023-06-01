const collection = require('./mongodb')

const Todo = require('./mongodb-todo'); // Import the Todo model

const toDoApp = async (req, res) => {
  try {
    const { userId } = req.params; // Access the authenticated user information from the request object
    console.log(userId)
    // Retrieve the todo list for the user from the database
    const todoList = await Todo.find({ userId: userId });
    console.log(todoList)

    res.json(todoList);
  } catch (error) {3
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



const fetchTodo = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Retrieve the user's todos using the user's userId
    const todos = await Todo.find({ userId });

    // Create a response object that includes the todos and the userId
    const response = {
      todos,
      userId
    };

    res.json(response);
  } catch (error) {
    console.error('Error retrieving todos:', error);
    res.status(500).send('Internal server error');
  }
};





// Example route to create a new todo item
const toDoPost = async (req, res) => {
  try {
    const { title, userId } = req.body;
console.log(req.body)
  

// Validate the input
    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }


  // Create a new todo item in the database
  const newTodo = new Todo({
    userId: userId,
    title: title,
    // completed: completed,
  });

  await newTodo.save();

  res.status(201).json(newTodo);
} catch (error) {
  console.log(error);
  res.status(500).json({ message: 'Internal server error' });
}
};


// ...

// Example route to delete a todo item
const mongoose = require('mongoose');

// Example route to delete a todo item
const toDoDelete = async (req, res) => {
  try {
    const  id = req.params.id;
    // console.log(req.params.id)
    console.log(id,'hrllo?' )
   
  
    const deletedTodo = await Todo.findOneAndDelete({ _id:id });
    console.log(deletedTodo,"hello")
// console.log(deletedTodo)
    if (!deletedTodo) {
      return res.status(404).json({ message: 'Todo item not found' });
    }

    res.json({ message: 'Todo item deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



// Example route to update a todo item
const toDoUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;

    // Update the todo item in the database
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { title },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: 'Todo item not found' });
    }

    res.json({ message: 'Todo item updated successfully', todo: updatedTodo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};




module.exports = { toDoApp, toDoPost, toDoDelete, toDoUpdate, fetchTodo };
