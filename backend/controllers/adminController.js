import asyncHandler from 'express-async-handler'
import Admin from '../models/adminModels.js'
import adminJwt from '../utils/adminJWT.js'
import {fetchAllUsers} from '../helpers/adminHelpers.js'

const authAdmin = asyncHandler(async (req,res)=>{
    const {email,password} = req.body
    const admin  = await Admin.findOne({email});

    if(admin && (await admin.matchPassword(password))){
        adminJwt(res,admin._id)
        res.status(201).json({
            _id:admin._id,
            name:admin.name,
            email:admin.email
        })
    
    
    
    }else{
        res.status(401)
        throw new Error('Invalid email or password');
    }
});

const registerAdmin = asyncHandler(async (req,res)=>{

    const {name,email,password} = req.body;
    const adminExists = await admin.findOne({email:email})

    if(adminExists){
        res.status(400)
        throw new Error('admin already exists');
    }

    const admin = await admin.create({
        name,
        email,
        password
       
    });

    if(admin){
        adminJwt(res,admin._id)
        res.status(201).json({
            _id:admin._id,
            name:admin.name,
            email:admin.email
           
        })
    }else{
        res.status(400)
        throw new Error('Invalid admin data');
    }

    
    
    
   
});

const logoutAdmin = asyncHandler(async (req,res)=>{
    res.cookie('jwt','',{
        httpOnly:true,
        expires:new Date(0)
       })
       
       
    res.status(200).json({message:'admin logged out'});
});


const getAllUsers = asyncHandler(async (req,res) => {
    fetchAllUsers()
      .then((users) => {
        res.status(200).json({users}); 
      })
      .catch((error) => {
        console.log(error);
      });
  })


export {
    authAdmin,
    registerAdmin,
    logoutAdmin,
    getAllUsers
};