import express from 'express';
import {connectDB} from './config/db.js';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes/uriRoutes.js';
import { userRouter } from './routes/userRoute.js';
import rateLimit from "express-rate-limit";
import { rateLimiter } from "./middleware/rateLimiter.js";

const app=express();

app.use(express.json());
app.use(cors());   

dotenv.config();
connectDB();

const port=5000;



app.use(rateLimiter)
app.use('/api', router);
app.use('/user', userRouter);

app.listen(port,(req,res)=>{
    console.log(`Server is running on port ${port}`)
})