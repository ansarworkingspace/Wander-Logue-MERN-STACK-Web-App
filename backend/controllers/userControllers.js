import asyncHandler from 'express-async-handler'
import User from '../models/userModels.js'
import generateToken from '../utils/userJWT.js'
import Blog from '../models/createBlog.js';
import jwt from 'jsonwebtoken'
import axios from 'axios';
import nodemailer from 'nodemailer'




// Orginal sign in
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
        if (user.status) {
            res.status(401);
            throw new Error('Your account is temporarily blocked');
        }

        if (!user.verified) {
          res.status(401);
          throw new Error('Your account is not verified');
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




// Orginal register
// const registerUser = asyncHandler(async (req, res) => {
//   const { name, email, password, mobile } = req.body;
//   const userExists = await User.findOne({ email: email });

//   if (userExists) {
//     res.status(400);
//     throw new Error('User already exists');
//   }

//   if (password.length < 6) {
//     res.status(400);
//     throw new Error('Password must be at least 6 characters long');
//   }

//   const user = await User.create({
//     name,
//     email,
//     password,
//     mobile,
//   });

//   if (user) {
//     generateToken(res, user._id);
//     res.status(201).json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       mobile: user.mobile,
//     });
//   } else {
//     res.status(400);
//     throw new Error('Invalid user data');
//   }
// });

//^----------------testing-otp----------------------------------------
//verification


const verifyOTP = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  // Find the user by email
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }

  // Compare the user's stored OTP with the provided OTP
  if (user.otp === otp) {
    
     // Update the verified field to true
     user.verified = true;
    
     // Save the user object with the updated verified field
     await user.save();
   
         
    res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage,
        status:user.status,
        verified: user.verified
    });
    
  } else {
    res.status(400).json({ message: 'Invalid OTP' });
  }



});



//resendOtp

const resendOtp = asyncHandler(async(req,res)=>{
  try {
    const userId = req.user._id; // Assuming you have access to the user ID from the authenticated session
    // console.log("---------");
    // console.log(userId);
    // console.log("-------------");
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate a new OTP
    const newOtp = Math.floor(1000 + Math.random() * 9000);
    
    // Update the user's OTP in the database
    user.otp = newOtp;
    await user.save();

    // Send the new OTP to the user's email
    await sendOTPByEmail(user.email, newOtp);

    res.status(200).json({ message: 'OTP resent successfully' });
  } catch (error) {
    console.error('Error while resending OTP:', error);
    res.status(500).json({ message: 'An error occurred while resending OTP' });
  }
})







//?--------------------------------------------------------------------------------
const sendOTPByEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: process.env.SENDER_EMAIL,
      pass: process.env.GENARATE_ETHREAL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.SENDER_EMAIL,
    to: email,
    subject: 'OTP Verification',
    text: `Your OTP for verification is: ${otp}`,
  };

  await transporter.sendMail(mailOptions);
};





// tesing for otp register
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


 // Generate OTP
 const otp = Math.floor(1000 + Math.random() * 9000);

 // Send OTP to user's email
 await sendOTPByEmail(email, otp);


  const user = await User.create({  //eldho rise signin issue
    name,
    email,
    password,
    mobile,
    otp,
  });



  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      message: 'User registered successfully',
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});







//^----------------GOOGLE-AUTH-----------------------------------------

const googleAuth = asyncHandler(async (req, res) => {
  const {  user_id, name, email, profileGoogleImage } = req.body; // Assuming these fields are part of the user object from Google Sign-In

  // Check if the user already exists
  let user = await User.findOne({ email });

  if (user) {

    if (!user.verified) {
      res.status(401);
      throw new Error('Your account is not verified');
    }


    if (user.status) {
      res.status(401);
      throw new Error('Your account is temporarily blocked');
    }

    // User exists, generate token and send success response
    generateToken(res, user._id);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profileImage: user.profileImage,
      profileGoogleImage: user.profileGoogleImage,
      status: user.status
    });
  } else {
    // User doesn't exist, create a new user
    user = await User.create({
    
      name,
      email,
      profileGoogleImage,
      verified: true,
    });

    if (user) {
      generateToken(res, user._id);
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        profileGoogleImage: user.profileGoogleImage,
     
      
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
  }
});


