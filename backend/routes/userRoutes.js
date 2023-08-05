import express from "express";
import multer from 'multer';
import { authUser,
         registerUser,
         logoutUser,
         getUserProfile,
         updateUserProfile } from "../controllers/userControllers.js";
import { protect } from '../middleware/authMiddleware.js';


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
router.get('/profile',protect,getUserProfile)
router.put('/editProfile',protect,upload.single('profileImage'),updateUserProfile);


export default router;

