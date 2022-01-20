const models = require("../models/index.model");
const RefreshToken = require("../models/refreshToken.model");
const config = require("../config/auth.config");
const { v4: uuidv4 } = require("uuid");
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createToken = async (user) => {
  let expiredAt = new Date();
  expiredAt.setSeconds(expiredAt.getSeconds() + config.jwtRefreshExpiration);

  let _token = uuidv4();
  let refreshToken = await RefreshToken.create({
    token: _token,
    userId: user.id,
    expiryDate: expiredAt.getTime(),
  });
  return refreshToken.token;
};
exports.postSignIn = async (req, res, next) => {
  const { fullname, email, password } = req.body;
  try {
    const exsitUser = await User.findOne({
      where: {
        email: email,
      },
    });
    if (exsitUser) {
      return res.status(409).json({
        error: "Eamil already exist, please pick another email! ",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      fullname: fullname,
      email: email,
      password: hashedPassword,
    });
    res.status(200).json({
      message: "User created",
      user: { id: user.id, email: user.email },
    });
  } catch (err) {
    console.log(err);
  }
};
let user;
let token;
exports.postLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    user = await User.findOne({
      where: {
        email: email,
      },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    const isPassValid = await bcrypt.compare(password, user.password);
    if (!isPassValid) {
      return res
        .status(401)
        .json({ accessToken: null, message: "Invalid password!" });
    }
    token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: config.jwtExpiration,
    });
    let refreshToken = await createToken(user);
    res.status(200).json({
      token: token,
      refresh_token: refreshToken,
    });
  } catch (err) {
    console.log(err);
  }
};
exports.postRefreshToken = async (req, res, next) => {
  const { refresh_token: requestToken } = req.body;

  try {
    if (!requestToken) {
      return res.status(403).json({ message: "Refresh Token is required!" });
    }
    let refreshToken = await RefreshToken.findOne({
      where: { token: requestToken },
    });
    if (!refreshToken) {
      return res.status(403).json({ message: "Refresh token does not exist!" });
    }
    if (refreshToken.expiryDate.getTime() < new Date().getTime()) {
      await RefreshToken.destroy({ where: { id: refreshToken.id } });

      return res.status(403).json({
        message: "Refresh token was expired. Please login again!",
      });
    }
    const user = await refreshToken.getUser();
    let newAccessToken = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: config.jwtExpiration,
    });
    return res.status(200).json({
      token: newAccessToken,
      refresh_token: refreshToken.token,
    });
  } catch (err) {
    console.log(err);
  }
};
exports.getUser = async (req, res, next) => {
  res.status(200).json({
    user: {
      id: user.id,
      fullname: user.fullname,
      email: user.email,
    },
  });
};

exports.getAllUsers = async (req, res, next) => {
  const users = await User.findAll({
    attributes: ["id", "fullname", "email"],
  });
  res.status(200).json({ users: users });
};
