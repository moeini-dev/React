const express = require('express');
const app = express();
const { Sequelize } = require('sequelize');
require('dotenv').config();
const db = require('./models');
const bcrypt = require('bcrypt');
app.use(express.json());
const path = require('path');

const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

const userRoute = require('./routes/user');
const bookRoute = require('./routes/book');
const authRoute = require('./routes/auth');

app.use('/user', userRoute);
app.use('/book', bookRoute);
app.use('/auth', authRoute);

// app.get("/api/featuredBooks", (req, res) => {
//     res.json(
//         {
//             link: "yahoo.com",
//             image: "the-old-man-and-the-sea2.jpg",
//             name: "Testbook",
//             author: "Tester"
//         }
//     );
// })

// app.get('/api/review', async (req, res) => {
//     await db.review.create({
//         userUuid: "38b8805e-9c3f-45ab-89a6-1295ef2381ce",
//         bookIsbn: 976465416584,
//         reviewText: "Nice!"
//     }).then(result => console.log('~~ Done! ~~'))
//         .catch(err => console.log(err))
//     res.json({
//         msg: 'This is just for testing reviews {JSON}'
//     })
// })


app.get('/api/user', async (req, res) => {
  // bcrypt.hash(plainTextPass, 8)
  //   .then(result => console.log('Done: ', result))
  //   .catch(err => console.log('Error: ', err))

})



app.listen(5000, async () => {
  try {
    console.log('~ Server is up and running on http://localhost:5000');
    await db.sequelize.sync()
      .then(result => console.log('~ Database synced'))
      .catch(err => console.log('[ERROR] - Something went wrong with the database', err))
  } catch (err) {
    console.log('[ERROR] - Something went wrong with the server', err)
  }
});