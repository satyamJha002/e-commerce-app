import UserDetails from '../models/userDetails.model.js'
import asyncHandler from "../middleware/asyncHandler.js";

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

export {updateUserDetails, getUserProfile}
