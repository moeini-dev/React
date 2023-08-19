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


const getOneBook = async (req, res) => {
  const isbn = req.params.isbn;
  //!isNaN(req.params.isbn) --> If the isbn string IS a number

  if (isbn && !isNaN(isbn)) {
    await db.book.findOne({ where: { isbn } })
      .then(book => {
        if (book !== null) {
          res.status(200).json({
            success: 1,
            book
          })
        } else {
          res.status(404).json({
            success: 0,
            msg: 'There is no such book'
          })
        }
      }
      )
      .catch(err => res.status(500).json({
        success: 0,
        msg: 'Something went wrong with the database'
      }))
  } else {
    res.status(400).json({
      success: 0,
      msg: 'Make sure you entered a valid ISBN in number format'
    })
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


const deleteBook = async (req, res) => {
  await db.book.destroy({ where: { isbn: req.params.isbn } })
    .then(results => {
      if (results !== 0) {
        res.status(200).json({
          success: 1,
          msg: 'Book deleted successfully'
        })
      } else {
        res.status(400).json({
          success: 0,
          msg: 'There is no such book to delete'
        })
      }
    })
    .catch(err => res.status(500).json({
      success: 0,
      msg: 'Sorry! Something went wrong'
    }))
}



const updateBook = async (req, res) => {
  const [title, price] = req.body;

}










const addBook = async (req, res) => {
  const {
    isbn,
    title,
    price,
    publicationYear,
    authorName,
    publisherName,
    translatorName
  } = req.body;

  if (isbn == (undefined || null) || title == (undefined || null) || price == (undefined || null)) {
    return res.status(500).json({
      success: 0,
      msg: 'Isbn, title, and price are required'
    });
  }
  else {

    //This part needs to get refactored.
    //All of this indented ifs should turn to .then() chain I think

    const authorId = await checkAuthor(res, authorName);
    if (authorId !== undefined) {
      const publisherId = await checkPublisher(res, publisherName);
      if (publisherId !== undefined) {
        if (translatorName) {
          const translatorId = await checkTranslator(res, translatorName)

          if (translatorId !== undefined) {
            await db.book.create({
              isbn,
              title,
              price,
              publicationYear,
              authorId,
              publisherId,
              translatorId
            })
              .then(result => res.status(200).json({
                success: 1,
                msg: `Book ${title} added successfully`
              }))
              .catch(err => {
                if (err.name == 'SequelizeUniqueConstraintError') {
                  res.status(200).json({
                    success: 0,
                    msg: `There is already a book with the same ISBN : ${isbn} Check if you entered ISBN correctly or maybe it has been added before`
                  })
                } else {
                  res.status(200).json({
                    success: 0,
                    msg: `Sorry! Something went wrong`
                  })
                }
              })
          } else { return }
        }
        else {

          //Without translatorId
          await db.book.create({
            isbn,
            title,
            price,
            publicationYear,
            authorId,
            publisherId
          })
            .then(result => res.status(200).json({
              success: 1,
              msg: `Book ${title} added successfully`
            }))
            .catch(err => {
              if (err.name == 'SequelizeUniqueConstraintError') {
                res.status(200).json({
                  success: 0,
                  msg: `There is already a book with the same ISBN : ${isbn} Check if you entered ISBN correctly or maybe it has been added before`
                })
              } else {
                res.status(200).json({
                  success: 0,
                  msg: `Sorry! Something went wrong`
                })
              }
            })
        }
      } else { return }
    } else { return }
  }
}



const checkTranslator = async (res, translatorName) => {
  if (translatorName && typeof translatorName === 'string') {
    const [translatorFirstName, translatorLastName] = translatorName.split(' ');
    if (translatorFirstName, translatorLastName) {

      //In case of success, 'results' should be an integer representing the translatorId
      const results = await findOrCreateTranslatorId(translatorFirstName, translatorLastName);

      //In case any error occures, the final result would be an object instead of a number
      if (typeof results !== 'number') {
        res.status(500).json({
          success: 0,
          msg: 'Something went wrong with the database'
        })
      } else { return results }
    } else {
      res.status(400).json({
        success: 0,
        msg: 'Enter the full name of the translator'
      })
    }
  } else {
    res.status(400).json({
      success: 0,
      msg: 'translator name should be a string'
    })
  }
}


const findOrCreateTranslatorId = async (translatorFirstName, translatorLastName) => {
  try {
    const results = await db.translator.findOrCreate(
      {
        attributes: ['id'],
        where: {
          [Op.and]: [
            { firstName: translatorFirstName },
            { lastName: translatorLastName }
          ]
        },
        defaults: {
          firstName: translatorFirstName,
          lastName: translatorLastName
        }
      })
    return results[0]['dataValues']['id'];
  } catch (err) {
    { return err }
  }
}



const checkPublisher = async (res, publisherName) => {
  if (publisherName && typeof publisherName === 'string') {
    const result = await findOrCreatePublisherId(publisherName);

    if (typeof result !== 'number') {
      res.status(500).json({
        success: 0,
        msg: 'Something went wrong with the database'
      })
    } else { return result }
  } else {
    res.status(400).json({
      success: 0,
      msg: 'Publisher name should be a string'
    })
  }
}



const findOrCreatePublisherId = async (publisherName) => {
  try {
    const result = await db.publisher.findOrCreate({
      attributes: ['id'],
      where: {
        name: publisherName
      }
    })
    return result[0]['dataValues']['id'];
  } catch (err) { return err }
}




const checkAuthor = async (res, authorName) => {
  if (authorName && typeof authorName === 'string') {
    const [authorFirstName, authorLastName] = authorName.split(' ');
    if (authorFirstName, authorLastName) {

      //In case of success, 'results' should be an integer representing the authorId
      const results = await findOrCreateAuthorId(authorFirstName, authorLastName);

      //In case any error occures, the final result would be an object instead of a number
      if (typeof results !== 'number') {
        res.status(500).json({
          success: 0,
          msg: 'Something went wrong with the database'
        })
      }
      else { return results }
    } else {
      res.status(400).json({
        success: 0,
        msg: 'Enter the full name of the author'
      })
    }
  } else {
    res.status(400).json({
      success: 0,
      msg: 'Author name should be a string'
    })
  }
}


const findOrCreateAuthorId = async (authorFirstName, authorLastName) => {
  try {
    const results = await db.author.findOrCreate(
      {
        attributes: ['id'],
        where: {
          [Op.and]: [
            { firstName: authorFirstName },
            { lastName: authorLastName }
          ]
        },
        defaults: {
          firstName: authorFirstName,
          lastName: authorLastName
        }
      })
    return results[0]['dataValues']['id'];
  } catch (err) {
    { return err }
  }
}


module.exports = {
  getBooks,
  getOneBook,
  deleteBook,
  addBook,
  updateBook
};