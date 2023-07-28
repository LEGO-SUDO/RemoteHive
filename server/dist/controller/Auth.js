// @ts-nocheck
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import User from '../models/User.js';
import { createError } from '../error.js';
dotenv.config();
// function for signup
export const signUp = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({ ...req.body, password: hash });
        await newUser.save();
        res.status(200).send(newUser);
    }
    catch (err) {
        next(err);
    }
};
//function for signin
export const signIn = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user)
            return next(createError(404, 'User not found!'));
        console.log(user);
        const isCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isCorrect)
            return next(createError(404, 'Wrong password!'));
        const token = jwt.sign({ id: user._id }, process.env.JWT);
        const { password, ...others } = user._doc;
        res
            .cookie('access_token', token, {
            httpOnly: true,
            sameSite: 'none',
            secure: true,
            maxAge: 3600000 * 5,
        })
            .status(200)
            .json(others);
    }
    catch (err) {
        console.log(err);
    }
};
export const googleAuth = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT);
            res
                .cookie('access_token', token, {
                expires: new Date(Date.now() + 604800000),
                secure: env.ENVIRONMENT === 'LIVE',
                sameSite: env.ENVIRONMENT === 'LIVE' ? 'none' : 'lax',
                httpOnly: true,
            })
                .status(200)
                .json(user._doc);
        }
        else {
            const newUser = new User({
                ...req.body,
                fromGoogle: true,
            });
            const savedUser = await newUser.save();
            const token = jwt.sign({ id: savedUser._id }, process.env.JWT);
            res
                .cookie('access_token', token, {
                expires: new Date(Date.now() + 604800000),
                secure: env.ENVIRONMENT === 'LIVE',
                sameSite: env.ENVIRONMENT === 'LIVE' ? 'none' : 'lax',
                httpOnly: true,
            })
                .status(200)
                .json(savedUser._doc);
        }
        console.log(req.cookies);
    }
    catch (err) {
        next(err);
    }
};
//# sourceMappingURL=Auth.js.map