//^--------------------------------------------------------------------


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

// const createBlog = asyncHandler(async (req, res) => {
//     try {
//       const { title, summary, content, author } = req.body; // Retrieve author (user ID) from request body
     
//       const image = req.file ? req.file.path : '';
  
//       const newBlog = new Blog({
//         title,
//         summary,
//         content,
//         images: [image],
//         author: author, // Use the provided user ID
//       });
  
//       const createdBlog = await newBlog.save();
  
//       res.status(201).json(createdBlog);
//     } catch (error) {
//       res.status(500).json({ message: 'Blog creation failed.' });
//     }
//   });
  
  



const createBlog = asyncHandler(async (req, res) => {
  try {
    // console.log(req.body); // Check the received body
    // console.log(req.files);
    const { title, summary, content, author } = req.body;
    
    const files = req.files.map(file => file.path); // Get an array of file paths
    console.log('Uploaded Files:', files);

    const newBlog = new Blog({
      title,
      summary,
      content,
      images: files,
      author,
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
    const { blogId } = req.params;
  
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




const getSavedSingleBlog = async (req, res) => {
  const blogId = req.params.blogId;

  try {
    const blog = await Blog.findOne({ _id: blogId })
      .populate('author', 'name')
      .exec();

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found.' });
    }

    res.status(200).json(blog);
  } catch (error) {
    console.error('Error fetching the blog:', error);
    res.status(500).json({ message: 'Error fetching the blog.' });
  }
};



// Delete a saved blog
const deleteSavedBlog = async (req, res) => {
  const userId = req.user._id;// Assuming you have the user's ID from authentication
  const blogId = req.params.blogId;

  try {
    // Find the user by ID and update the savedTales array
    const user = await User.findByIdAndUpdate(userId, {
      $pull: { savedTales: { blogId } }
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.status(200).json({ message: 'Blog deleted successfully.' });
  } catch (error) {
    console.error('Error deleting saved blog:', error);
    res.status(500).json({ message: 'Error deleting saved blog.' });
  }
};


//orginal
// const updateBlog = asyncHandler(async (req, res) => {
//   const { blogId } = req.params;
//   const { title, summary, content } = req.body;

//   try {
//     const updatedBlog = await Blog.findByIdAndUpdate(
//       blogId,
//       {
//         title,
//         summary,
//         content,
//       },
//       { new: true } // Return the updated document
//     );

//     if (!updatedBlog) {
//       return res.status(404).json({ message: 'Blog not found.' });
//     }

//     res.json({ message: 'Blog updated successfully', updatedBlog });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });


const updateBlog = asyncHandler(async (req, res) => {
  const { blogId } = req.params;
  const { title, summary, content } = req.body;

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      blogId,
      {
        title,
        summary,
        content,
      },
      { new: true } // Return the updated document
    );

    if (!updatedBlog) {
      return res.status(404).json({ message: 'Blog not found.' });
    }

    // Update the savedTales field in user collection
    const updatedUsers = await User.updateMany(
      { 'savedTales.blogId': blogId },
      { $set: { 'savedTales.$.title': title, 'savedTales.$.summary': summary } }
    );

    if (updatedUsers.nModified > 0) {
      // nModified indicates the number of documents modified
      res.json({ message: 'Blog and savedTales updated successfully', updatedBlog });
    } else {
      res.json({ message: 'Blog updated successfully', updatedBlog });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});





// controllers/userControllers.js
 const likeBlog = asyncHandler(async (req, res) => {
  const { blogId } = req.params;
  const userId = req.user._id;

  try {
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    const userLikedIndex = blog.likes.indexOf(userId);

    if (userLikedIndex === -1) {
      // User hasn't liked the blog, add their ID to the likes array
      blog.likes.push(userId);
    } else {
      // User has liked the blog, remove their ID from the likes array
      blog.likes.splice(userLikedIndex, 1);
    }

    await blog.save();

    res.json({ message: 'Like/unlike successful' });
  } catch (error) {
    console.error('Error liking/unliking blog:', error);
    res.status(500).json({ message: 'An error occurred while liking/unliking the blog' });
  }
});



// controllers/userControllers.js
 const getBlogLikeCount = asyncHandler(async (req, res) => {
  const { blogId } = req.params;

  try {
    const blog = await Blog.findById(blogId);
    
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    const likeCount = blog.likes.length;
    res.json({ likeCount });
  } catch (error) {
    console.error('Error fetching like count:', error);
    res.status(500).json({ message: 'An error occurred while fetching the like count' });
  }
});


const checkBlogLikeStatus = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const blogId = req.params.blogId;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    const userLiked = blog.likes.includes(userId);

    res.json({ userLiked });
  } catch (error) {
    console.error('Error checking like status:', error);
    res.status(500).json({ message: 'An error occurred while checking like status' });
  }
});




const getAuthorDetailsById = asyncHandler(async (req, res) => {
  const userId = req.params.userId;

  try {
    const foundUser = await User.findById(userId);

    if (!foundUser) {
      res.status(404);
      throw new Error('User not found');
    }

    res.status(200).json({
      _id: foundUser._id,
      name: foundUser.name,
      email: foundUser.email,
      profileImage: foundUser.profileImage,
      // Include other user details as needed
    });
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



const getAuthorBlogs = asyncHandler(async (req, res) => {
  try {
    const userId = req.params.userId;

    // Fetch blogs with the given user ID
    const blogs = await Blog.find({ author: userId })
      .select('title summary createdAt images') // Only select specific fields
      .sort({ createdAt: -1 }); // Sort by creation date in descending order

    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching blogs.' });
  }
});





// Follow a user
const followUser = asyncHandler(async (req, res) => {
  const authorId = req.params.userId;
  const currentUserId = req.user._id; // Assuming you have the user object in req.user

  try {
    // Update author's followers
    await User.findByIdAndUpdate(authorId, { $addToSet: { followers: currentUserId } });

    // Update current user's following
    await User.findByIdAndUpdate(currentUserId, { $addToSet: { following: authorId } });

    res.status(200).json({ message: 'Followed successfully' });
  } catch (error) {
    console.error('Error following user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Unfollow a user
const unfollowUser = asyncHandler(async (req, res) => {
  const authorId = req.params.userId;
  const currentUserId = req.user._id; // Assuming you have the user object in req.user

  try {
    // Update author's followers
    await User.findByIdAndUpdate(authorId, { $pull: { followers: currentUserId } });

    // Update current user's following
    await User.findByIdAndUpdate(currentUserId, { $pull: { following: authorId } });

    res.status(200).json({ message: 'Unfollowed successfully' });
  } catch (error) {
    console.error('Error unfollowing user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Check if the current user is following the specified user
const checkFollowing = asyncHandler(async (req, res) => {
  const currentUserId = req.user._id; // Assuming you've set req.user from the authentication middleware
  const targetUserId = req.params.userId;

  try {
    const currentUser = await User.findById(currentUserId);
    if (!currentUser) {
      return res.status(404).json({ message: 'Current user not found' });
    }

    const isFollowing = currentUser.following.includes(targetUserId);
    res.json({ isFollowing });
  } catch (error) {
    console.error('Error checking following status:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



const getFollowerFollowingCount = asyncHandler(async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await User.findById(userId);

    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    const followerCount = user.followers.length;
    const followingCount = user.following.length;

    res.status(200).json({ followerCount, followingCount });
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



const followingList = asyncHandler(async (req, res) => {
  const currentUserID = req.user._id; // User object attached by the authentication middleware

  try {
    // Find the current user by their ID
    const currentUser = await User.findById(currentUserID);

    if (!currentUser) {
      res.status(404);
      throw new Error('User not found');
    }

    // Fetch the following list of the current user with profileImage and name
    const followingList = await User.find({ _id: { $in: currentUser.following } })
      .select('profileImage profileGoogleImage name')
      .lean(); // Convert Mongoose documents to plain JavaScript objects

    res.json(followingList);
  } catch (error) {
    res.status(500);
    throw new Error('Server error');
  }
});

const followersList = asyncHandler(async (req, res) => {
  const currentUserID = req.user._id; // User object attached by the authentication middleware

  try {
    // Find the current user by their ID
    const currentUser = await User.findById(currentUserID);

    if (!currentUser) {
      res.status(404);
      throw new Error('User not found');
    }

    // Fetch the following list of the current user with profileImage and name
    const followersList = await User.find({ _id: { $in: currentUser.followers } })
      .select('profileImage profileGoogleImage name')
      .lean(); // Convert Mongoose documents to plain JavaScript objects

    res.json(followersList);
  } catch (error) {
    res.status(500);
    throw new Error('Server error');
  }
});




const getOtherUserFollowersList = asyncHandler(async (req, res) => {
  const userId = req.params.OtherUserId; // Get the user ID from the URL parameter

  try {
    // Find the user by ID
    const otheruser = await User.findById(userId);

    if (!otheruser) {
      res.status(404);
      throw new Error('User not found');
    }

    // Fetch the followers list of the other user with profileImage and name
    const followersList = await User.find({ _id: { $in: otheruser.followers } })
      .select('profileImage profileGoogleImage name')
      .lean(); // Convert Mongoose documents to plain JavaScript objects

    res.json(followersList);
  } catch (error) {
    res.status(500);
    throw new Error('Server error');
  }
});



const getOtherUserFollowingList = asyncHandler(async (req, res) => {
  const userId = req.params.OtherUserId; // Get the user ID from the URL parameter

  try {
    // Find the user by ID
    const otheruser = await User.findById(userId);

    if (!otheruser) {
      res.status(404);
      throw new Error('User not found');
    }

    // Fetch the followers list of the other user with profileImage and name
    const followingList = await User.find({ _id: { $in: otheruser.following } })
      .select('profileImage profileGoogleImage name')
      .lean(); // Convert Mongoose documents to plain JavaScript objects

    res.json(followingList);
  } catch (error) {
    res.status(500);
    throw new Error('Server error');
  }
});





const LikedUsers = asyncHandler(async (req, res) => {
  const blogId = req.params.blogId; // Get the blog ID from the URL parameter

  try {
    // Find the blog by ID
    const blog = await Blog.findById(blogId);

    if (!blog) {
      res.status(404);
      throw new Error('Blog not found');
    }

    // Fetch the liked users based on their IDs in the 'likes' array of the blog
    const likedUserIds = blog.likes; // Array of user IDs who liked the blog
    const likedUsers = await User.find({ _id: { $in: likedUserIds } })
      .select('profileImage profileGoogleImage name') // Select the desired fields
      .lean(); // Convert Mongoose documents to plain JavaScript objects

    res.json(likedUsers);
  } catch (error) {
    res.status(500);
    throw new Error('Server error');
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
    getSavedBlogs,
    getSavedSingleBlog,
    deleteSavedBlog,
    updateBlog,
    likeBlog,
    getBlogLikeCount,
    checkBlogLikeStatus,
    getAuthorDetailsById,
    getAuthorBlogs,
    unfollowUser,
    followUser,
    checkFollowing,
    getFollowerFollowingCount,
    resendOtp,
    verifyOTP,
    googleAuth,
    followingList,
    followersList,
    getOtherUserFollowersList,
    getOtherUserFollowingList,
    LikedUsers
};