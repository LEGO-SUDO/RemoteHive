import { timeStamp } from 'console'
import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
 {
  firstname: {
   type: String,
   required: true,
   unique: false
  },

  lastname: {
   type: String,
   required: true,
   unique: false,
  },

  username: {
   type: String,
   required: true,
   unique: true
  },

  email: {
   type: String,
   required: true,
   unique: true,
  },

  password: {
   type: String,
   required: true,
  },

  profilepic: {
   type: String,
  },

  role: {
   type: String,
   default: 'Public'
  },

  fromGoogle: {
      type: Boolean,
      default: false,
    },
 },
 {timestamps: true}
)

export default mongoose.model('User', userSchema)