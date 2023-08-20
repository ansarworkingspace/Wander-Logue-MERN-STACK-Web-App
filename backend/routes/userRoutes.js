import express from "express";
import multer from 'multer';
import { authUser,
         registerUser,
         logoutUser,
         getUserProfile,
         updateUserProfile,createBlog,getUserBlogs,allUsersBlogs,googleAuth,getAuthorBlogs,getFollowerFollowingCount,followUser,checkFollowing,unfollowUser,getOneBlog,getAuthorDetailsById,checkBlogLikeStatus,getBlogLikeCount,updateBlog,likeBlog,allUsersBlogsInLadning,deleteSavedBlog,getUserStatus,checkAuth,deleteBlog ,saveBlogToUser,getSavedBlogs,getSavedSingleBlog} from "../controllers/userControllers.js";
import { protect } from '../middleware/authMiddleware.js';
import checkUserStatus from '../middleware/checkStatus.js'

         const router = express.Router();


// Configure Multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads'); // Destination folder for uploaded images
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + '-' + file.originalname);
    },
  });
  
  const upload = multer({ storage: storage });
  


router.post('/auth',authUser)
router.post('/register',registerUser)
router.post('/logout',logoutUser)
router.get('/profile',protect,getUserProfile)//--------------------------------preventing blockeduser
router.use('/uploads', express.static('uploads'));
router.put('/editProfile',protect,upload.single('profileImage'),updateUserProfile);
router.post('/blogs', protect,upload.single('image'), createBlog);//-------------------------preventing blockeduser
router.get('/blogs', protect,getUserBlogs);
router.get('/allBlogs',allUsersBlogs)
router.get('/getOneBlog/:blogId', getOneBlog);
router.get('/allBlogsLanding',allUsersBlogsInLadning)
router.get('/status/:userId', getUserStatus);
router.get('/checkAuth', checkAuth);
router.delete('/deleteBlog/:blogId',protect, deleteBlog);
router.post('/saveBlog/:blogId', protect, saveBlogToUser);
router.get('/getSavedBlogs', protect, getSavedBlogs)
router.get('/getSavedSingleBlog/:blogId', getSavedSingleBlog);
router.delete('/deleteSavedBlog/:blogId',protect, deleteSavedBlog);
router.put('/updateBlog/:blogId', protect, updateBlog);
router.post('/likeBlog/:blogId', protect, likeBlog);
router.get('/countLike/:blogId', getBlogLikeCount);
router.get('/checkLike/:blogId', protect, checkBlogLikeStatus);
router.get('/authorProfile/:userId', getAuthorDetailsById);
router.route('/getUserBlogs/:userId').get(protect, getAuthorBlogs); 
router.post('/follow/:userId', protect, followUser);
router.post('/unfollow/:userId', protect, unfollowUser);
router.get('/checkFollowing/:userId', protect, checkFollowing);
router.get('/followerFollowingCount/:userId', protect,getFollowerFollowingCount);

//google signupAndIn
router.post('/googleAuth',googleAuth)

export default router;

