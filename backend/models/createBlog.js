import mongoose from "mongoose";

const { Schema } = mongoose;

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    summary: {   // Added the "summary" field
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    images: [String],
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',  // Reference to the User collection (assumption: user who created the blog)
      required: true
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'  // Reference to the User collection (assumption: users who liked the blog)
      }
    ],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment'  // Reference to the Comment collection
      }
    ],
    keywords: [String]  // Add a field to store keywords associated with the blog
  },
  {
    timestamps: true
  }
);

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;
