import express from "express";
import {authAdmin,getAllUsers,logoutAdmin,registerAdmin,uploadBanner,getTopLikedBlogs,checkActiveTrue,topUsersWithMostFollowers,deleteBlog,countOfTotalBlogs,countOfTotalUsers,getReportedBlogs,selectBanner,deleteBanner,getBanners,getUserByEmail,toggleBlockUser,getBlockedUsers,allUsersBlogs,getOneBlogOfUser,adminCheckAuth } from '../controllers/adminController.js'
import { protect } from '../middleware/adminAuthMiddleware.js';
import multer from 'multer';
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

router.post('/auth',authAdmin)
router.post('/register',registerAdmin)
router.post('/logout',logoutAdmin)
router.get('/adminHome',protect,getAllUsers)
router.get('/userProfile',protect,getUserByEmail);
router.post('/toggleBlockUser',protect, toggleBlockUser); // Add this route
router.get('/getBlockedUsers', getBlockedUsers);
router.get('/allBlogs',protect, allUsersBlogs);
router.get('/getOneBlogOfUser/:blogId',protect, getOneBlogOfUser);
router.get('/adminCheckAuth', adminCheckAuth);
router.post('/uploadBanner',protect, upload.single('media'), uploadBanner);
router.get('/banners',protect, getBanners);
router.delete('/deleteBanner/:id',protect,deleteBanner);
router.post('/selectBanner/:id',protect,selectBanner)
router.get('/reportedBlogs',protect, getReportedBlogs);
router.delete('/deleteBlog/:blogId',protect, deleteBlog);
router.get('/countOfTotalUsers',protect, countOfTotalUsers);
router.get('/countOfTotalBlogs',protect, countOfTotalBlogs);
router.get('/topUsersWithMostFollowers',protect,topUsersWithMostFollowers);
router.get('/checkActiveTrue',checkActiveTrue)
router.get('/topLikedBlogs',protect, getTopLikedBlogs);

export default router;