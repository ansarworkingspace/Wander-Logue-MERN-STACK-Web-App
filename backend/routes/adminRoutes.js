import express from "express";
import {authAdmin,getAllUsers,logoutAdmin,registerAdmin,getUserByEmail,toggleBlockUser,getBlockedUsers,allUsersBlogs,getOneBlogOfUser,adminCheckAuth } from '../controllers/adminController.js'
import { protect } from '../middleware/adminAuthMiddleware.js';

const router = express.Router();



router.post('/auth',authAdmin)
router.post('/register',registerAdmin)
router.post('/logout',logoutAdmin)
router.get('/adminHome',protect,getAllUsers)
router.get('/userProfile',protect,getUserByEmail);
router.post('/toggleBlockUser', toggleBlockUser); // Add this route
router.get('/getBlockedUsers', getBlockedUsers);
router.get('/allBlogs',protect, allUsersBlogs);
router.get('/getOneBlogOfUser/:blogId',protect, getOneBlogOfUser);
router.get('/adminCheckAuth', adminCheckAuth);



export default router;