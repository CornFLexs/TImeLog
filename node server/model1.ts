import { Document, model, Schema } from 'mongoose';

export interface IUserData extends Document {
  Username:string,
  Password:string,
  Email:string,
}

const userDataSchema = new Schema<IUserData>({
  Username: { type: String, required: true },
  Password: { type: String, required: true },
  Email: { type: String, required: true }
});

export const UserData = model<IUserData>('UserData', userDataSchema);

