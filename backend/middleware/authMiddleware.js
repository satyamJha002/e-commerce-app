import jwt from 'jsonwebtoken'
import asyncHandler from "./asyncHandler.js";
import User from '../models/auth.model.js'

const protectAuthMiddleware = asyncHandler(async (req, res, next) => {
    let token;

    console.log(req.cookies);

    token = req.cookies.token

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select("-password");
            next();
        } catch (error) {
            res.status(401);
            throw new Error('Unauthorized, token failed')
        }
    } else {
        res.status(401);
        throw new Error('Unauthorized, token not found')
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
