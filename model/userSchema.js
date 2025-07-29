// models/User.js
import mongoose from 'mongoose';
import { Schema, model } from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export const userModel= model('User', userSchema);
