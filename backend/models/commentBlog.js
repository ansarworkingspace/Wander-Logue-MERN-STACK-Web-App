import mongoose from "mongoose";

const { Schema } = mongoose;

const commentSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User', // Reference to the User collection (assumption: user who created the comment)
      required: true
    },
    content: {
      type: String,
      required: true
    },
    blog: {
      type: Schema.Types.ObjectId,
      ref: 'Blog', // Reference to the Blog collection
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);


const Comment = mongoose.model('Comment', commentSchema);

export default Comment;
