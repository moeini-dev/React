const db = require('../models');
const { Op } = require('sequelize');
const axios = require('axios');
const multer = require('multer');
const path = require('path');
const { unlink } = require('node:fs');
const fs = require('fs');

let isImageDeleted = false;
let isBookDeleted = false;

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
  else if (req.query.limit) {
    const limit = Number(req.query.limit);
    if (limit > 30) return res.status(400);
    await db.book.findAll({ limit: limit, include: db.author })
      .then(books => {
        res.status(200).json({
          success: 1,
          books
        })
      })
      .catch(err => res.status(500).json({
        success: 0,
        msg: 'Sorry! Something went wrong'
      }));
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
  console.log('==== Search by Title');
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
      , include: { model: db.author }
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
  const publisher = req.query.publisher;
  console.log('==== Search by Publisher', publisher);

  await db.publisher.findAll({
    where: {
      name: {
        [Op.substring]: publisher
      }
    },
    include: {
      model: db.book,
      include: {
        model: db.author
      }
    }

  })
    .then(results => {
      //In case that the publisher exists and have some books
      if (results[0].books && results[0].books.length !== 0) {
        res.status(200).json({
          success: 1,
          books: results[0].books
        });
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
        msg: 'Sorry! Something went wrong',
        err
      })
    })
}


const getBooksByAuthor = async (req, res) => {
  console.log('==== Search by Author');
  const authorName = req.query.author.split(' ');
  if (authorName[1]) {
    const results = await db.book.findAll({
      include: {
        model: db.author,
        where: {
          [Op.and]: [
            { firstName: authorName[0] },
            { lastName: authorName[1] }
          ]
        }
      }
    })
      .then(results => getAssociatedBook(res, results, 'author'))
  }
  else {
    const results = await db.book.findAll({
      include: {
        model: db.author,
        where: {
          [Op.or]: [
            { firstName: authorName[0] },
            { lastName: authorName[0] }
          ]
        }
      }
    })
      .then(results => {
        //console.log(results[0]['author']['dataValues']);
        getAssociatedBook(res, results, 'author')
      })
  }
}


const getBooksByTranslator = async (req, res) => {
  console.log('==== Search by Translator');
  const translatorName = req.query.translator.split(' ');

  if (translatorName[1]) {
    const results = await db.book.findAll({
      include: [
        { model: db.author },
        {
          model: db.translator,
          where: {
            [Op.and]: [
              { firstName: translatorName[0] },
              { lastName: translatorName[1] }
            ]
          }
        }]
    })
      .then(results => getAssociatedBook(res, results, 'translator'))
  }
  else {
    const results = await db.book.findAll({
      include: [
        { model: db.author },
        {
          model: db.translator,
          where: {
            [Op.or]: [
              { firstName: translatorName },
              { lastName: translatorName }
            ]
          }
        }]
    })
      .then(results => {
        console.log(results)
        getAssociatedBook(res, results, 'translator')
      })
  }
}


//Just to handle repetitive work and to stop repeating myself

