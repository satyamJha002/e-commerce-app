import express from 'express'
import {updateUserDetails, getUserProfile, updateAvatarController} from '../controllers/userDetails.controller.js'
import {protectAuthMiddleware} from "../middleware/authMiddleware.js";
import {uploadSingle} from "../middleware/uploadMiddleware.js"


const router = express.Router()

router.route('/upload-avatar').post(protectAuthMiddleware, uploadSingle('avatar'), updateAvatarController);

router.route('/')
    .put(protectAuthMiddleware, uploadSingle('avatar'), updateUserDetails)
    .get(protectAuthMiddleware, getUserProfile)

export default router;
