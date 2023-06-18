const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");

const { ctrlWrapper } = require("../utils");

const { User } = require("../models/user-schema");

const { HttpError } = require("../helpers");

const { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } = process.env;

const avatarsDir = path.join(__dirname, "../", "public", "avatars");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email, name });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);

  const result = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
  });

  console.log("result: " + result);

  const payload = {
    id: result._id,
  };

  const accessToken = jwt.sign(payload, ACCESS_SECRET_KEY, { expiresIn: "15s" });
  const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, {
    expiresIn: "7d",
  });
  await User.findByIdAndUpdate(result._id, { accessToken, refreshToken });
  res.status(201).json({
    email: result.email,
    name: result.name,
    accessToken,
    refreshToken,
  });
};

const login = async (req, res) => {
  console.log("req.body", req.body);
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };

  const accessToken = jwt.sign(payload, ACCESS_SECRET_KEY, { expiresIn: "15s" });
  const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, {
    expiresIn: "7d",
  });
  const updatedUser = await User.findByIdAndUpdate(user._id, { accessToken, refreshToken });
  console.log("Updated user", updatedUser);

  res.json({
    accessToken,
    refreshToken,
    email: user.email,
    name: user.name,
    subscription: user.subscription,
  });
};

const refresh = async (req, res) => {
  const { refreshToken: token } = req.body;
  console.log("refreshToken", token);
  try {
    const { id } = jwt.verify(token, REFRESH_SECRET_KEY);
    const isExistUser = await User.findOne({ refreshToken: token });
    console.log("existedUser", isExistUser);

    if (!isExistUser) {
      throw HttpError(403, "Token invalid");
    }

    const payload = {
      id,
    };

    const accessToken = jwt.sign(payload, ACCESS_SECRET_KEY, {
      expiresIn: "15s",
    });
    const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, {
      expiresIn: "7d",
    });
    isExistUser.accessToken = accessToken;
    isExistUser.refreshToken = refreshToken;
    
    res.json({
      accessToken,
      refreshToken,
    });
  } catch (err) {
    throw HttpError(403, err.message);
  }
};

const getCurrent = async (req, res) => {
  console.log("getCurrent route handler called");
  const { name, email, subscription } = req.user;

  res.json({
    name,
    email,
    subscription,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { accessToken: "", refreshToken: "" });

  res.status(204).json({
    message: "Successfully logged out",
  });
};

const updateUserSubscription = async (req, res) => {
  const { subscription } = req.body;
  const { _id } = req.user;

  const updatedUser = await User.findByIdAndUpdate(
    _id,
    { subscription },
    { new: true }
  );

  res.json(updatedUser);
};

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, filename } = req.file;
  const avatarName = `${_id}_${filename}`;
  const resultUpload = path.join(avatarsDir, avatarName);
  await fs.rename(tempUpload, resultUpload);
  const avatarURL = path.join("avatars", avatarName);
  await User.findByIdAndUpdate(_id, { avatarURL });
  const avatarImage = await Jimp.read(resultUpload);
  await avatarImage.resize(250, 250).write(resultUpload);
  res.json({ avatarURL });
};

module.exports = {
  register: ctrlWrapper(register),
  refresh: ctrlWrapper(refresh),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateUserSubscription: ctrlWrapper(updateUserSubscription),
  updateAvatar: ctrlWrapper(updateAvatar),
};
