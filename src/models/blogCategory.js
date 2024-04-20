import mongoose from 'mongoose'

const blogCategorySchema = mongoose.Schema({
  title: {
    type: String,
    require: true,
    unique: true,
    index: true
  }
}, {
  timestamps: true
})

export default mongoose.model('BlogCategory', blogCategorySchema)