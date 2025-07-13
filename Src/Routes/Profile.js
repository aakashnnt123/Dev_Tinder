const express = require("express");
const Usermodel = require("../Models/user");
const { UserAuth } = require("../middlewares/Userauth");
const EditprofileValidater = require("../utils/EditprofileValidater");
const validator = require("validator");
const bcrypt = require("bcrypt");

const profileRouter = express.Router();

// get profile.
profileRouter.get("/profile/view", UserAuth, async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("User Does not exist");
    }
    res.send(user);
  } catch (err) {
    res.status(400).send("Error :" + err.message);
  }
});

//edit profile

profileRouter.patch("/profile/edit", UserAuth, async (req, res) => {
  try {
    if (!EditprofileValidater(req)) {
      throw new Error("Invalid Edit Request!");
    }

    const Loggeduser = req.user;

    Object.keys(req.body).forEach((key) => (Loggeduser[key] = req.body[key]));

    await Loggeduser.save();

    res.send({
      message: `${Loggeduser.firstName}, your Profile Updated Successfully`,
      data: Loggeduser,
    });
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

//edit password..

profileRouter.patch("/profile/password", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    if (!validator.isEmail(emailId)) {
      throw new Error("Email is not valid!");
    }

    if (!validator.isStrongPassword(password)) {
      throw new Error("Please enter a strong password!");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const doc = await Usermodel.findOneAndUpdate(
      { emailId },
      { $set: { password: hashedPassword } },
      { new: true }
    );

    if (!doc) {
      throw new Error("User not found!");
    }

    res.status(200).send("Password changed successfully");
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

module.exports = profileRouter;