const getAssociatedBook = (res, results, person) => {
  try {
    if (results[0] && results[0].length !== 0) {
      res.status(200).json({
        success: 1,
        books: results
      });
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
  if (req.user.isAdmin == false) return res.status(403).json({ success: 0, msg: 'Admin privilege required' })
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


const addBook = async (req, res) => {
  console.log('==== ADD BOOK TRIGGERED ====')
  if (req.user.isAdmin == false) return res.status(403).json({ success: 0, msg: 'Admin privilege required' })
  const {
    isbn,
    title,
    price,
    publicationYear,
    authorName,
    publisherName,
    translatorName,
    about,
    isFeatured,
    image
  } = req.body;

  console.log('!!!!! ==== !!!!!')

  if (isbn == (undefined || null || '') || title == (undefined || null || '') || price == (undefined || null || '')) {
    return res.status(400).json({
      success: 0,
      msg: 'ISBN, Author, Title, and Price are required'
    });
  }
  else {
    const aboutText = (about ? about : 'No description');
    const imageAddress = (image !== '' ? `${isbn}.jpg` : 'noImage.png');

    //This part needs to get refactored.
    //All of this indented ifs should turn into .then() chain, I think.

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
              translatorId,
              about: aboutText,
              isFeatured,
              image: imageAddress
            })
              .then(result => res.status(200).json({
                success: 1,
                msg: `Book ${title} added successfully`
              }))
              .catch(err => {
                if (err.name == 'SequelizeUniqueConstraintError') {
                  res.status(400).json({
                    success: 0,
                    msg: `There is already a book with the same ISBN : ${isbn} Check if you entered ISBN correctly or maybe it has been added before`
                  })
                } else {
                  res.status(500).json({
                    success: 0,
                    msg: `Sorry! Something went wrong`,
                    err
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
            publisherId,
            about: aboutText,
            isFeatured,
            image: imageAddress
          })
            .then(result => res.status(200).json({
              success: 1,
              msg: `Book ${title} added successfully`
            }))
            .catch(err => {
              if (err.name == 'SequelizeUniqueConstraintError') {
                res.status(400).json({
                  success: 0,
                  msg: `There is already a book with the same ISBN : ${isbn}`
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
      msg: 'Enter the translator name as a string'
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
      msg: 'Enter the publisher name as a string'
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


const getBookByIsbn = async (isbn) => {

  //!isNaN(isbn) --> If the isbn string IS a number
  if (isbn && !isNaN(isbn)) {
    const book = await db.book.findOne({
      where: { isbn },
      include: [
        { model: db.author },
        { model: db.publisher },
        { model: db.translator },
        { model: db.genre }]
    })
    if (book !== null) {
      return { success: 1, status: 200, book }
    } else {
      return {
        success: 0,
        status: 404,
        msg: 'There is no such book'
      }
    }
  } else {
    return {
      success: 0,
      status: 400,
      msg: 'Make sure to provide a valid ISBN in number format'
    }
  }
}



const getOneBook = async (req, res) => {
  //!isNaN(req.params.isbn) --> If the isbn string IS a number
  await getBookByIsbn(req.params.isbn)
    .then(result => res.status(result.status).json(result))
    .catch(err => res.status(500).json('Sorry! Something went wrong'))
}


const getFeaturedBooks = async (req, res) => {
  await db.book.findAll({ where: { isFeatured: true }, include: db.author })
    .then(books => { return res.status(200).json({ success: 1, books }) })
    .catch(err => { return res.status(500).json({ success: 0, msg: 'Sorry! Something went wrong' }) })
}


const getBooksByPrice = async (req, res) => {
  await db.book.findAll({
    where: {
      price: {
        [Op.lt]: 10
      }
    }
  })
    .then(books => { return res.json({ success: 1, books }) })
    .catch(err => { return res.json({ success: 0, msg: 'Sorry! Something went wrong' }) })
}


const updateBook = async (req, res) => {
  console.log('---- req.body: ', req.body)
  if (req.user.isAdmin == false) return res.status(403).json({ success: 0, msg: 'Admin privilege required' })
  const {
    isbn,
    title,
    price,
    publicationYear,
    about,
    authorName,
    translatorName,
    publisherName,
    isFeatured
  } = req.body;

  try {
    const authorId = await checkAuthor(res, authorName);
    const translatorId = await checkTranslator(res, translatorName);
    const publisherId = await checkPublisher(res, publisherName);

    // console.log('+++ Author, translator, publisher', authorId, translatorId, publisherId);

    try {
      const result = await db.book.update({
        title,
        price,
        publicationYear: (publicationYear !== '' ? publicationYear : null),
        about: (about !== '' ? about : null),
        authorId,
        translatorId,
        publisherId,
        isFeatured,
        image: `${isbn}.jpg`
      },
        { where: { isbn: req.params.isbn } })


      if (result == 1) {

        return res.status(200).json({ success: 1, msg: 'Updated successfully' })
      }
      return res.status(500).json({ success: 0, msg: 'Nothing updated. Make sure if this book exists' })

    } catch (err) {
      // return res.status(500).json({ success: 0, msg: 'Sorry! Something went wrong' })
      return res.status(500).json({ success: 0, msg: JSON.stringify(err) })

    }

  } catch { console.log('====== Error from update book catch') }




  // await db.book.update({
  //   title,
  //   price,
  //   publicationYear,
  //   about
  // },
  //   { where: { isbn: req.params.isbn } })
  //   .then(result => {
  //     if (result == 1) {
  //       console.log('~~~~~ UpdateBook successfully put ~~~~~')
  //       return res.status(200).json({ success: 1, msg: 'Updated successfully' })
  //     }
  //     return res.status(500).json({ success: 0, msg: 'Nothing updated. Make sure if this book exists', result })
  //   })
  //   .catch(err => { return res.status(500).json({ success: 0, msg: 'Sorry! Something went wrong', err }) })
}


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // cb(null, 'images')

    console.log('===== Storage ++ UPDATE ++ from multer =====\n')
    console.log('File Field name: ', file.fieldname)
    console.log('req.body.isbn: ', req.body.isbn)

    try {
      console.log('===== isImageDeleted: ', isImageDeleted);
      console.log('===== isBookDeleted: ', isBookDeleted);

      if (isImageDeleted === false) {
        unlink(path.join(__dirname, `./../../react_project/public/images/${req.body.isbn}.jpg`))
        console.log('++ Image deleted');
        isImageDeleted = true;
      }

      if (isBookDeleted === false) {
        unlink(path.join(__dirname, `./../../react_project/public/books/${req.body.isbn}.jpg`))
        console.log('++ Book deleted');
        isBookDeleted = true;
      }

      if (file.fieldname === 'imageUpdate') {
        console.log('=== Image saved');
        cb(null, path.join(__dirname, './../../react_project/public/images'))
      } else {
        console.log('=== Book saved');
        cb(null, path.join(__dirname, './../../react_project/public/bookFiles'))
      }

    } catch{
      console.log('---- There is no similar file. ADDING...')
      if (isImageDeleted === false) {
        if (file.fieldname === 'image') {
          console.log('=== Image saved from catch');
          isImageDeleted = false;
          cb(null, path.join(__dirname, './../../react_project/public/images'))
        }
      }

      if (isBookDeleted === false) {
        if (file.fieldname === 'bookFile') {
          console.log('=== Book saved from catch');
          isBookDeleted = false;
          cb(null, path.join(__dirname, './../../react_project/public/bookFiles'))
        }
      }
    }

  },
  filename: (req, file, cb) => {
    cb(null, req.body.isbn + path.extname(file.originalname))
  }
  // destination: (req, file, cb) => {
  //   // cb(null, 'images')

  //   console.log('===== Storage from multer =====\n')

  //   if (file.mimetype === 'image') {
  //     return cb(null, path.join(__dirname, './../../react_project/public/images'))
  //   } else {
  //     return cb(null, path.join(__dirname, './../../react_project/public/bookFiles'))
  //   }

  // },
  // filename: (req, file, cb) => {
  //   cb(null, req.body.isbn + path.extname(file.originalname))
  // }
})

const upload = multer({ storage: storage }).fields([{ name: 'image' }, { name: 'bookFile' }])



const storageUpdate = multer.diskStorage({

  destination: (req, file, cb) => {
    // cb(null, 'images')

    console.log('===== Storage ++ UPDATE ++ from multer =====\n')
    console.log('File Field name: ', file.fieldname)
    console.log('req.body.isbn: ', req.body.isbn)

    try {
      console.log('===== isImageDeleted: ', isImageDeleted);
      console.log('===== isBookDeleted: ', isBookDeleted);

      if (isImageDeleted === false) {
        unlink(path.join(__dirname, `./../../react_project/public/images/${req.body.isbn}.jpg`))
        console.log('++ Image deleted');
        isImageDeleted = true;
      }

      if (isBookDeleted === false) {
        unlink(path.join(__dirname, `./../../react_project/public/books/${req.body.isbn}.jpg`))
        console.log('++ Book deleted');
        isBookDeleted = true;
      }

      if (file.fieldname === 'imageUpdate') {
        console.log('=== Image saved');
        cb(null, path.join(__dirname, './../../react_project/public/images'))
      } else {
        console.log('=== Book saved');
        cb(null, path.join(__dirname, './../../react_project/public/bookFiles'))
      }

    } catch{
      console.log('---- There is no similar file. ADDING...')
      if (isImageDeleted === false) {
        if (file.fieldname === 'imageUpdate') {
          console.log('=== Image saved from catch');
          isImageDeleted = false;
          cb(null, path.join(__dirname, './../../react_project/public/images'))
        }
      }

      if (isBookDeleted === false) {
        if (file.fieldname === 'bookFileUpdate') {
          console.log('=== Book saved from catch');
          isBookDeleted = false;
          cb(null, path.join(__dirname, './../../react_project/public/bookFiles'))
        }
      }
    }
  },
  filename: (req, file, cb) => {
    cb(null, req.body.isbn + path.extname(file.originalname))
  }
})

const uploadUpdate = multer({ storage: storageUpdate }).fields([{ name: 'imageUpdate' }, { name: 'bookFileUpdate' }])


const checkForPayment = async (req) => {
  try {
    const user = await db.user.findOne({
      where: { uuid: req.query.userUuid }
    })

    try {
      const book = await db.book.findOne({
        where: { isbn: req.query.bookIsbn }
      })

      console.log('========== checkForPayment triggered ==========')
      return { user, book };

    } catch (err) { return {} }
  } catch (err) { return {} }

}


const addInitialOrder = async (req, res) => {
  const data = await checkForPayment(req);
  console.log(data.book.dataValues.isbn)

  const order = await db.order.create({
    userUuid: data.user.dataValues.uuid,
    bookIsbn: data.book.dataValues.isbn,
    status: 'pending',
    amount: data.book.dataValues.price
  })

  return res.json(order)

}


const pay = async (req, res) => {
  if (req.body.successStatus == true) {
    try {
      const finalOrder = await db.order.update({
        status: 'succeed'
      }, {
        where: {
          id: req.params.id
        }
      })

      return res.json({ finalOrder });
    } catch (err) { res.json(err) }
  } else {
    try {
      const finalOrder = await db.order.update({
        status: 'failed'
      }, {
        where: {
          id: req.params.id
        }
      })

      return res.json({ finalOrder })
    } catch (err) { res.json({ err }) }
  }
}


const checkUserBooks = async (req, res) => {
  try {
    const results = await db.order.findOne({
      where: {
        [Op.and]: [
          { userUuid: req.query.userUuid },
          { bookIsbn: req.query.bookIsbn },
          { status: 'succeed' }
        ]
      }
    })

    return res.json(results)

  } catch (err) {
    console.log('========= Error from search orders', err)
  }
}



module.exports = {
  getBooks,
  getOneBook,
  deleteBook,
  addBook,
  updateBook,
  getFeaturedBooks,
  upload,
  uploadUpdate,
  addInitialOrder,
  pay,
  checkUserBooks,
  getBooksByPrice
};