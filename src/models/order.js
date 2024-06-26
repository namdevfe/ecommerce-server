import mongoose from 'mongoose'

// Declare the Schema of the Mongo model
var orderSchema = new mongoose.Schema({
  products: [
    {
      product: { type: mongoose.Types.ObjectId, ref: 'Product' },
      count: Number,
      color: String
    }
  ],
  status: {
    type: String,
    default: 'Processing',
    enum: ['Cancelled', 'Processing', 'Succeed']
  },
  total: {
    type: Number
  },
  coupon: {
    type: mongoose.Types.ObjectId,
    ref: 'Coupon'
  },
  orderBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
})

//Export the model
export default mongoose.model('Order', orderSchema)