import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import crypto from 'crypto'

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
  cart: [{
    product: { type: mongoose.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number },
    color: { type: String }
  }],
  address: {
    type: Array,
    default: []
  },
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

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) next()
  const saltRounds = 10
  const salt = bcrypt.genSaltSync(saltRounds)
  this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods = {
  // Compare password
  isCorrectPassword: async function(password) {
    return await bcrypt.compare(password, this.password)
  },

  // Create reset token
  createPasswordResetToken: function() {
    const resetToken = crypto.randomBytes(32).toString('hex')
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex')
    const TIME_RESET_TOKEN_EXPIRES = 15 * 60 * 1000
    this.passwordResetExpires = Date.now() + TIME_RESET_TOKEN_EXPIRES
    return resetToken
  }
}

export default mongoose.model('User', userSchema)