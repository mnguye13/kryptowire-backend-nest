import * as mongoose from 'mongoose';

export const InfoData = new mongoose.Schema({
  id: String,
  fullname: String,
  email: String,
});
