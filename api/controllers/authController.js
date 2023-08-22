const db = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await db.user.findOne({ where: { username } })
  if (user !== null) {
    await bcrypt.compare(password, user.password)
      .then(async (result) => {
        if (result === true) {
          const accessToken = await generateAccessToken(user);
          const refreshToken = await generateRefreshToken(user);

          if (accessToken && refreshToken) {
            await db.user.update({ refreshToken }, { where: { username } })
              .then(() => { return res.status(200).json({ success: 1, msg: 'Logged in successfully', accessToken, refreshToken }) })
          } else { res.status(500).json({ success: 0, msg: 'Sorry! Something went wrong' }) }

        } else {
          return res.status(401).json({
            success: 0,
            msg: 'Username or password is invalid'
          })
        }
      });
  } else {
    return res.status(401).json({
      success: 0,
      msg: 'Username or password is invalid'
    })
  }
}


const generateAccessToken = async (user) => {
  try {
    const token = jwt.sign(
      { uuid: user.uuid, username: user.username, isAdmin: user.isAdmin },
      process.env.SECRETKEY,
      { expiresIn: "60m" });
    return token
  } catch { return undefined }
}


const generateRefreshToken = async (user) => {
  try {
    const token = jwt.sign(
      { uuid: user.uuid, username: user.username, isAdmin: user.isAdmin },
      process.env.REFRESHSECRETKEY);
    return token
  } catch{ return undefined }
}



const verify = async (req, res, next) => {
  const authHeader = req.headers.authorization
  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.SECRETKEY, (err, user) => {
      if (err) {
        return res.status(403).json({ success: 0, msg: 'Token is invalid' })
      } else {
        req.user = user;
        next();
      }
    })
  } else {
    return res.status(401).json({ success: 0, msg: 'Not authenticated. You should login first' })
  }
}



module.exports = {
  login,
  verify
}