const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

const API_URL = 'https://gorest.co.in/public/v2';

app.use(express.json());

// Обробник запиту для отримання постів користувача
app.get('/users/:userId/posts', async (req, res) => {
    try {
        const userId = req.params.userId;
        const response = await axios.get(`${API_URL}/users/${userId}/posts`);

        res.send(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Обробник запиту для створення поста користувача
app.post('/users/:userId/posts', async (req, res) => {
    try {
        const userId = req.params.userId;
        const postData = req.body;

        const response = await axios.post(`${API_URL}/users/${userId}/posts`, postData);

        res.send(response.data);      } catch (error) {

        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

//Middleware
function performanceMiddleware(req, res, next) {
    const start = process.hrtime();

    res.on('finish', () => {
        const end = process.hrtime(start);
        const duration = (end[0] * 1000) + (end[1] / 1000000);

        console.log(`Endpoint '${req.method} ${req.url}' completed in ${duration.toFixed(2)} ms`);
    });

    next();
}


app.get('/users/:userId/posts', performanceMiddleware, async (req, res) => {
});

app.post('/users/:userId/posts', performanceMiddleware, async (req, res) => {

});

