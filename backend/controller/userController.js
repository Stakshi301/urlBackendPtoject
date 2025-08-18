// routes/auth.js
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../model/userSchema.js';

// Register
const createUser= async (req, res) => {
    try{
        const { name, email, password,address,role } = req.body;
        const isPresent=await User.findOne({email})
        if(isPresent) return res.status(400).json({message:'User with this emal already exist!'})
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword,address,role });
        await user.save();
        res.status(201).json({ message: 'User registered' });
    }catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Error registering user' });
    }
};


const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Debug logs
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare password safely
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Sign token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET || 'your_jwt_secret',
      { expiresIn: '1h' }
    );

    // res.json({ token });

    res.json({
  success: true,
  message: "Login successful",
  token,
  user: {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role
  }
});
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({ message: 'Error logging in' });
  }
};

export { createUser, LoginUser }; 
