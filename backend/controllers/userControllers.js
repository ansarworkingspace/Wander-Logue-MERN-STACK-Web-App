import asyncHandler from 'express-async-handler'


const authUser = asyncHandler(async (req,res)=>{
    res.status(200).json({message:"auth user"})
});

const registerUser = asyncHandler(async (req,res)=>{
    res.status(200).json({message:"Register user"})
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