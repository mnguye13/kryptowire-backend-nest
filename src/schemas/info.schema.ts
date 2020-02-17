import * as mongoose from 'mongoose';

export const InfoData = new mongoose.Schema({
  id: Number,
  fullname: String,
  email: String,
});
