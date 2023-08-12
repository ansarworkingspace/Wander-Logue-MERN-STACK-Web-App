import express from "express";
import {authAdmin,getAllUsers,logoutAdmin,registerAdmin,getUserByEmail,toggleBlockUser,getBlockedUsers,allUsersBlogs,getOneBlogOfUser } from '../controllers/adminController.js'


const router = express.Router();



router.post('/auth',authAdmin)
router.post('/register',registerAdmin)
router.post('/logout',logoutAdmin)
router.get('/adminHome',getAllUsers)
router.get('/userProfile', getUserByEmail);
router.post('/toggleBlockUser', toggleBlockUser); // Add this route
router.get('/getBlockedUsers', getBlockedUsers);
router.get('/allBlogs', allUsersBlogs);
router.get('/getOneBlogOfUser/:blogId', getOneBlogOfUser);

export default router;