import { Document, model, Schema } from 'mongoose';

export interface ITask extends Document {
  Starttime: string;
  Endtime: string;
  Minute: number;
  Taskdesc: string;
  date: string;
  username:string
}

const taskSchema = new Schema<ITask>({
  Starttime: String,
  Endtime: String,
  Minute: Number,
  Taskdesc: String,
  date: String,
  username: String
});

export const Task = model<ITask>('Task', taskSchema);

