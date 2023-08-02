import asyncHandler from 'express-async-handler'
import User from '../models/userModels.js'
import userJwt from '../utils/userJWT.js'


const authUser = asyncHandler(async (req,res)=>{
    const {email,password} = req.body
    const user  = await User.findOne({email});

    if(user && (await user.matchPassword(password))){
        userJwt(res,user._id)
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email
        })
    }else{
        res.status(401)
        throw new Error('Invalid email or password');
    }
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
    res.cookie('jwt','',{
        httpOnly:true,
        expires:new Date(0)
       })
       
       
    res.status(200).json({message:'User logged out'});
});

const getUserProfile = asyncHandler(async (req,res)=>{
    const user = {
        _id:req.user._id,
        name:req.user.name,
        email:req.user.email,
        mobile:req.user.mobile
       }
       
    res.status(200).json(user);

});

const updateUserProfile = asyncHandler(async (req,res)=>{
    const user = await User.findById(req.user._id)

    if(user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.mobile = req.body.mobile || user.mobile;
        
        if(req.body.password){
          user.password = req.body.password;
        }
        
        const updatedUser =  await user.save();
        res.status(200).json({
           _id:updatedUser._id, 
           name:updatedUser.name, 
           email:updatedUser.email,
           mobile:updatedUser.mobile
        });
    }else{
        res.status(404);
        throw new Error ('User not found');
    }
    
});


export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
};