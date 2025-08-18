import express from 'express';
import {connectDB} from './config/db.js';
import cors from 'cors';
import dotenv from 'dotenv';
import { userRouter } from './routes/userRoute.js';
import adminRoutes from "./routes/adminRoute.js";
import storeRoutes from "./routes/storeRoutes.js";
// import rateLimit from "express-rate-limit";
// import { rateLimiter } from "./middleware/rateLimiter.js";


const app=express();

app.use(express.json());

dotenv.config();
connectDB();

const port=5000;

app.use(cors({
      origin: "http://localhost:5173",   // explicitly allow your frontend
  credentials: true                  // allow cookies/authorization headers
}));


// app.use(rateLimiter)
app.use("/admin", adminRoutes);
app.use("/stores", storeRoutes);
app.use('/user', userRouter);

app.listen(port,(req,res)=>{
    console.log(`Server is running on port ${port}`)
})