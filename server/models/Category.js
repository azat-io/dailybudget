import mongoose from 'mongoose'
import uuid from 'uuid/v4'

const Schema = mongoose.Schema

const Category = new Schema({
  id: {
    type: String,
    default: uuid(),
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
})

export default mongoose.model('Category', Category)
