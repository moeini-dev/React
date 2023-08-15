const db = require('../models');
const { Op } = require('sequelize');

const getBooks = async (req, res) => {
  if (req.query.title) {
    getBooksByTitle(req, res);
  }
  else if (req.query.publisher) {
    getBooksByPublisher(req, res);
  }
  else if (req.query.author) {
    getBooksByAuthor(req, res);
  }
  else if (req.query.translator) {
    getBooksByTranslator(req, res);
  }
  else {
    await db.book.findAll()
      .then(books => res.status(200).json({
        success: 1,
        books
      }))
      .catch(err => res.status(500).json({
        success: 0,
        msg: 'Sorry! Something went wrong'
      }));
  }
}


const getBooksByTitle = async (req, res) => {
  title = req.query.title;

  //It allows to proceed to 'try' section only 
  // if the 'title' containts more than 2 letters
  // note the 'return' keyword

  if (title.length < 2) return res.status(400).json({
    success: 0,
    msg: 'Title should containt at least 2 letters'
  })

  try {
    await db.book.findAll({
      where: {
        title: {
          [Op.substring]: title
        }
      }
    })
      .then(books => {
        if (books[0] !== undefined && books[0] !== null) {
          res.status(200).json({
            success: 1,
            books
          })
        }
        else {
          res.status(404).json({
            success: 0,
            msg: 'There is no such book or anything similar to it'
          })
        }
      })
      .catch(err => res.status(500).json({
        success: 0,
        msg: 'Sorry! Something went wrong with the database'
      }));
  } catch {
    res.status(500).json({
      success: 0,
      msg: 'Sorry! Something went wrong'
    })
  }
}


const getBooksByPublisher = async (req, res) => {
  await db.publisher.findAll({
    where: {
      name: req.query.publisher
    },
    include: db.book
  })
    .then(results => {
      //In case that the publisher exists and have some books
      if (results[0].books && results[0].books.length !== 0) {
        res.status(200).json(results[0].books);
      } else {
        res.status(404).json({
          success: 0,
          msg: 'The publisher has no books yet'
        })
      }
    })
    .catch(err => {
      if (err.name == 'TypeError') {
        res.status(404).json({
          success: 0,
          msg: 'There is no such publisher'
        })
      }
      else res.status(500).json({
        success: 0,
        msg: 'Sorry! Something went wrong'
      })
    })
}


const getBooksByAuthor = async (req, res) => {

  const authorName = req.query.author.split(' ');

  if (authorName[1]) {
    const results = await db.author.findAll({
      where: {
        [Op.and]: [
          { firstName: authorName[0] },
          { lastName: authorName[1] }
        ]
      }, include: db.book
    })
      .then(results => getAssociatedBook(res, results, 'author'))
  }
  else {
    const results = await db.author.findAll({
      where: {
        [Op.or]: [
          { firstName: authorName },
          { lastName: authorName }
        ]
      }, include: db.book
    })
      .then(results => getAssociatedBook(res, results, 'author'))
  }
}


const getBooksByTranslator = async (req, res) => {

  const translatorName = req.query.translator.split(' ');

  if (translatorName[1]) {
    const results = await db.translator.findAll({
      where: {
        [Op.and]: [
          { firstName: translatorName[0] },
          { lastName: translatorName[1] }
        ]
      }, include: db.book
    })
      .then(results => getAssociatedBook(res, results, 'translator'))
  }
  else {
    const results = await db.translator.findAll({
      where: {
        [Op.or]: [
          { firstName: translatorName },
          { lastName: translatorName }
        ]
      }, include: db.book
    })
      .then(results => getAssociatedBook(res, results, 'translator'))
  }
}



//Just to handle repetitive work and to stop repeating myself

const getAssociatedBook = (res, results, person) => {
  try {
    if (results[0].books && results[0].books.length !== 0) {
      res.status(200).json(results[0].books);
    } else {
      res.status(404).json({
        success: 0,
        msg: `The ${person} has no books yet`
      })
    }
  }
  catch (err) {
    if (err.name == 'TypeError') {
      res.status(404).json({
        success: 0,
        msg: `There is no such ${person}`
      })
    }
    else res.status(500).json({
      success: 0,
      msg: 'Sorry! Something went wrong'
    })
  }
}





module.exports = {
  getBooks,
};