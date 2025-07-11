import mongoose from "mongoose";
import User from "../models/UserSchema.model.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    return res
      .status(200)
      .json({ success: true, message: "Users got Successfully!", data: users });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};
export const updateUser = async (req, res, next) => {
  const userId = req.params.id;
  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(417).json({ success: false, message: "Invalid ID" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: req.body },
      { new: true }
    );
    return res
      .status(200)
      .json({ success: true, message: "User Updated!", data: updatedUser });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};
export const deleteUser = async (req, res, next) => {
  const userId = req.params.id;

  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(417).json({ success: false, message: "Invalid ID" });
    }
    await User.findByIdAndDelete(userId);
    return res.status(200).json({ success: true, message: "User Deleted!" });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};
export const getSingleUser = async (req, res, next) => {
  const userId = req.userId;

  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(417).json({ success: false, message: "Invalid ID" });
    }
    const user = await User.findById(userId)
    const {password, ...rest} = user._doc
    return res.status(200).json({ success: true, message: "User Found!", data:{...rest}});
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

