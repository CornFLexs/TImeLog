import { Request, Response } from 'express';
import { Task, ITask } from './model';
import { UserData , IUserData } from './model1';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from './config'; 

const saveData = (req: Request, res: Response) => {
  const task: ITask = new Task(req.body);
  task.save()
    .then((savedTask: ITask) => {
      res.json(savedTask);
      console.log("Success saving");
    })
    .catch((err: Error) => {
      console.error(err);
      res.status(500).send('Error saving task');
    });
};

const findData = (req: Request, res: Response) => {
  const { date } = req.query;
  Task.find({ date })
    .exec()
    .then((tasks: ITask[]) => {
      res.json(tasks);
      console.log("Success finding");
    })
    .catch((err: Error) => {
      console.error(err);
      res.status(500).send('Error retrieving tasks');
    });
};

const deleteData = (req: Request, res: Response) => {
  const { id } = req.params;
  Task.findByIdAndRemove(id)
    .then(() => {
      res.sendStatus(204);
      console.log("Success deleting");
    })
    .catch((err: Error) => {
      console.error(err);
      res.status(500).send('Error deleting task');
    });
};


const updateData = (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedTaskData: ITask = req.body;
  Task.findByIdAndUpdate(id, updatedTaskData, { new: true })
    .then((updatedTask: ITask | null) => {
      if (updatedTask) {
        res.json(updatedTask);
        console.log("Success updating");
      } else {
        res.status(404).send('Task not found');
      }
    })
    .catch((err: Error) => {
      console.error(err);
      res.status(500).send('Error updating task');
    });
};

const regUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const existingUser = await UserData.findOne({ Username: username }).exec();

    if (existingUser) {
      res.status(409).send('User already exists');
      return;
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const userData: IUserData = new UserData({ Username: username, Password: hashPassword });
    userData.save()
      .then((savedUserData: IUserData) => {
        res.json(savedUserData);
        console.log("Success saving");
      })
      .catch((err: Error) => {
        console.error(err);
        res.status(500).send('Error saving user data in database');
      });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error saving user data');
  }
};

const findUser = (req: Request, res: Response) => {
  const { username, password } = req.query;

  UserData.findOne({ Username: username })
    .exec()
    .then(async (userData: IUserData | null) => {
      if (userData) {
        const isPasswordMatch = await bcrypt.compare(password as string, userData.Password);

        if (isPasswordMatch) {
          const token = jwt.sign({ username: userData.Username }, JWT_SECRET, {expiresIn: '1h'});
          res.json({ token });
          console.log("Success finding user and generating JWT");
        } else {
          res.status(401).send('Invalid password');
        }
      } else {
        res.status(404).send('User not found');
      }
    })
    .catch((err: Error) => {
      console.error(err);
      res.status(500).send('Error retrieving user data');
    });
};


export { saveData, findData, deleteData, updateData, regUser, findUser };
