const express = require('express');
const app = express();
app.use(express.json());

app.get("/api/featuredBooks", (req, res) => {
    res.json(
        {
            link: "yahoo.com",
            image: "the-old-man-and-the-sea2.jpg",
            name: "Testbook",
            author: "Tester"
        }
    );
})


app.listen(5000, () => {
    console.log('Server is up and running on http://localhost:5000');
});