import mongoose from 'mongoose'

// Declare the Schema of the Mongo model
var blogSchema = new mongoose.Schema({
  title:{
    type: String,
    required:true
  },
  description:{
    type: String,
    required:true
  },
  category:{
    type: String,
    required:true
  },
  views:{
    type: Number,
    default: 0
  },
  likes: [
    { type: mongoose.Types.ObjectId, ref: 'User' }
  ],
  dislikes: [
    { type: mongoose.Types.ObjectId, ref: 'User' }
  ],
  image: {
    type: String
  },
  author: {
    type: String,
    default: 'Admin'
  }
})

//Export the model
export default mongoose.model('Blog', blogSchema)