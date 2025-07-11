// Title, content, topic, author, createdAt, cat, imageUrl

import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  topic: {
    type: String,
    required: true,
  },
  timeStamp: {
    type: Date,
    default: Date.now,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  user : {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
      },
      userName : {
        type:String,
        required:true
      }
  },
});

export default mongoose.model("Blog", BlogSchema);
