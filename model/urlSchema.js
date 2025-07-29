import mongoose from 'mongoose';
import {Schema,model} from 'mongoose';

const schema=new Schema({
    
    originalUrl:{type:String, required:true},
    shortCode:{type:String, required:false, unique:true},
    createdAt:{type:Date, default:Date.now},
    clicks:{type:Number, default:0},
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

});

const uriModel=model('url', schema);

export default uriModel;

