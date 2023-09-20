import asyncHandler from 'express-async-handler'
import User from '../models/userModels.js'
import generateToken from '../utils/userJWT.js'
import Blog from '../models/createBlog.js';
import jwt from 'jsonwebtoken'
import axios from 'axios';
import nodemailer from 'nodemailer'
import Banner from '../models/bannerSchema.js';
import Comment from '../models/commentBlog.js'
import ChatRoom from '../models/chatRoom.js';
import ChatMessage from '../models/chatArea.js'
import { formatDistanceToNow } from 'date-fns'




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

  if (password.length < 6) {
    res.status(400);
    throw new Error('Password must be at least 6 characters long');
  }

  // Generate OTP
  const otp = Math.floor(1000 + Math.random() * 9000);

  if (userExists) {
    // User exists, update user data if verified is false
    if (!userExists.verified) {
      userExists.name = name;
      userExists.mobile = mobile;
      userExists.password = password;
      userExists.otp = otp;
      await userExists.save();

      // Send OTP to user's email
      await sendOTPByEmail(email, otp);

      generateToken(res, userExists._id);
      res.status(200).json({
        message: 'User data updated successfully',
      });
    } else {
      res.status(400);
      throw new Error('User already exists and is verified');
    }
  } else {
    // User doesn't exist, create a new user
    const user = await User.create({
      name,
      email,
      password,
      mobile,
      otp,
    });

    if (user) {
      // Send OTP to user's email
      await sendOTPByEmail(email, otp);

      generateToken(res, user._id);
      res.status(201).json({
        message: 'User registered successfully',
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
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





const getSelectedBanner = asyncHandler(async (req, res) => {
  try {
    const selectedBanner = await Banner.findOne({ selected: true });
    if (!selectedBanner) {
      // return res.status(404).json({ message: 'No selected banner found' });
      return res.status(200).send();
    }

    res.status(200).json(selectedBanner);
  } catch (error) {
    console.error('Error fetching selected banner:', error);
    res.status(500).json({ message: 'Error fetching selected banner' });
  }
});



const reportBlog = asyncHandler(async (req, res) => {
  const { blogId } = req.params;
  const { reason } = req.body;
  const userId = req.user._id;

  try {

 
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    const hasReported = blog.reportBlog.some(
      (report) => report.userId.toString() === userId.toString()
    );

    if (hasReported) {
      return res.status(400).json({ message: 'You have already reported this blog' });
    }

    blog.reportBlog.push({ userId, reason });
    await blog.save();

    res.status(200).json({ message: 'Blog reported successfully' });
  } catch (error) {
    console.error('Error reporting blog:', error);
    res.status(500).json({ message: 'Error reporting blog' });
  }
});





const postComment = asyncHandler(async (req, res) => {
  const { blogId } = req.params;
  const { text } = req.body;
  const userId = req.user._id;

  // console.log(blogId, text, userId);

  const comment = new Comment({
    user: userId,
    content: text,
    blog: blogId
  });

  try {
    const savedComment = await comment.save();
    res.status(201).json(savedComment);
  } catch (error) {
    res.status(500).json({ message: 'Comment could not be added' });
  }
});





const getComments = asyncHandler(async (req, res) => {
  const { blogId } = req.params;
  const currentUserId = req.user._id; // Assuming req.user is properly populated

  try {
    let comments = await Comment.find({ blog: blogId })
      .populate('user', 'name')
      .select('content createdAt user');

    const currentUserComments = [];
    const otherComments = [];

    // Separate comments made by the current user and other comments
    comments.forEach(comment => {
      if (comment.user._id.toString() === currentUserId.toString()) {
        currentUserComments.push(comment);
      } else {
        otherComments.push(comment);
      }
    });

    // Sort the comments array: current user's comments first, then by createdAt for other comments
    comments = [...currentUserComments, ...otherComments.sort((a, b) => b.createdAt - a.createdAt)];



 // Format the createdAt field to a readable date and time
 comments.forEach(comment => {
  comment.createdAt = formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true });
});


    // console.log('Fetched comments:', comments);
    res.json({ comments });
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ message: 'Error fetching comments' });
  }
});





const createOrGetChatRoom = asyncHandler(async(req,res)=>{
  try {
    const currentUser = req.user._id; // Current user's ID
    const otherUser = req.params.userId; // Selected user's ID

    // Check if a chat room exists for the two users
    let chatRoom = await ChatRoom.findOne({
      participants: { $all: [currentUser, otherUser] },
    });

    // If no chat room exists, create a new one
    if (!chatRoom) {
      chatRoom = new ChatRoom({
        participants: [currentUser, otherUser],
        messages: [], // Initialize with no messages
      });
      await chatRoom.save();
    }

    res.json({ chatRoomId: chatRoom._id });
  } catch (error) {
    console.error('Error creating or getting chat room:', error);
    res.status(500).json({ message: 'Error creating or getting chat room' });
  }
})




