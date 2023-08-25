import asyncHandler from 'express-async-handler'
import admin from '../models/adminModels.js'
import adminJwt from '../utils/userJWT.js'
import {fetchAllUsers} from '../helpers/adminHelpers.js'
import user from '../models/userModels.js'
import Blogs from '../models/createBlog.js'
import generateAdminToken from '../utils/adminJwt.js'
import jwt from 'jsonwebtoken'
import Banner from '../models/bannerSchema.js';


const authAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const foundAdmin = await admin.findOne({ email }); // Rename the variable here

    if (foundAdmin && (await foundAdmin.matchPassword(password))) {
      generateAdminToken(res, foundAdmin._id);
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
      generateAdminToken(res, newAdmin._id)
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
    res.cookie('adminJwt','',{
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
        profileImage:foundUser.profileImage
        // Include other user details as needed
      });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  });

  const allUsersBlogs = asyncHandler(async (req, res) => {
    try {
      const { email } = req.query;
  
      // Find the user based on the email
      const foundUser = await user.findOne({ email });
  
      if (!foundUser) {
        return res.status(404).json({ message: 'User not found.' });
      }
  
      // Fetch blogs for the selected user's ObjectId
      const blogs = await Blogs.find({ author: foundUser._id })
        .select('title summary createdAt images') // Only select specific fields
        .sort({ createdAt: -1 }); // Sort by creation date in descending order
  
      res.status(200).json(blogs);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching blogs.' });
    }
  });




  
  const getOneBlogOfUser = async (req, res) => {
    const blogId = req.params.blogId;
  
    try {
      const blog = await Blogs.findById(blogId)
        .populate('author', 'name') // Populate author info
        .exec();
  
      if (!blog) {
        return res.status(404).json({ message: 'Blog not found.' });
      }
  
      res.status(200).json(blog);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching the blog.' });
    }
  };
  


const toggleBlockUser = asyncHandler(async (req, res) => {
    const { email } = req.body;
  
    try {
      const foundUser = await user.findOne({ email });
  
      if (!foundUser) {
        res.status(404);
        throw new Error('User not found');
      }
  
      foundUser.status = !foundUser.status; // Toggle the status
  
      await foundUser.save();
  
      res.status(200).json({ message: 'User status toggled successfully' });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  });
  


  const getBlockedUsers = asyncHandler(async (req, res) => {
    try {
      const blockedUsers = await user.find({ status: true }); // Assuming you have a 'status' field in your user schema to indicate blocked status
      res.status(200).json({ blockedUsers });
    } catch (error) {
      res.status(500).json({ error: 'Error fetching blocked users' });
    }
  });



  const adminCheckAuth = async (req, res) => {
    const token = req.cookies.adminJwt;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        // Perform any necessary checks or queries using decodedToken.userId
        // ...

        res.status(200).json({ message: 'Authorized' });
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

const uploadBanner = async (req, res) => {
  try {
    const { path } = req.file;

    const newBanner = new Banner({
      media: path,
    });

    const createdBanner = await newBanner.save();

    res.status(201).json(createdBanner);
  } catch (error) {
    res.status(500).json({ message: 'Banner upload failed.' });
  }
}



const getBanners = async (req, res) => {
  try {
    const banners = await Banner.find();
    res.status(200).json(banners);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching banners.' });
  }
};


  export {
    authAdmin,
    registerAdmin,
    logoutAdmin,
    getAllUsers,
    getUserByEmail,
    toggleBlockUser,
    getBlockedUsers,
    allUsersBlogs,
    getOneBlogOfUser,
    adminCheckAuth,
    uploadBanner,
    getBanners
  };
  


