import mongoose from 'mongoose'

const productCategorySchema = mongoose.Schema({
  title: {
    type: String,
    require: true,
    unique: true,
    index: true
  }
}, {
  timestamps: true
})

export default mongoose.model('ProductCategory', productCategorySchema)