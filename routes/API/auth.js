const express = require ('express')
const router = express.Router();

const bcryt = require('bcryptjs');
// const auth = require('../../middleware/auth');

const jwt = require('jsonwebtoken');
const {check, validationResult} = require('express-validator');

// add model for user
//@route Get api/auth
//@desc get authenciated user
//@acess Public (Protected by auth middleware)
router.get('/',  (req, res) => res.send('Auth route'));

module.exports = router;