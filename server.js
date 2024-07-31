// server.js
const express = require('express');
const cors = require('cors');

const app = express();

// 기본적인 CORS 설정 (모든 도메인 허용)
app.use(cors());

// View engine setup, if needed
// app.set('view engine', 'ejs');

// Routers
const accountRouter = require('./router/accountRouter');

// Middleware setup, if needed
app.use(express.json()); // to parse JSON bodies

const port = 8080;
app.listen(port, function () {
    console.log('Listening on ' + port);
});

app.use('/', accountRouter);
