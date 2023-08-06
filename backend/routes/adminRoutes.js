import express from "express";
import {authAdmin,getAllUsers,logoutAdmin,registerAdmin,getUserByEmail} from '../controllers/adminController.js'


const router = express.Router();



router.post('/auth',authAdmin)
router.post('/register',registerAdmin)
router.post('/logout',logoutAdmin)
router.get('/adminHome',getAllUsers)
router.get('/userProfile', getUserByEmail);

export default router;