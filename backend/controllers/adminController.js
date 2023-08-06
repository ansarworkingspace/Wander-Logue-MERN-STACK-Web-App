import asyncHandler from 'express-async-handler'
import admin from '../models/adminModels.js'
import adminJwt from '../utils/userJWT.js'
import {fetchAllUsers} from '../helpers/adminHelpers.js'
import user from '../models/userModels.js'

const authAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const foundAdmin = await admin.findOne({ email }); // Rename the variable here

    if (foundAdmin && (await foundAdmin.matchPassword(password))) {
        adminJwt(res, foundAdmin._id);
        res.status(201).json({
            _id: foundAdmin._id,
            name: foundAdmin.name,
            email: foundAdmin.email
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

const registerAdmin = asyncHandler(async (req, res) => {

    const { name, email, password } = req.body;
    const adminExists = await admin.findOne({ email: email })

    if (adminExists) {
        res.status(400)
        throw new Error('Admin already exists');
    }

    const newAdmin = await admin.create({
        name,
        email,
        password
    });

    if (newAdmin) {
        adminJwt(res, newAdmin._id)
        res.status(201).json({
            _id: newAdmin._id,
            name: newAdmin.name,
            email: newAdmin.email
        });
    } else {
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

  const getUserByEmail = asyncHandler(async (req, res) => {
    const { email } = req.query;
  
    const foundUser = await user.findOne({ email });
  
    if (foundUser) {
      res.status(200).json({
        _id: foundUser._id,
        name: foundUser.name,
        email: foundUser.email,
        // Include other user details as needed
      });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  });

export {
    authAdmin,
    registerAdmin,
    logoutAdmin,
    getAllUsers,
    getUserByEmail
};