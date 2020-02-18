import * as mongoose from 'mongoose';

export const UserData = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});
