const user = require("../../../models/user");
const jwt = require("jsonwebtoken");
const argon = require("argon2");

const signUpController = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  //   verify if all entries are complete
  if (!(firstName && lastName && email && password))
    return res
      .status(403)
      .json({ success: false, msg: "details not complete" });

  // Check if user exist
  const existed = await user.findOne({
    email: { $regex: new RegExp(`^${email}$`, "i") },
  });
  if (existed)
    return res.status(400).json({ success: false, msg: "user already exist" });

  //   hash password with argon2
  const newPassword = await argon.hash(password);

  //   create access token and refresh token
  const accessToken = jwt.sign(
    { email: email, firstName: firstName, lastName: lastName },
    process.env.ACCESS_TOKEN_KEY,
    { expiresIn: "5m" }
  );
  const refreshToken = jwt.sign(
    { email: email, firstName: firstName, lastName: lastName },
    process.env.REFRESH_TOKEN_KEY,
    { expiresIn: "1d" }
  );

  //   store the refresh token inside cookies or you can store in local storage
  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
    maxAge: 24 * 60 * 60 * 1000,
  });

  //   save user to the database
  const newUser = {
    firstName,
    lastName,
    email,
    password: newPassword,
    refreshToken,
  };

  try {
    const create = await user.create(newUser);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ msg: "all fields is required" });
  }

  //   send response back to the user
  // LocalStorage.setItem("token", accessToken);
  return res.status(201).json({
    success: true,
    msg: "Account has been created successfully",
    token: accessToken,
  });
};

module.exports = signUpController;
