// models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, minlength: 6, maxlength: 60 },
  email: { type: String, required: true, unique: true, match: /.+\@.+\..+/},
  password: { type: String, required: true },
  address:{type:String,required:true,maxlength: 400},
  role:{type:String,enum:['user','admin','owner']}
});

export default mongoose.model('User', userSchema);
    