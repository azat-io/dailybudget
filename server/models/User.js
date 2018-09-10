import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import uuid from 'uuid/v4'

const Schema = mongoose.Schema

const User = new Schema({
  id: {
    type: String,
    default: uuid(),
    unique: true,
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
  created: {
    type: Date,
    default: Date.now(),
  },
})

User.pre('save', function (next) {
  if (!this.isModified('password')) {
    return next()
  }
  bcrypt.genSalt(10, (error, salt) => {
    if (error) {
      return next(error)
    }
    bcrypt.hash(this.password, salt, (error, hash) => {
      if (error) {
        return next(error)
      }
      this.password = hash
      next()
    })
  })
})

export default mongoose.model('User', User)
