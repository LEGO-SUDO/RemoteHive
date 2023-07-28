// @ts-nocheck

import express from 'express'
import {signIn, signUp, googleAuth} from '../controller/Auth.js'

const router = express.Router()

// New user 
router.post('/signup', signUp)

// Login
router.post('/signin', signIn)

// Google Auth
router.post('/googleauth', googleAuth)

export default router