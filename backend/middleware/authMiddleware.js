// // middleware/auth.js
// import jwt from 'jsonwebtoken';

// function authMiddleware(req, res, next) {
//   const authHeader = req.headers.authorization;
//   if (!authHeader) return res.status(401).json({ message: 'Token required' });

//   const token = authHeader.split(' ')[1];
//   try {
//     const decoded = jwt.verify(token, 'your_jwt_secret');
//     req.userId = decoded.userId;
//     next();
//   } catch (err) {
//     res.status(401).json({ message: 'Invalid token' });
//   }
// }

// export  {authMiddleware};


import jwt from "jsonwebtoken";
import User from "../model/userSchema.js";

export const protect = async (req, res, next) => {
  let token;

  // Check header
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    // ✅ Verify token, not sign
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Get user from DB (without password)
    req.user = await User.findById(decoded.userId).select("-password");

    if (!req.user) {
      return res.status(401).json({ message: "User not found" });
    }

    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    return res.status(401).json({ message: "Invalid token" });
  }
};


export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Not authorized" });
    }
    next();
  };
};
