import express from 'express';
import {connectDB} from './config/db.js';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes/uriRoutes.js';

const app=express();

app.use(express.json());
dotenv.config();
app.use(cors());
connectDB();

const port=5000;

app.get('/',(req,res)=>{ 
    res.send('Hello world');
})

app.use('/api',router);

app.listen(port,(req,res)=>{
    console.log(`Server is running on port ${port}`)
})