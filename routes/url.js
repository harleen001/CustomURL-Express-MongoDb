const express = require('express');
const { HandlegenerateNewShortURL} = require('../controllers/url').default;
const router = express.Router();


router.post('/',HandlegenerateNewShortURL);
module.exports=router;