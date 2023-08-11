import asyncHandler from 'express-async-handler'
import User from '../models/userModels.js'
import generateToken from '../utils/userJWT.js'
import Blog from '../models/createBlog.js';


const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
        if (user.status) {
            res.status(401);
            throw new Error('Your account is temporarily blocked');
        }

        if (await user.matchPassword(password)) {
          generateToken(res, user._id);
         
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                profileImage: user.profileImage,
                mobile: user.mobile,
                
            });
        } else {
            res.status(401);
            throw new Error('Invalid email or password');
        }
    } else {
        res.status(401);
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
      generateToken(res,user._id)
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


// const getAllUsers = asyncHandler(async (req, res) => {
//     const users = await User.find({}); // Retrieve all users from the database
//     res.status(200).json(users);
// });

const getUserProfile = asyncHandler(async (req,res)=>{
    const user = {
        _id:req.user._id,
        name:req.user.name,
        email:req.user.email,
        mobile:req.user.mobile
       }
       
    res.status(200).json(user);

});


const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
  
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.mobile = req.body.mobile || user.mobile;
  
      if (req.body.password) {
        user.password = req.body.password;
      }
  
      if (req.file) {
        // Assuming you have a 'profileImage' field in the User schema
        user.profileImage = req.file.filename;
      }
  
      const updatedUser = await user.save();
  
      res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        mobile: updatedUser.mobile,
        profileImage: updatedUser.profileImage, // Include profileImage in the response
      });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  });


// Create a new blog
// blogControllers.js

const createBlog = asyncHandler(async (req, res) => {
    try {
      const { title, summary, content, author } = req.body; // Retrieve author (user ID) from request body
     
      const image = req.file ? req.file.path : '';
  
      const newBlog = new Blog({
        title,
        summary,
        content,
        images: [image],
        author: author, // Use the provided user ID
      });
  
      const createdBlog = await newBlog.save();
  
      res.status(201).json(createdBlog);
    } catch (error) {
      res.status(500).json({ message: 'Blog creation failed.' });
    }
  });
  
  

  const getUserBlogs = asyncHandler(async (req, res) => {
    try {
      // Get the user ID from the authenticated user
      const userId = req.user._id;
  
      // Fetch blogs with the given user ID
      const blogs = await Blog.find({ author: userId })
        .select('title summary createdAt images') // Only select specific fields
        .sort({ createdAt: -1 }); // Sort by creation date in descending order
  
      res.status(200).json(blogs);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching blogs.' });
    }
  });
  

  const allUsersBlogs = asyncHandler(async (req, res) => {
    try {
      // Fetch all blogs in db oredr like latest first
      const blogs = await Blog.find({ })
        .select('title summary createdAt images') // Only select specific fields
        .sort({ createdAt: -1 }); // Sort by creation date in descending order
  
      res.status(200).json(blogs);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching blogs.' });
    }
  });
  
  

  const getOneBlog = async (req, res) => {
    const blogId = req.params.blogId;
  
    try {
      const blog = await Blog.findById(blogId)
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
  


export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    createBlog,
    getUserBlogs,
    allUsersBlogs,
    getOneBlog
};