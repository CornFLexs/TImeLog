const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')

// Connect to MongoDB
mongoose.connect('mongodb+srv://dikshanshagarwal12002:1234@tasklist.gkjiki2.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const controller = require('./controller')

const app = express();
app.use(cors())

app.use(bodyParser.json());

// POST route to create a task
app.post('/api/tasks', controller.data_save);
 

// GET route to retrieve tasks for a specific date
app.get('/api/tasks', controller.data_find);


// DELETE route to delete a task
app.delete('/api/tasks/:id', controller.data_delete);


// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
