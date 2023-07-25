const express = require('express');
const app = express();
const { Sequelize } = require('sequelize');
require('dotenv').config();
const db = require('./models');
app.use(express.json());

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

app.get('/api/book', async (req, res) => {
    await db.book.create({
        title: "testBook",
        isbn: 9772848246584,
        price: 9.5,
        publicationYear: 2014
    }).then(result => console.log('~~ Done! ~~'))
        .catch(err => console.log(err))
    res.json({
        msg: 'This is just for testing books {JSON}'
    })
})




app.listen(5000, async () => {
    try {
        console.log('~ Server is up and running on http://localhost:5000');
        await db.sequelize.sync()
            .then(result => console.log('~ Database synced'))
            .catch(err => console.log('[ERROR] - Something went wrong with the database'))
    } catch (err) {
        console.log('[ERROR] - Something went wrong with the server', err)
    }
});