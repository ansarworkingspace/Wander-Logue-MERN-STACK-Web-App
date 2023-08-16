import asyncHandler from 'express-async-handler'
import User from '../models/userModels.js'
import generateToken from '../utils/userJWT.js'
import Blog from '../models/createBlog.js';
import jwt from 'jsonwebtoken'

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
                status:user.status
                
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






// const registerUser = asyncHandler(async (req,res)=>{

//     const {name,email,password,mobile} = req.body;
//     const userExists = await User.findOne({email:email})

//     if(userExists){
//         res.status(400)
//         throw new Error('User already exists');
//     }

//     const user = await User.create({
//         name,
//         email,
//         password,
//         mobile
//     });

//     if(user){
//       generateToken(res,user._id)
//         res.status(201).json({
//             _id:user._id,
//             name:user.name,
//             email:user.email,
//             mobile:user.mobile
//         })
//     }else{
//         res.status(400)
//         throw new Error('Invalid user data');
//     }

    
    
    
   
// });


const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, mobile } = req.body;
  const userExists = await User.findOne({ email: email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  if (password.length < 6) {
    res.status(400);
    throw new Error('Password must be at least 6 characters long');
  }

  const user = await User.create({
    name,
    email,
    password,
    mobile,
  });

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      mobile: user.mobile,
    });
  } else {
    res.status(400);
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
  

  const allUsersBlogsInLadning = asyncHandler(async (req, res) => {
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
  




   const getUserStatus = asyncHandler(async (req, res) => {
    const userId = req.params.userId; // Get user ID from the route parameter
    const user = await User.findById(userId);
  
    if (user) {
      res.status(200).json({ status: user.status }); // Send the user's status
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  });



  const checkAuth = async (req, res) => {
    const token = req.cookies.jwt;

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



const deleteBlog = asyncHandler(async (req, res) => {
  const blogId = req.params.blogId;
  // console.log('Deleting blog with ID:', blogId);

  try {
    const blog = await Blog.findByIdAndDelete(blogId);
    // console.log('Deleted blog:', blog);
    if (!blog) {
      res.status(404).json({ message: 'Blog not found' });
    } else {
      res.json({ message: 'Blog deleted successfully' });
    }
  } catch (error) {
    console.error('Error deleting blog:', error);
    res.status(500).json({ message: 'An error occurred while deleting the blog' });
  }
});


// const saveBlogToUser = asyncHandler(async (req, res) => {
//   const userId = req.user._id;
//   const blogId = req.params.blogId;

//   try {
//     const user = await User.findById(userId); // Use findById instead of find
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Check if the blog is already saved, if not, add it
//     if (!user.savedTales.includes(blogId)) {
//       user.savedTales.push(blogId);
//       await user.save();
//     }

//     res.json({ message: 'Blog saved successfully' });
//   } catch (error) {
//     console.error('Error saving blog:', error);
//     res.status(500).json({ message: 'An error occurred while saving the blog' });
//   }
// });


const saveBlogToUser = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const blogId = req.params.blogId;

  try {
    const user = await User.findById(userId); // Find the user

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const blog = await Blog.findById(blogId); // Find the blog

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // Check if the blog is already saved, if not, add it
    const alreadySaved = user.savedTales.some(savedBlog => savedBlog.blogId.equals(blogId));

    if (!alreadySaved) {
      user.savedTales.push({
        blogId: blogId,
        title: blog.title,
        summary: blog.summary,
        createdAt: blog.createdAt,
        images: blog.images.length > 0 ? [blog.images[0]] : [] // Store the first image URL if available
      });

      await user.save();
      res.json({ message: 'Blog saved successfully' });
    } else {
      res.json({ message: 'Blog already saved' });
    }
  } catch (error) {
    console.error('Error saving blog:', error);
    res.status(500).json({ message: 'An error occurred while saving the blog' });
  }
});


const getSavedBlogs = asyncHandler(async (req, res) => {
  const userId = req.user._id; // Assuming req.user contains the authenticated user's data

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const savedBlogs = user.savedTales;
    res.json(savedBlogs);
  } catch (error) {
    console.error('Error fetching saved blogs:', error);
    res.status(500).json({ message: 'An error occurred while fetching saved blogs' });
  }
});




export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    createBlog,
    getUserBlogs,
    allUsersBlogs,
    getOneBlog,
    allUsersBlogsInLadning,
    getUserStatus,
    checkAuth,
    deleteBlog,
    saveBlogToUser,
    getSavedBlogs
};