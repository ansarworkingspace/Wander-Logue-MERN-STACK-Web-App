import asyncHandler from 'express-async-handler'
import admin from '../models/adminModels.js'
import adminJwt from '../utils/userJWT.js'
import {fetchAllUsers} from '../helpers/adminHelpers.js'
import user from '../models/userModels.js'
import Blogs from '../models/createBlog.js'
import generateAdminToken from '../utils/adminJwt.js'
import jwt from 'jsonwebtoken'
import Banner from '../models/bannerSchema.js';

// Authenticate an Admin
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



// Register a New Admin
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




// Log Out the Currently Authenticated Admin
const logoutAdmin = asyncHandler(async (req,res)=>{
    res.cookie('adminJwt','',{
        httpOnly:true,
        expires:new Date(0)
       })
       
       
    res.status(200).json({message:'admin logged out'});
});




// Retrieve a List of All Registered Users
const getAllUsers = asyncHandler(async (req,res) => {
    fetchAllUsers()
      .then((users) => {
        res.status(200).json({users}); 
      })
      .catch((error) => {
        console.log(error);
      });
  })


 // Retrieve a User by Email 
const getUserByEmail = asyncHandler(async (req, res) => {
    const { email } = req.query;
  
    const foundUser = await user.findOne({ email });
  
    if (foundUser) {

      const followersCount = foundUser.followers.length;
      const followingCount = foundUser.following.length;


      res.status(200).json({
        _id: foundUser._id,
        name: foundUser.name,
        email: foundUser.email,
        profileImage:foundUser.profileImage,


        followersCount,
        followingCount,
       
      });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  });


  // Retrieve All Blogs from All Users
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




 // Retrieve a Specific Blog of a User 
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
  

// Toggle User Block Status (Block/Unblock)
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
  

// Retrieve a List of Blocked Users
  const getBlockedUsers = asyncHandler(async (req, res) => {
    try {
      const blockedUsers = await user.find({ status: true }); // Assuming you have a 'status' field in your user schema to indicate blocked status
      res.status(200).json({ blockedUsers });
    } catch (error) {
      res.status(500).json({ error: 'Error fetching blocked users' });
    }
  });


// Check Authentication Status of an Admin
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


// Upload a Banner file
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


// Retrieve a List of All Banner files
const getBanners = async (req, res) => {
  try {
    const banners = await Banner.find();
    res.status(200).json(banners);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching banners.' });
  }
};



// Delete a Specific Banner file
const deleteBanner = async (req, res) => {
  try {
    const bannerId = req.params.id;
    const deletedBanner = await Banner.findByIdAndDelete(bannerId);

    if (!deletedBanner) {
      return res.status(404).json({ message: 'Banner not found.' });
    }

    res.status(200).json({ message: 'Banner deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting banner.' });
  }
};



// Select a Specific Banner file
const selectBanner = async (req, res) => {
  const bannerId = req.params.id;

  try {
    const selectedBanner = await Banner.findById(bannerId);

    if (!selectedBanner) {
      return res.status(404).json({ message: 'Banner not found' });
    }

    if (selectedBanner.selected) {
      return res.status(200).json({ message: 'You have already selected this banner' });
    }

    const currentSelectedBanner = await Banner.findOne({ selected: true });
    if (currentSelectedBanner) {
      currentSelectedBanner.selected = false;
      await currentSelectedBanner.save();
    }

    selectedBanner.selected = true;
    await selectedBanner.save();

    const message = 'Banner selection successful'; // Always show success message

    res.status(200).json({ message });
  } catch (error) {
    console.error('Error selecting banner:', error);
    res.status(500).json({ message: 'Error selecting banner' });
  }
};


// Retrieve a List of Reported Blogs
const getReportedBlogs = async (req, res) => {
  try {
    const reportedBlogs = await Blogs.aggregate([
      { $unwind: '$reportBlog' },
      {
        $group: {
          _id: {
            blogId: '$_id',
            reason: '$reportBlog.reason'
          },
          reportCount: { $sum: 1 }
        }
      },
      { $match: { reportCount: { $gte: 1 } } },
      {
        $project: {
          _id: '$_id.blogId',
          reportReason: '$_id.reason',
          reportCount: 1
        }
      },
      { $sort: { reportCount: -1 } }
    ]);
// console.log(reportedBlogs);
    res.status(200).json(reportedBlogs);
  } catch (error) {
    console.error('Error fetching reported blogs:', error);
    res.status(500).json({ message: 'Error fetching reported blogs' });
  }
};


// Delete a Specific Blog
const deleteBlog = async (req, res) => {
  const { blogId } = req.params;

  try {
    const deletedBlog = await Blogs.findByIdAndDelete(blogId);

    if (!deletedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog:', error);
    res.status(500).json({ message: 'Error deleting blog' });
  }
};


// Get the Total Count of Registered Users
const countOfTotalUsers = async (req, res) => {
  try {
    // Use the User model to query the total count of users in your database
    const totalUsersCount = await user.countDocuments();
// console.log("const :"+totalUsersCount);
    // Send the total users count as JSON response
    res.json({ totalUsersCount });
  } catch (error) {
    console.error('Error fetching total users count:', error);
    res.status(500).json({ error: 'Error fetching total users count' });
  }
};




// Get the Total Count of Blogs
const countOfTotalBlogs = async (req, res) => {
  try {
    // Use the Blog model to query the total count of blogs in your database
    const totalBlogsCount = await Blogs.countDocuments();

    // Send the total blogs count as JSON response
    res.json({ totalBlogsCount });
  } catch (error) {
    console.error('Error fetching total blogs count:', error);
    res.status(500).json({ error: 'Error fetching total blogs count' });
  }
};




// Retrieve Top Users with the Most Followers
const topUsersWithMostFollowers = async (req, res) => {
  try {
    // Use the User model to aggregate the top 3 users with the most followers
    const topUsers = await user.aggregate([
      {
        $project: {
          name: 1,
          followersCount: { $size: '$followers' },
        },
      },
      {
        $sort: { followersCount: -1 },
      },
      {
        $limit: 3,
      },
    ]);

    // Send the top users as JSON response
    res.json(topUsers);
  } catch (error) {
    console.error('Error fetching top users with most followers:', error);
    res.status(500).json({ error: 'Error fetching top users with most followers' });
  }
};




// Check if a User is Active (True)
const checkActiveTrue = asyncHandler(async (req, res) => {
  try {
    const selectedBanner = await Banner.findOne({ selected: true });
    
    if (!selectedBanner) {
      return res.status(404).json({ message: 'No banner is currently selected.' });
    }

    res.json({ bannerId: selectedBanner._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});




// Retrieve the Top Liked Blogs
const getTopLikedBlogs = async (req, res) => {
  try {
    // Query the database to get the top three liked blogs
    const topLikedBlogs = await Blogs.find()
      .sort({ likes: -1 }) // Sort by likes in descending order
      .limit(3); // Limit the result to three blogs

    res.json(topLikedBlogs);
  } catch (error) {
    console.error('Error fetching top liked blogs:', error);
    res.status(500).json({ message: 'Internal server error' });
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
    getBanners,
    deleteBanner,
    selectBanner,
    getReportedBlogs,
    deleteBlog,
    countOfTotalUsers,
    countOfTotalBlogs,
    topUsersWithMostFollowers,
    checkActiveTrue,
    getTopLikedBlogs
  };
  


