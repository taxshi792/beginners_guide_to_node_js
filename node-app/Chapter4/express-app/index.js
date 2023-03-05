const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Welcome to Express!');
});

const portNumber = 8080;
app.listen(portNumber, () => {
    console.log(`Startserver port:${portNumber}`);
});
