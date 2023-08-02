import asyncHandler from 'express-async-handler'
import User from '../models/userModels.js'
import userJwt from '../utils/userJWT.js'


const authUser = asyncHandler(async (req,res)=>{
    res.status(200).json({message:"auth user"})
});

const registerUser = asyncHandler(async (req,res)=>{

    const {name,email,password,mobile} = req.body;
    const userExists = await User.findOne({email:email})

    if(userExists){
        res.status(400)
        throw new Error('User already exists');
    }

    const user = await User.create({
        name,
        email,
        password,
        mobile
    });

    if(user){
        userJwt(res,user._id)
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            mobile:user.mobile
        })
    }else{
        res.status(400)
        throw new Error('Invalid user data');
    }

    
    
    
   
});

const logoutUser = asyncHandler(async (req,res)=>{
    res.status(200).json({message:"logout user"})
});

const getUserProfile = asyncHandler(async (req,res)=>{
    res.status(200).json({message:"get profile user"})
});

const updateUserProfile = asyncHandler(async (req,res)=>{
    res.status(200).json({message:"update profile of user"})
});


export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
};