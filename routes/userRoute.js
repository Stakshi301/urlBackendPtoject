import { Router } from "express";
import { createUser,LoginUser } from "../controller/userController.js";

const router=Router();

router.post('/register', createUser);

router.get('/login', LoginUser);

export  {router as userRouter};