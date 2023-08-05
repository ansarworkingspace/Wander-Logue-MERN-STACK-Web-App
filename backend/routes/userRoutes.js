import express from "express";
import { authUser,
         registerUser,
         logoutUser,
         getUserProfile,
         updateUserProfile } from "../controllers/userControllers.js";
import { protect } from '../middleware/authMiddleware.js';


         const router = express.Router();

router.post('/auth',authUser)
router.post('/register',registerUser)
router.post('/logout',logoutUser)
router.get('/profile',protect,getUserProfile)
router.put('/editProfile',protect,updateUserProfile);
// router.get('/allUsers', protect, getAllUsers);

export default router;

