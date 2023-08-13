const express = require('express');
const router = express.Router();
const db = require('../models');
const bcrypt = require('bcrypt');

const getUsers = async (req, res) => {
  await db.user.findAll()
    .then(users => res.status(200).json({
      success: 1,
      users
    }))
    .catch(err => res.status(500).json({
      success: 0,
      msg: 'Sorry! Something went wrong'
    }))
}


const getUserByUuid = async (req, res) => {
  await db.user.findOne({ where: { uuid: req.params.uuid } })
    .then(result => {
      if (result != null) {
        res.status(200).json({
          success: 1,
          user: result
        })
      } else {
        res.status(400).json({
          success: 0,
          msg: 'There is no such user'
        })
      }
    })
    .catch(err => {
      res.status(500).json({
        success: 0,
        msg: 'Sorry! Something went wrong'
      })
    })
}


const createUser = async (req, res) => {
  let { username, password, email } = req.body;

  password = await bcrypt.hash(password, 10);

  await db.user.create({ username, password, email })
    .then(result => {
      res.status(200).json({
        success: 1,
        msg: 'User registerd successfully'
      })
    })
    .catch(err => {
      if (err.name == "SequelizeUniqueConstraintError") {
        res.status(400).json({
          success: 0,
          error: err.errors[0].message
        })
      } else {
        res.status(500).json({
          success: 0,
          msg: 'Sorry! Something went wrong'
        })
      }
    })
}


const hashPassword = async (password) => {
  const hashedPass = await bcrypt.hash(password, 10);
  return hashedPass;
}


const editUser = async (req, res) => {
  let { username, password } = req.body;

  if (username && password) {
    try {
      password = await hashPassword(password);
    } catch {
      res.status(500).json({
        success: 0,
        msg: 'Sorry! Something went wrong'
      })
    }

    await db.user.update({ username, password }, {
      where: { uuid: req.params.uuid }
    })
      .then(() => {
        res.status(200).json({
          success: 1,
          msg: 'User updated successfully'
        })
      })
      .catch(() => {
        res.status(500).json({
          success: 0,
          msg: 'Sorry! Something went wrong'
        })
      })
  } else {
    res.status(400).json({
      success: 0,
      msg: 'Bad request'
    })
  }
}


module.exports = {
  getUsers,
  getUserByUuid,
  createUser,
  editUser
};