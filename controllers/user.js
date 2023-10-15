import User from "../models/user.js";
import Verify from "../models/verify.js";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import "dotenv/config";

export const registerUser = async (req, res) => {
  const { email, password } = req.body;

  const salt = await bcrypt.genSalt(10);
  const userExist = await User.findOne({ email });

  if (userExist) {
    return res.status(409).json({
      status: 409,
      error: "Duplicate User",
    });
  }

  try {
    const newUser = new User({
      email,
      password: await bcrypt.hash(password, salt),
    });
    const user = await newUser.save();

    return res.status(201).json({
      status: 201,
      message: "Successfully registered",
      data: { id: user._id, email },
    });
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return res.status(409).json({
        status: 409,
        error: "Duplicate user credentials!",
      });
    } else {
      return res.status(500).json({
        status: 500,
        error: "Server Error!",
      });
    }
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const userExist = await User.findOne({ email });
  if (!userExist) {
    return res
      .status(404)
      .json({ status: 404, message: "User not found", token: null });
  }
  try {
    const match = await bcrypt.compare(password, userExist.password);
    const user = { id: userExist._id };
    const token = Jwt.sign(user, process.env.JWT_TOKEN, { expiresIn: 360000 });

    if (match) {
      return res.status(200).json({
        status: 200,
        message: "Successfully logged in",
        token: token,
      });
    }
    return res
      .status(409)
      .json({ status: 409, message: "Incorrect Password", token: null });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      status: 400,
      message: "Error decrypting",
      token: null,
    });
  }
};
