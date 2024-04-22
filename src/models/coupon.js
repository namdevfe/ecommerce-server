import mongoose from 'mongoose'

// Declare the Schema of the Mongo model
var couponSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true,
    unique:true,
    uppercase: true
  },
  expery: {
    type: Date,
    require: true
  },
  discount: {
    type: Number,
    require: true
  }
}, {
  timestamps: true
})

//Export the model
export default mongoose.model('Coupon', couponSchema)