import express from "express";
import bcrypt from "bcrypt"
import { FindUserExsist, generateRandomString, generateToken, sendResetPasswordEmail } from "../Controller/UserController.js";
import User from "../models/userModel.js";

const router = express.Router()


router.get("/", async () => {
  console.log("welcome");
})

router.post("/signup", async (req, res) => {
  try {
    let user = await FindUserExsist(req);

    if (user) {
      return res.status(400).json({ error: "User Already Exsist!" });
    }

    const salt = await bcrypt.genSalt(10);

    const hashpassword = await bcrypt.hash(req.body.password, salt);

    user = await new User({
      ...req.body,
      password: hashpassword,
    }).save();

    const token = generateToken(user._id);

    res.status(201).json({
      message: "Registered Sucessfully",
      token,
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

router.post("/login", async (req, res) => {
    

    try {
          const user=await FindUserExsist(req)
      
        if (!user) {
            res.status(404).json({error:"User not found"})
        }

        const validatepassword = await bcrypt.compare(
            req.body.password,
            user.password
        )
        if (!validatepassword) {
            res.status(500).json({error:"Wrong password"})
        }

        const token = generateToken(user._id)

        res.status(200).json({message:"Login Sucessfully",token})
        

    } catch (error) {
        
    }
})

router.post('/forgotpassword', async (req, res) => {
     
 const userEmail = req.body.email;

  try {
    
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    
    const randomString = generateRandomString();

    
    user.resetPasswordToken = randomString;
    await user.save();


    await sendResetPasswordEmail(userEmail, randomString);

    
    res.status(200).json({ message: 'Password reset email sent successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }



})
 
router.post('/resetpassword', async (req, res) => {
    

    try {
      const { token, newPassword } = req.body;
          
    
        const user = await User.findOne({ resetPasswordToken: token });

        if (!user) {
          return res.status(400).json({ error: "Invalid token" });
        }

        user.password = await bcrypt.hash(newPassword, 10);
        user.resetPasswordToken = null;
        await user.save();

          res.status(200).json({ message: "Password reset successful" });
          

      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      }

})



export default router;