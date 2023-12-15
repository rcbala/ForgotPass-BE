import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import nodemailer from "nodemailer"
import crypto from "crypto"

export const FindUserExsist = (req) => {
  return User.findOne({
    email: req.body.email,
  });
};

export const generateToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY);
};

 
export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

 export const generateRandomString = () => {
  return crypto.randomBytes(20).toString("hex");
};

 export const sendResetPasswordEmail = async (email, randomString) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Password Reset",
    html: `<p>Click the following link to reset your password: <a href="http://localhost:5173/${randomString}">Reset Password</a></p>`,
  };

  
  await transporter.sendMail(mailOptions);
};