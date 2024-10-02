const express = require('express');
const { getCountry } = require('../controllers/country.controller');
const router = express.Router();

router.get('/:ID', getCountry);

module.exports = router;