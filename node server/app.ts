import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import { saveData, findData, deleteData, updateData, regUser,findUser} from './controller';

// Connect to MongoDB
mongoose.connect('mongodb+srv://dikshanshagarwal12002:1234@tasklist.gkjiki2.mongodb.net/');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// POST route to create a task
app.post('/api/tasks', saveData);

// GET route to retrieve tasks for a specific date
app.get('/api/tasks', findData);

// DELETE route to delete a task
app.delete('/api/tasks/:id',deleteData);

// UPDATE route to update task
app.put('/api/tasks/:id',updateData)

//REGESTER user 
app.post('/api/regester', regUser)

//findig user
app.get('/api/regester', findUser)

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
