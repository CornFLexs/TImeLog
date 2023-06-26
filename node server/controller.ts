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
  const { date, username } = req.query;
  Task.find({ date, username })
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
    const { username, password, email } = req.body;
    const existingUser = await UserData.findOne({ Username: username }).exec();
    const existingEmail = await UserData.findOne({ Email: email }).exec();

    if (existingUser) {
      res.status(409).send('Username already exists');
      return;
    }
    if (existingEmail) {
      res.status(409).send('Email already exists');
      return;
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const userData: IUserData = new UserData({ Username: username, Password: hashPassword, Email: email });
    userData.save()
      .then((savedUserData: IUserData) => {
        res.json(savedUserData);
        console.log("Success saving");
      })
      .catch((err: Error) => {
        console.error(err);
        res.status(500).send('Error saving user data in the database');
      });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error saving user data');
  }
};


const findUser = (req: Request, res: Response) => {
  const { email, password } = req.query;

  UserData.findOne({ Email: email })
    .exec()
    .then(async (userData: IUserData | null) => {
      if (userData) {
        const isPasswordMatch = await bcrypt.compare(password as string, userData.Password);

        if (isPasswordMatch) {
          const token = jwt.sign({ username: userData.Username }, JWT_SECRET, { expiresIn: '1h' });
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

const findEmail = (req: Request, res: Response) => {
  const { email } = req.query;

  UserData.findOne({ Email: email })
    .exec()
    .then((userData: IUserData | null) => {
      if (userData) {
        res.json(userData);
        console.log("Success finding email");
      } else {
        res.status(404).send('Email not found');
      }
    })
    .catch((err: Error) => {
      console.error(err);
      res.status(500).send('Error retrieving email data');
    });
};

const updatePassword = async (req: Request, res: Response) => {
  const email = req.query.email;
  const newPassword = req.query.newPassword as string;

  try {
    const userData = await UserData.findOne({ Email: email }).exec();

    if (userData) {
      const hashPassword = await bcrypt.hash(newPassword, 10);
      userData.Password = hashPassword;
      await userData.save();
      res.status(200).json({ message: 'Password updated successfully' });
      console.log("Success updating password");
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating password' });
  }
};
export { saveData, findData, deleteData, updateData, regUser, findUser , findEmail  , updatePassword };
