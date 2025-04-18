const User = require("../models/user");
const jwt = require("jsonwebtoken");

const validateAuth = async (req, res, next) => {
  try {
    const response = req.cookies;
    const { token } = response;
    if (!token) {
      return res.status(400).json({ message: "Token is not valid" });
    }
    //Validate the token
    const validateToken = jwt.verify(token, "Hullur9606@");
    const { _id } = validateToken;
    const user = await User.findById(_id);
    if (!user) {
      return res.status(400).json({ message: "User Doesn't found" });
    }
    req.user=user
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error while fetching the user", error });
  }
};

module.exports = validateAuth;
