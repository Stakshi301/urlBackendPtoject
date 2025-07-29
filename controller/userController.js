// routes/auth.js
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {userModel} from '../model/userSchema.js';

// Register
const createUser= async (req, res) => {
    try{
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new userModel({ username, email, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'User registered' });
    }catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Error registering user' });
    }
};

// Login
const LoginUser=async (req, res) => {
try{  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
  res.json({ token });
}catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Error logging in' });
  }

}
export { createUser, LoginUser }; 