//testing
const chatRooms = asyncHandler(async (req, res) => {
  try {
    const currentUser = req.user._id;

    // Find chat rooms where the current user is a participant
    const chatRooms = await ChatRoom.find({ participants: currentUser }).populate({
      path: 'messages',
      model: 'ChatMessage',
    });

    const chatRoomsData = await Promise.all(
      chatRooms.map(async (chatRoom) => {
        const otherParticipantId = chatRoom.participants.find(
          (participantId) => participantId.toString() !== currentUser.toString()
        );
        const otherParticipant = await User.findById(otherParticipantId, 'name profileImage');

        // Find the latest message for the chat room
        const latestMessage = await ChatMessage.findOne(
          { room: chatRoom._id },
          {},
          { sort: { createdAt: -1 } }
        ).lean();

        return {
          _id: chatRoom._id,
          otherParticipant,
          messages: chatRoom.messages,
          lastMessage: latestMessage, // Include the latest message
        };
      })
    );

    // Sort the chat rooms based on the latest message timestamp
    chatRoomsData.sort((a, b) => {
      if (a.lastMessage && b.lastMessage) {
        return b.lastMessage.createdAt - a.lastMessage.createdAt;
      }
      return 0;
    });

    res.json({ chatRooms: chatRoomsData });
  } catch (error) {
    console.error('Error fetching chat rooms:', error);
    res.status(500).json({ message: 'Error fetching chat rooms' });
  }
});




const chatSend = asyncHandler(async (req, res) => {
  try {
    const { content } = req.body;
    const chatRoomId = req.params.chatRoomId;
    const senderId = req.user._id; // Assuming you have the user's ID from authentication

    // Create a new chat message
    const newChatMessage = new ChatMessage({
      room: chatRoomId,
      sender: senderId,
      content: content,
    });

    // Save the message to the database
    await newChatMessage.save();

    // Fetch the newly created message along with sender and chat info
    const message = await ChatMessage.findById(newChatMessage._id)
      .populate('sender', 'name pic')
      .populate({
        path: 'room',
        populate: {
          path: 'participants',
          select: 'name pic email',
        },
      })
      .exec();

    res.status(201).json({ newChatMessage: message });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ message: 'Error sending message' });
  }
});




const chatMessages = asyncHandler(async(req,res)=>{
  try {
    const chatRoomId = req.params.chatRoomId;
    const messages = await ChatMessage.find({ room: chatRoomId }).sort({ createdAt: 1 }).populate('sender');

    const messagesWithSenderNames = messages.map((msg) => {
      return {
        _id: msg._id,
        sender: msg.sender._id,
        senderName: msg.sender.name,
        content: msg.content,
        createdAt: msg.createdAt,
      };
    });

    res.json({ messages: messagesWithSenderNames });
  } catch (error) {
    console.error('Error fetching chat messages:', error);
    res.status(500).json({ message: 'Error fetching chat messages' });
  }
})



const participants = asyncHandler(async (req, res) => {
  try {
    const chatRoom = await ChatRoom.findById(req.params.chatRoomId)
      .populate('participants', '_id name profileImage')
      .select('participants');

    const participantDetails = chatRoom.participants.map(participant => ({
      _id: participant._id,
      name: participant.name,
      profileImage: participant.profileImage
    }));


    // console.log(participantDetails);
    res.status(200).json(participantDetails);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching participants' });
  }
});




const getChatRoomId = asyncHandler(async(req,res)=>{
  try {
    const otherUserId = req.params.userId;
    const currentUserId = req.user._id; 


  } catch (error) {
    
  }
})



