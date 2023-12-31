import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import { saveData, findData, deleteData, updateData, regUser, findUser, findEmail, updatePassword } from './controller';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import { Task } from './model';

// Connect to MongoDB
mongoose.connect('mongodb+srv://dikshanshagarwal12002:1234@tasklist.gkjiki2.mongodb.net/');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Swagger options
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Timed Task API',
      version: '1.0.0',
      description: 'API endpoints for managing tasks',
    },
    servers: [
      {
        // url: 'https://timedlog-backend.onrender.com/',
         url: 'http://localhost:3000/',
      },
    ],
  },
  apis: ['./app.ts'],
};

// Swagger specification
const swaggerSpec = swaggerJSDoc(swaggerOptions);

// Serve Swagger UI
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       properties:
 *         Starttime:
 *           type: string
 *         Endtime:
 *           type: string
 *         Minute:
 *           type: number
 *         Taskdesc:
 *           type: string
 *         date:
 *           type: string
 *         username:
 *           type: string
 *         email:
 *           type: string
 *     User:
 *       type: object
 *       properties:
 *         Username:
 *           type: string
 *         Password:
 *           type: string
 *         Email:
 *           type: string
 */

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Create a task
 *     description: Endpoint to create a new task.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       200:
 *         description: Task created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       500:
 *         description: Error saving task.
 */
app.post('/api/tasks', saveData);

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Get tasks
 *     description: Endpoint to get all tasks.
 *     responses:
 *       200:
 *         description: Successful operation.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *       500:
 *         description: Error retrieving tasks.
 */
app.get('/api/tasks', findData);

/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Delete a task
 *     description: Endpoint to delete a task.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the task to delete.
 *     responses:
 *       200:
 *         description: Task deleted successfully.
 *       500:
 *         description: Error deleting task.
 */
app.delete('/api/tasks/:id', deleteData);

/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     summary: Update a task
 *     description: Endpoint to update a task.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the task to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       200:
 *         description: Task updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       500:
 *         description: Error updating task.
 */
app.put('/api/tasks/:id', updateData);

/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Register a user
 *     description: Endpoint to register a new user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User registered successfully.
 *       500:
 *         description: Error registering user.
 */
app.post('/api/register', regUser);

/**
 * @swagger
 * /api/register:
 *   get:
 *     summary: Find a user
 *     description: Endpoint to find a user.
 *     responses:
 *       200:
 *         description: Successful operation.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Error finding user.
 */
app.get('/api/register', findUser);

/**
 * @swagger
 * /api/findEmail:
 *   get:
 *     summary: Find an email
 *     description: Endpoint to find an email.
 *     parameters:
 *       - in: query
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         description: Email to find.
 *     responses:
 *       200:
 *         description: Successful operation.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Email not found.
 *       500:
 *         description: Error retrieving email data.
 */
app.get('/api/findEmail', findEmail);

/**
 * @swagger
 * /api/updatePassword:
 *   put:
 *     summary: Update user password
 *     description: Endpoint to update user password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               email:
 *                 type: string
 *               newPassword:
 *                 type: string
 *             required:
 *               - email
 *               - newPassword
 *     responses:
 *       200:
 *         description: Password updated successfully.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Error updating password.
 */
app.get('/api/updatePassword', updatePassword);

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
