import { Router } from "express";
import { createUser,LoginUser } from "../controller/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import bcrypt from 'bcrypt';
  
const  router=Router();

router.post('/register', createUser);

router.post('/login', LoginUser);

router.patch("/password", protect, async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.user.password = hashedPassword;
    await req.user.save();
    res.json({ message: "Password updated" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export  {router as userRouter};