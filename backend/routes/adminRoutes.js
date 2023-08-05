import express from "express";
import {authAdmin,getAllUsers,logoutAdmin,registerAdmin} from '../controllers/adminController.js'


const router = express.Router();



router.post('/auth',authAdmin)
router.post('/register',registerAdmin)
router.post('/logout',logoutAdmin)
router.get('/adminHome',getAllUsers)


export default router;