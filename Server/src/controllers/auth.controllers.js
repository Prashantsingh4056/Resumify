import User from "../models/user.model.js";
import TokenBlackList from "../models/blacklisttoken.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import authRouter from "../routes/auth.routes.js";

/**
 * @name registerUser
 * @route POST /api/auth/register
 * @description Register a new User
 * @access Public
 */
const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Please provide username, email, password",
      });
    }

    const user = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (user) {
      return res.status(400).json({
        message: "User with this email or username already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    console.log(newUser);

    const token = jwt.sign(
      { id: newUser._id, username: newUser.username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.cookie("token", token);

    res.status(201).json({
      message: "User Registered Successfully",
      user: {
        id: newUser._id,
        email: newUser.email,
        username: newUser.username,
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};



/**
 * @name loginUser
 * @route POST /api/auth/login
 * @description Logins a Registered User
 * @access Public
 */
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status.json({
        message: "Email and Password are Required!",
      });
    }

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid Email or Password",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "Wrong Email or Password",
      });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.cookie("token", token);

    res.status(200).json({
      message: "loggedIn successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


/**
 * @name logoutUser
 * @route GET /api/auth/logout
 * @description logs out a user
 * @access public
 */
const logoutUser = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (token) {
      await TokenBlackList.create({ token });
    }

    res.clearCookie("token");

    res.status(200).json({
      message: "logged out successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


/**
 * @name getMe
 * @route GET /api/auth/get-me
 * @description get the current logged in user details
 * @access private
 */
const getMe = async (req, res) => {

  const {id} = req.user;

  const user = await User.findById(id);


  return res.status(200).json({
    message: "User details fetched successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email
    }
  })

}

export { registerUser, loginUser, logoutUser, getMe };
