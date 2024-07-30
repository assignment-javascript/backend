// server.js
const express = require('express');
const app = express();

// View engine setup, if needed
// app.set('view engine', 'ejs');

// Routers
const accountRouter = require('./router/accountRouter');

// Middleware setup, if needed
app.use(express.json()); // to parse JSON bodies

const port = 8080;
app.listen(port, function() {
    console.log('Listening on ' + port);
});

app.use('/', accountRouter);
