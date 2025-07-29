import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';

export const connectDB=async()=>{
    try{
        const conneect=await mongoose.connect(process.env.mongoURL);
        console.log('DATABASE CONNECTED🎊');
    }catch(err)
    {
        console.error(err.message);
        process.exit(1);
    }
}

