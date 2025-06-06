const express = require("express");
const { validateSignupData } = require("../utils/SignUpvalidation");
const Usermodel = require("../Models/user");
const bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");

const authRouter = express.Router();

// SignUp..API
authRouter.post("/signup", async (req, res) => {
  // console.log(req.body);
  try {
    const { firstName, lastName, emailId, password } = req.body;

    validateSignupData(req);

    // console.log("Request body:", req.body);

    const passwordHash = await bcrypt.hash(password, 10);
    // console.log(passwordHash);

    const User = new Usermodel({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    await User.save();
    res.send("User Added Successfully");
  } catch (err) {
    res.status(400).send("ERROR :" + err.message);
  }
});

// Login API...
authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await Usermodel.findOne({ emailId: emailId });
    if (!user) {
      throw new Error(" Invalid Credentials");
    }
   
    const ispassword = await bcrypt.compare(password, user.password);

    if (ispassword) {
      const token = await Jwt.sign({ _id: user._id }, "DEV@tinder@123", {
        expiresIn: "1d",
      });

      res.cookie("token", token ,{
        expires : new Date(Date.now()+ 8*3600000)
      });

      res.json({
          msg: "Login Successfully",
          user : user
      });
    } else {
      throw new Error(" Invalid Credentials");
    }
  } catch (err) {
    res.status(400).send("Error :" + err.message);
  }
});

//LogOut API..
authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("User LogOut Successfully");
});

module.exports = authRouter;
