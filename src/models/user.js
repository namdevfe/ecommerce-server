const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    require: true
  },
  lastName: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true,
    unique: true
  },
  phoneNumber: {
    type: String,
    require: true,
    unique: true
  },
  password: {
    type: String,
    require: true,
  },
  role: {
    type: String,
    default: 'user'
  },
  cart: {
    type: Array,
    default: []
  },
  address: [{ type: mongoose.Types.ObjectId, ref: 'Address' }],
  wishList: [{ type: mongoose.Types.ObjectId, ref: 'Product' }],
  isBlocked: {
    type: Boolean,
    default: false
  },
  refreshToken: {
    type: String,
  },
  passwordChangeAt: {
    type: String
  },
  passwordResetToken: {
    type: String
  },
  passwordResetExpires: {
    type: String,
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('User', userSchema)