import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: {
    type: String,
  },
  contents: {
    type: String,
  },
  author: {
    type: String,
    required: true,
    unique: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  createAt: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('users', PostSchema);