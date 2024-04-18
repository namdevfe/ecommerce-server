import mongoose from 'mongoose'

const productSchema = mongoose.Schema({
  title: {
    type: String,
    require: true
  },
  description: {
    type: String,
    require: true
  },
  slug: {
    type: String,
    require: true,
    lowercase: true
  },
  price: {
    type: Number,
    require: true
  },
  quantity: {
    type: Number,
    default: 0
  },
  brand: {
    type: String,
    require: true
  },
  category: {
    type: mongoose.Types.ObjectId,
    ref: 'Category'
  },
  sold: {
    type: Number,
    default: 0
  },
  images: {
    type: Array
  },
  colors: {
    type: String,
    enum: ['Black', 'Grown', 'Red']
  },
  ratings: [
    {
      star: { type: Number },
      postedBy: { type: mongoose.Types.ObjectId, ref: 'User' },
      comment: { type: String }
    }
  ],
  totalRatings: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
})

export default mongoose.model('Product', productSchema)