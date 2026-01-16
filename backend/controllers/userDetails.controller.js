import UserDetails from '../models/userDetails.model.js'
import asyncHandler from "../middleware/asyncHandler.js";
import {uploadToCloudinary} from '../utils/cloudinary.js'

const updateUserDetails = asyncHandler(async (req, res) => {
    const {firstName, lastName, phoneNumber, address} = req.body;

    const userDetails = await UserDetails.findOneAndUpdate({auth: req.user._id}, {
        firstName,
        lastName,
        phoneNumber,
        address,
        auth: req.user._id
    }, {new: true, upsert: true})

    res.status(200).json({
        message: 'User created successfully.',
        userDetails
    });
})

const updateAvatarController = asyncHandler(async (req, res) => {
    if(!req.file) {
        res.status(400);
        throw new Error('Please upload the image');
    }

    // req.file.buffer contains the file data since you're using memoryStorage
    const result = await uploadToCloudinary(req.file.buffer, { folder: 'avatars' });

    const userDetails = await UserDetails.findOneAndUpdate(
        {auth: req.user._id},
        {avatar: result.secure_url},
        {new: true, upsert: true}
    )

    res.status(200).json({
        message: "Avatar image updated successfully",
        avatar: userDetails.avatar
    })
})

const getUserProfile = asyncHandler(async (req, res) => {
    const userDetails = await UserDetails.findOne({auth: req.user._id})

    res.status(200).json({
        user: {
            email: req.user.email,
            username: req.user.username,
            role: req.user.role,
            isAdmin: req.user.isAdmin,
        },
        profile: userDetails
    })
})

export {updateUserDetails, getUserProfile, updateAvatarController}
