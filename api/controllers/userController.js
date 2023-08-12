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
      error: 'Sorry! Something went wrong'
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
          error: 'There is no such user'
        })
      }
    })
    .catch(err => {
      res.status(500).json({
        success: 0,
        error: 'Sorry! Something went wrong'
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
        result: 'User registerd successfully'
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
          error: 'Sorry! Something went wrong'
        })
      }
    })
}



module.exports = {
  getUsers,
  getUserByUuid,
  createUser,
  editUser
};