// import mongoose from 'mongoose'

import mongoose from 'mongoose'

const dbConnect = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URI)
    if (connect.connection.readyState === 1) {
      console.log('MongoDB connection is successfully')
    } else {
      console.log('Connect to mongodb failed')
    }
  } catch (error) {
    console.log('Connect to mongodb failed')
    throw new Error(error)
  }
}

export default dbConnect