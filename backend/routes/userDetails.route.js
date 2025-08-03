import express from 'express'
import {updateUserDetails, getUserProfile} from '../controllers/userDetails.controller.js'
import {protectAuthMiddleware} from "../middleware/authMiddleware.js";


const router = express.Router()

router.route('/')
    .put(protectAuthMiddleware, updateUserDetails)
    .get(protectAuthMiddleware, getUserProfile)

export default router;
