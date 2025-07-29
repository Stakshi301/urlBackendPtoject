import uriModel from "../model/urlSchema.js";
import validator from 'validator';

const getUri=async(_,res)=>{
    try{
        const Geturi = await uriModel.find();
        const data= Geturi.map(uri => ({
            originalUrl: uri.originalUrl,
            shortCode: uri.shortCode,
            createdAt: uri.createdAt,
            clicks: uri.clicks
        }));

        res.status(200).json(data); 
    }catch(error){
        console.error(error.message);
        res.status(500).json({message:'Error fetching URI'})
    }
}

const getUriStats=async(req,res)=>{
    try{
        const{shortCode}=req.params; 
        const uri= await uriModel.findOne({shortCode});
        if(!uri){
            return res.status(404).json({message:'URI not found'});
        }
        
        res.status(200).json({createdAt:uri.createdAt, clicks:uri.clicks});
    }catch(error){
        console.error(error.message);
        res.status(404).json({message:'Error fetching URI stats'});
    }
}


const updateclick=async(req,res)=>{
    try{
        const {shortCode}=req.params;
        const uri = await uriModel.findOne({shortCode});
        if(!uri){
            return res.status(404).json({message:'URI not found'});
        }
        uri.clicks+=1;
        await uri.save();

         return res.redirect(302, uri.originalUrl);

    }catch(error){
        console.error(error.message);
        res.status(500).json({message:'Error updating click count'});
    }
}

const postUri=async(req,res)=>{
    try{
        const {originalUrl,shortCode}=req.body;
        const newUri=new uriModel({originalUrl, shortCode, user: req.userId});
        
        //If originalUrl or shortCode is missing, return an error
        if(!originalUrl) {
            return res.status(400).json({message: 'Original URL is required'});
        }
        //Check if the shortCode already exist
        if(await uriModel.findOne({shortCode: shortCode})){
            return res.status(409).json({message: 'Short Code already exists'});
        }

        //Validate the originalUrl format
         if (!validator.isURL(originalUrl, { require_protocol: true })) {
    return res.status(400).json({ message: 'Invalid URL. Must include https:// and a valid domain.' });
}

          //If no custom shortCode is provided, generate a random one
          if(!shortCode){
            const randomCode=Math.random().toString(36).substring(2, 8);
            newUri.shortCode=randomCode;
          }

        await newUri.save();
       return res.status(201).json({message:'URI posted sucessfully',newUri});

    }catch(error){
        console.error(error.message);
       return res.status(500).json({message:'Error posting URI'});
    }
}

export { getUri, postUri, getUriStats,updateclick };