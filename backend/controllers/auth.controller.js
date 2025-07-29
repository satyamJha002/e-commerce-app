import asyncHandler from "../middleware/asyncHandler.js";
import User from '../models/auth.model.js'
import {generateToken} from "../utils/generateToken.js";

const register = asyncHandler(async (req, res) => {
    const {firstName, lastName, email, password, username, phoneNumber} = req.body;

    const field = [firstName, lastName, email, password, username, phoneNumber];

    if (field.some(f => !f)) {
        res.status(400);
        throw new Error('Please fill out the required field');
    }

    const userExist = await User.findOne({$or: [{email}, {username}]})

    if (userExist) {
        res.status(400);
        throw new Error('User is already registered with this email and username')
    }

    const user = await User.create({
        firstName,
        lastName,
        email,
        password,
        username,
        phoneNumber,
        role: 'user',
        isAdmin: false,
    })

    if (user) {
        const token = generateToken(user._id);

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            maxAge: 60000,
            path: '/'
        })

        res.status(201).json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password,
            phoneNumber: user.phoneNumber,
            role: user.role,
            isAdmin: user.isAdmin,
            token
        })
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

const login = asyncHandler(async (req, res) => {
    const {email, password} = req.body;

    if (!email || !password) {
        res.status(400);
        throw new Error('Please fill out the required field');
    }

    console.log('Email', email)
    console.log('Password', password)

    const user = await User.findOne({email})

    console.log('user', user)

    if (user && (await user.matchPassword(password))) {
        const token = generateToken(user._id);

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'development',
            sameSite: 'strict',
            maxAge: 60000,
        })

        res.status(200).json({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            isAdmin: user.isAdmin,
            token
        })
    } else {
        res.status(400);
        throw new Error('Invalid email and password');
    }
})

const getMe = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select('-password'); // Fixed typo

    if (!user) {
        return res.status(404).json({message: 'User not found'});
    }

    res.status(200).json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
        phoneNumber: user.phoneNumber,
        role: user.role,
        isAdmin: user.isAdmin
    });
});

export {register, login, getMe};
