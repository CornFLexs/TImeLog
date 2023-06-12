const mongoose = require('mongoose')

// Define the schema for the task model
const taskSchema = new mongoose.Schema({
    Starttime: String,
    Endtime: String,
    Minute: Number,
    Taskdesc: String,
    date: String,
  });
  
  // Create the task model
  const Task = mongoose.model('Task', taskSchema);

  module.exports = Task;