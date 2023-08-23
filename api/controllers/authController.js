const db = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await db.user.findOne({ where: { email } })
  if (user !== null) {
    await bcrypt.compare(password, user.password)
      .then(async (result) => {
        if (result === true) {
          const accessToken = generateAccessToken(user);
          const refreshToken = generateRefreshToken(user);

          if (accessToken && refreshToken) {
            await db.user.update({ refreshToken }, { where: { email } })
              .then(() => { return res.status(200).json({ success: 1, msg: 'Logged in successfully', accessToken, refreshToken }) })
          } else { res.status(500).json({ success: 0, msg: 'Sorry! Something went wrong' }) }

        } else {
          return res.status(401).json({
            success: 0,
            msg: 'Email or password is invalid'
          })
        }
      });
  } else {
    return res.status(401).json({
      success: 0,
      msg: 'Email or password is invalid'
    })
  }
}


const generateAccessToken = (user) => {
  try {
    const token = jwt.sign(
      { uuid: user.uuid, username: user.username, isAdmin: user.isAdmin },
      process.env.SECRETKEY,
      { expiresIn: "20m" });
    return token
  } catch { return undefined }
}


const generateRefreshToken = (user) => {
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


const refresh = async (req, res) => {
  const refreshToken = req.body.refreshToken;

  if (!refreshToken) {
    return res.status(403).json({ success: 0, msg: 'Refresh token not provided' });
  }

  const result = await db.user.findOne({ where: { refreshToken } });
  if (!result) return res.status(400).json({ success: 0, msg: 'Refresh token not valid' });

  jwt.verify(refreshToken, process.env.REFRESHSECRETKEY, (err, user) => {
    if (err) {
      return res.status(403).json({ success: 0, msg: 'Not authenticated' });
    }
    try {
      const newAccessToken = generateAccessToken(req.user);
      const newRefreshToken = generateRefreshToken(req.user);
      db.user.update({ refreshToken: newRefreshToken }, { where: { refreshToken } })
        .then(() => {
          return res.status(200).json({
            success: 1,
            accessToken: newAccessToken,
            refreshToken: newRefreshToken
          })
        })
    } catch { return res.status(500).json({ success: 0, msg: 'Sorry! Something went wrong' }) }
  })

}


module.exports = {
  login,
  verify,
  refresh
}