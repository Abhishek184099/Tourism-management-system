const jwt = require("jsonwebtoken");

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("jwt", token, {
    httpOnly: true, //  Prevents JavaScript from accessing the cookie
    secure: process.env.NODE_ENV === "production", //  Enable Secure in production
    sameSite: "Strict", //  Prevent CSRF attacks
    maxAge: 24 * 60 * 60 * 1000, //  Token expires in 1 day
  });

  return token;
};

module.exports = generateTokenAndSetCookie;
