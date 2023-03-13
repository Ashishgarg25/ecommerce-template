const User = require("../models/User");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(404)
        .json({ variant: "error", msg: "Please enter mandatory fields!" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    password = hashedPassword;

    const data = await User.create({ name, email, password, isActive: true });

    if (data) {
      const token = JWT.sign(
        { userId: data._id },
        process.env.ACCESS_TOKEN_SECRET
      );

      const response = {
        name,
        email,
        token,
        isActive,
      };

      return res.status(201).json({
        message: {
          text: `${name} your account is successfully created!`,
          variant: "success",
        },
        response,
      });
    } else {
      return res.status(404).json({
        variant: "error",
        msg: "Something went wrong. Please try again!",
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      variant: "error",
      msg: "Something went wrong. Please try again!",
    });
  }
};

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(404)
        .json({ variant: "error", msg: "Please enter mandatory fields!" });
    }

    const data = await User.findOne({ email });

    if (!data || !bcrypt.compareSync(password, data.password)) {
      return res
        .status(404)
        .json({ variant: "error", msg: "Incorrect email or password!" });
    }

    const token = JWT.sign(
      { userId: data._id },
      process.env.ACCESS_TOKEN_SECRET
    );

    return res.status(201).json({
      name: data.name,
      email: data.email,
      token,
      isActive: data.isActive,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      variant: "error",
      msg: "Something went wrong. Please try again!",
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(400).json({
        variant: "error",
        msg: "No user found!",
      });
    }

    const { phone, address } = req.body;

    if (phone) user.phone = phone;
    if (address) {
      if (user.address.length > 0) {
        await user.update({ _id: user._id }, { $push: { address: address } });
      } else user.address = address;
    }

    const updatedUser = await user.save();

    return res.status(201).json({
      response: updatedUser,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      variant: "error",
      msg: "Something went wrong. Please try again!",
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { _id } = req.body;

    if (!_id) {
      return res.status(404).json({ variant: "error", msg: "No user found!" });
    }

    const isDeleted = await User.findOneAndRemove({ _id });

    if (!isDeleted) {
      res.status(403).json({
        variant: "error",
        msg: "Something went wrong. Please try again!",
      });
    }

    console.log(isDeleted);

    return res.status(201).json({
      message: {
        text: `User Deleted successfully!`,
        variant: "success",
      },
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      variant: "error",
      msg: "Something went wrong. Please try again!",
    });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ variant: "error", msg: "No user found!" });
    }

    const link = `https://ecom-template.co/${email}`;

    const subject = "Reset Password";
    const mailBody = `Please click the link to reset your password ${link}`;
    const sendTo = email;
    // const mailSender = process.env.SMTP_EMAIL;

    // TODO: SEND_MAIL THROUGH NODEMAILER
    // await SEND_MAIL(subject, mailBody, sendTo, mailSender);

    return res.status(201).json({
        message: {
          text: `Reset Password link sent on ${email}!`,
          variant: "success",
        },
      });

  } catch (e) {
    console.log(e);
    return res.status(500).json({
      variant: "error",
      msg: "Something went wrong. Please try again!",
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await user.findOne({ email });

    if (!user)
      return res.status(404).json({ variant: "error", msg: "No user found!" });

    const hashedPassword = bcrypt.hashSync(password, 10);
    password = hashedPassword;

    user.password = password;

    const response = await user.save();

    if (response) {
      return res.status(201).json({
        message: {
          text: `Password reset successfully!`,
          variant: "success",
        },
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      variant: "error",
      msg: "Something went wrong. Please try again!",
    });
  }
};

module.exports = {
  signup,
  signin,
  updateUser,
  deleteUser,
  forgotPassword,
  resetPassword,
};
