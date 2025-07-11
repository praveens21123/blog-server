import mongoose from "mongoose";
import Blog from "../models/BlogSchema.model.js";
import User from "../models/UserSchema.model.js";

export const createBlog = async (req, res, next) => {
  const { title, content, topic, imageUrl } = req.body;
  const userId = req.userId;

  try {
    const user = await User.findById(userId);
    let blog = new Blog({
      title,
      content,
      topic,
      imageUrl,
      user: { id: userId, userName: user.userName },
    });

    await blog.save();

    return res
      .status(200)
      .json({ success: true, message: "Blog saved successfully...!" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error", err: error });
  }
};

export const getAllBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find();
    return res
      .status(200)
      .json({ success: true, message: " All Blogs found", data: blogs });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const editBlog = async (req, res, next) => {
  const blogId = req.params.id;

  try {
    if (!blogId) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found!" });
    }
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      { $set: req.body },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Blog edited successfully...!",
      data: blog,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getSingleBlog = async (req, res, next) => {
  const blogId = req.params.id;

  try {
    if (!mongoose.Types.ObjectId.isValid(blogId)) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid Blog ID!" });
    }

    if (!blogId) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found!" });
    }

    const blog = await Blog.findById(blogId);
    console.log(blog);

    return res.status(200).json({
      success: true,
      message: "Blog found successfully...!",
      data: blog,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getBlogByTitle = async (req, res, next) => {
  const t = req.params.title;

  try {
    const blogs = await Blog.find({ title: new RegExp(t, "i") });

    if (!blogs || blogs.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: `Blog not found from ${t}` });
    }
    return res
      .status(200)
      .json({ success: true, message: "Blog Found", data: blogs });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const deleteBlog = async (req, res, next) => {
  const blogId = req.params.id;
  console.log(blogId);

  try {
    if (!mongoose.Types.ObjectId.isValid(blogId)) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found!" });
    }
    const blog = await Blog.findByIdAndDelete({ _id: blogId });
    return res.status(200).json({ success: true, message: "Blog Deleted!" });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getBlogByQueryParams = async (req, res, next) => {
  const t = req.query.title;

  try {
    const blogs = await Blog.find({ title: new RegExp(t, "i") });

    if (!blogs || blogs.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: `Blog not found from ${t}` });
    }
    return res
      .status(200)
      .json({ success: true, message: "Blog Found", data: blogs });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
