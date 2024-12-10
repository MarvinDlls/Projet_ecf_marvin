const express = require('express');
const router = express.Router();
const { getAll } = require('../controllers/apiController');

router.get("/infos", getAll);
module.exports = router;