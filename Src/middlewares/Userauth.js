const Jwt = require("jsonwebtoken");
const Usermodel = require("../Models/user");

const UserAuth = async (req, res, next) => {
  //Read the token from the req cookies
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Token is not valid");
    }

    const decodeObj = await Jwt.verify(token, "DEV@tinder@123");

    const { _id } = decodeObj;

    const user = await Usermodel.findById(_id);

    if (!user) {
      throw new Error("User not found");
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("Error :" + err.message);
  }
};

module.exports = {
  UserAuth,
};
