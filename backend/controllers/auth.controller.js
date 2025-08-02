import asyncHandler from "../middleware/asyncHandler.js";
import Auth from '../models/auth.model.js'
import {generateToken} from "../utils/generateToken.js";

const register = asyncHandler(async (req, res) => {
    const {email, password, username} = req.body;

    const field = [email, password, username];

    if (field.some(f => !f)) {
        res.status(400);
        throw new Error('Please fill out the required field');
    }

    const authExist = await Auth.findOne({$or: [{email}, {username}]})

    if (authExist) {
        res.status(400);
        throw new Error('User is already registered with this email and username')
    }

    const auth = await Auth.create({
        email,
        password,
        username,
        role: 'user',
        isAdmin: false,
    })

    if (auth) {
        const token = generateToken(auth._id);

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Standard practice
            sameSite: 'strict',
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
            path: '/'
        })

        res.status(201).json({
            _id: auth._id,
            email: auth.email,
            username: auth.username,
            password: auth.password,
            role: auth.role,
            isAdmin: auth.isAdmin,
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

    const auth = await Auth.findOne({email})

    console.log('user', auth)

    if (auth && (await auth.matchPassword(password))) {
        const token = generateToken(auth._id);

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Standard practice
            sameSite: 'strict',
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
            path: '/'
        })

        res.status(200).json({
            email: auth.email,
            username: auth.username,
            role: auth.role,
            isAdmin: auth.isAdmin,
            token
        })
    } else {
        res.status(400);
        throw new Error('Invalid email and password');
    }
})

const getMe = asyncHandler(async (req, res) => {
    const auth = await Auth.findById(req.user._id).select('-password'); // Fixed typo

    if (!auth) {
        return res.status(404).json({message: 'Auth not found'});
    }

    res.status(200).json({
        _id: auth._id,
        email: auth.email,
        username: auth.username,
        role: auth.role,
        isAdmin: auth.isAdmin
    });
});

const logout = asyncHandler(async (req, res) => {
    res.cookie('token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        expires: new Date(0)
    });
    res.status(200).json({message: 'Logged out successfully'});
});
export {register, login, getMe, logout};