const makeNotifi = asyncHandler(async (req, res) => {
  try {
    const { chatRoomId } = req.params;
    const { messageId } = req.body; // Assuming you pass messageId in the request body

    // Find the chat room by ID
    const chatRoom = await ChatRoom.findById(chatRoomId);

    if (!chatRoom) {
      return res.status(404).json({ message: 'Chat room not found' });
    }

    // Use addToSet to add the message ID to the chat room's messages array
    chatRoom.messages.addToSet(messageId);

    // Save the chat room with the updated messages array
    await chatRoom.save();

    res.status(200).json({ message: 'Message added to chat room' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});




const getMessageById = async (req, res) => {
  const { messageId } = req.params;

  try {
    // Find the message by its ID and populate the sender field
    const message = await ChatMessage
      .findById(messageId)
      .populate('sender', '_id');
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    res.status(200).json(message);
  } catch (error) {
    console.error('Error fetching message:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};




const deleteMessagesByChatRoom = async (req, res) => {
  const { chatRoomId } = req.params;

  try {
    // Find the ChatRoom document by its ID and update it to remove all messages
    const result = await ChatRoom.findByIdAndUpdate(chatRoomId, { $set: { messages: [] } });

    if (result) {
      // Messages were removed successfully
      res.status(204).send(); // No content response for successful removal
    } else {
      // ChatRoom not found
      res.status(404).json({ message: 'ChatRoom not found' });
    }
  } catch (error) {
    console.error('Error deleting messages from chat room:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};





const getNotificationStatus = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  try {
    const chatRooms = await ChatRoom.find({
      participants: userId,
    });

    const notificationStatus = {};

    // Iterate through each chat room
    for (const chatRoom of chatRooms) {
      let hasUnreadMessage = false;

      // Check if the chat room has any messages
      if (chatRoom.messages.length > 0) {
        // Find the latest message ID in the chat room
        const latestMessageId = chatRoom.messages[chatRoom.messages.length - 1];

        // Fetch the latest message details from the ChatMessage collection
        const latestMessage = await ChatMessage.findById(latestMessageId);

        // Check if the latest message sender is not the current user
        if (latestMessage && latestMessage.sender.toString() !== userId.toString()) {
          hasUnreadMessage = true;
        }
      }

      notificationStatus[chatRoom._id] = hasUnreadMessage;
    }

    res.json(notificationStatus);
  } catch (error) {
    console.error('Error fetching notification status:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});




const checkHeadingNotification = asyncHandler(async (req, res) => {
  try {
    const currentUserId = req.user._id;

    // Find chat rooms for the current user
    const chatRooms = await ChatRoom.find({
      participants: currentUserId,
    });

    // Initialize the response as false
    let hasUnreadedMessage = false;

    for (const room of chatRooms) {
      if (room.notification && room.notification.length > 0 && !room.notification.includes(currentUserId)) {
        // If the notification array contains other user IDs, set response to true
        hasUnreadedMessage = true;
        break;
      }
    }

    res.json(hasUnreadedMessage);
  } catch (error) {
    // Handle errors
    res.status(500).json({ message: 'Server error' });
  }
});





const updateNotificationStatus = asyncHandler(async (req, res) => {
  try {
    const roomId = req.params.roomId;
    const currentUserId = req.body.userId;
    const senderId = req.body.senderId; // Get senderId from the request body

    // Find the chat room by ID
    const chatRoom = await ChatRoom.findById(roomId);

    if (!chatRoom) {
      return res.status(404).json({ message: 'Chat room not found' });
    }

    // Check if the current user is a participant in the chat room
    if (chatRoom.participants.includes(currentUserId)) {
      // Update the notification status by adding senderId to the array (without duplicates)
      chatRoom.notification.addToSet(senderId); // Add senderId to the notification array (without duplicates)
      await chatRoom.save();
      res.json({ message: 'Notification status updated' });
    } else {
      res.status(403).json({ message: 'You do not have permission to update notification status for this room' });
    }
  } catch (error) {
    // Handle errors
    res.status(500).json({ message: 'Server error' });
  }
});




const removeNotifications = asyncHandler(async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find all chat rooms where the user is a participant
    const chatRooms = await ChatRoom.find({ participants: userId });

    // Clear the notification array in all chat rooms
    chatRooms.forEach(async (chatRoom) => {
      chatRoom.notification = [];
      await chatRoom.save();
    });

    res.json({ message: 'Notifications removed successfully' });
  } catch (error) {
    // Handle errors
    res.status(500).json({ message: 'Server error' });
  }
});




const topThreePost = asyncHandler(async (req, res) => {
  try {
    // Find the top 3 most liked blogs, sorted in descending order by the number of likes
    const topBlogs = await Blog.find()
      .sort({ likes: -1 })
      .limit(3)
      .select('_id images title summary')
      .lean(); // Use lean() to convert Mongoose document to plain JavaScript object

    res.status(200).json(topBlogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
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
    LikedUsers,
    getSelectedBanner,
    reportBlog,
    postComment,
    getComments,
    createOrGetChatRoom,
    chatRooms,
    chatSend,
    chatMessages,
    participants,
    getChatRoomId,
    makeNotifi,
    getMessageById,
    deleteMessagesByChatRoom,
    getNotificationStatus,
    checkHeadingNotification,
    updateNotificationStatus,
    removeNotifications,
    topThreePost
};