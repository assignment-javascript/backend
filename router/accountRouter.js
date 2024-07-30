// homeRouter.js
const express = require("express");
const router = express.Router();

const account = require("../controllers/account");

router.use('/', account);

module.exports = router;