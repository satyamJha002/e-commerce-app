import jwt from 'jsonwebtoken'
import asyncHandler from "./asyncHandler.js";
import Auth from '../models/auth.model.js'

const protectAuthMiddleware = asyncHandler(async (req, res, next) => {
    let token;

    token = req.cookies?.token;

    if (!token && req.headers.authorization?.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        console.log('Auth Debug: No token found in cookies or headers');
        console.log('Cookies:', req.cookies);
        console.log('Headers:', req.headers);
        res.status(401);
        throw new Error('Not authorized, no token');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await Auth.findById(decoded.id).select("-password");

        if (!req.user) {
            res.status(401);
            throw new Error('Auth not found');
        }

        next();
    } catch (error) {
        console.error('Token Error:', error.message);
        res.status(401);
        throw new Error('Not authorized, token failed');
    }
})

const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next()
    } else {
        res.status(401);
        throw new Error('Not authorized as admin');
    }
}

export {protectAuthMiddleware, admin};
