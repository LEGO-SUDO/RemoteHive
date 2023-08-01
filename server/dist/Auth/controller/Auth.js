import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import pool from '../database/userdb.js';
dotenv.config();
const checkIfUserAlreadyExists = async (username, email) => {
    try {
        const usernameQuery = "SELECT * FROM users WHERE username = $1";
        const emailQuery = "SELECT * FROM users WHERE email = $1";
        const usernameResult = await pool.query(usernameQuery, [username]);
        const emailResult = await pool.query(emailQuery, [email]);
        if (usernameResult.rows.length > 0) {
            return { error: "Username already exists" };
        }
        if (emailResult.rows.length > 0) {
            return { error: "Only one account can be created per email" };
        }
        return { success: "Username and email unique" };
    }
    catch (error) {
        console.error(error);
        throw new Error("An error occurred while checking user existence"); // Throw an error
    }
};
// function for signup
export const signUp = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const { username, email } = req.body;
        const uniquenessCheck = await checkIfUserAlreadyExists(username, email);
        if (uniquenessCheck.error) {
            res.status(409).send(uniquenessCheck.error);
        }
        else {
            const insertQuery = "INSERT INTO users (firstname, lastname, username, email, password) VALUES ($1, $2, $3, $4, $5)";
            const newUser = await pool.query(insertQuery, [req.body.firstname, req.body.lastname, req.body.username, req.body.email, hash]);
            res.status(200).send("User Created Successfully!");
        }
    }
    catch (err) {
        console.error(err);
    }
};
//function for signin
export const signIn = async (req, res, next) => {
    let findUserQuery;
    try {
        if (req.body.username.includes('@')) {
            findUserQuery = "SELECT * FROM users WHERE email = $1";
        }
        else {
            findUserQuery = "SELECT * FROM users WHERE username = $1";
        }
        const getUser = await pool.query(findUserQuery, [req.body.username]);
        const user = getUser.rows[0];
        if (getUser.rows.length > 0) {
            const isCorrect = await bcrypt.compare(req.body.password, user.password);
            if (!isCorrect) {
                res.status(401).send("Wrong password!");
            }
            else {
                const token = jwt.sign({ id: getUser.username }, process.env.JWT);
                const { password, ...others } = getUser.rows[0];
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
        }
        else {
            res.status(400).send("User not found!");
        }
    }
    catch (err) {
        console.log(err);
    }
};
// export const googleAuth = async (req, res, next) => {
//   try {
//     const user = await User.findOne({ email: req.body.email })
//     if (user) {
//       const token = jwt.sign({ id: user._id }, process.env.JWT)
//       res
//         .cookie('access_token', token, {
//           expires: new Date(Date.now() + 604800000),
//           secure: env.ENVIRONMENT === 'LIVE',
//           sameSite: env.ENVIRONMENT === 'LIVE' ? 'none' : 'lax',
//           httpOnly: true,
//         })
//         .status(200)
//         .json(user._doc)
//     } else {
//       const newUser = new User({
//         ...req.body,
//         fromGoogle: true,
//       })
//       const savedUser = await newUser.save()
//       const token = jwt.sign({ id: savedUser._id }, process.env.JWT)
//       res
//         .cookie('access_token', token, {
//           expires: new Date(Date.now() + 604800000),
//           secure: env.ENVIRONMENT === 'LIVE',
//           sameSite: env.ENVIRONMENT === 'LIVE' ? 'none' : 'lax',
//           httpOnly: true,
//         })
//         .status(200)
//         .json(savedUser._doc)
//     }
//     console.log(req.cookies)
//   } catch (err) {
//     next(err)
//   }
// }
//# sourceMappingURL=Auth.js.map