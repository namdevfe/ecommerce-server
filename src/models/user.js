import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

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
    require: true
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
    type: String
  },
  passwordChangeAt: {
    type: String
  },
  passwordResetToken: {
    type: String
  },
  passwordResetExpires: {
    type: String
  }
}, {
  timestamps: true
})

// eslint-disable-next-line no-unused-vars
userSchema.pre('save', async function (next) {
  const saltRounds = 10
  const salt = bcrypt.genSaltSync(saltRounds)
  this.password = await bcrypt.hash(this.password, salt)
})

// Compare password
userSchema.methods = {
  isCorrectPassword: async function(password) {
    return await bcrypt.compare(password, this.password)
  }
}

export default mongoose.model('User', userSchema)