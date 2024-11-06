const User = require("../models/User");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { name, email, googleId, Picture, VerifiedEmail, loginType, password } =
    req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      res.json({ token: user.token, _id: user._id });
    } else {
      if (loginType == "Google") {
        const token = jwt.sign({ id: googleId }, "secret");

        user = new User({
          name,
          email,
          googleId,
          Picture,
          token,
          VerifiedEmail,
          loginType,
        });
        await user.save();
      } else {
        const token = jwt.sign({ id: email }, "secret");

        user = new User({
          email,
          password,
          loginType,
          token,
        });
        await user.save();
      }
      res.json({ token: user.token, _id: user._id });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const recipes = await User.findById(userId);
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  const { userId } = req.params;
  const updateData = req.body; // Data to update (e.g., username, email, etc.)

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true, runValidators: true } // new: true returns the updated document
    );
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  getProfile,
  register,
  updateUser,
};
