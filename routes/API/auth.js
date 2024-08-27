const express = require ('express')
const router = express.Router();

const bcryt = require('bcryptjs');
// const auth = require('../../middleware/aut');

const jwt = require('jsonwebtoken');
const {check, validationResult} = require('express-validator');

// add model for user
//@route Get api/auth
//@desc get authenciated user
//@acess Public (Protected by auth middleware)
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);

    } catch (err) {
        console.err(err.message);
        res.status(500).send('Server Error');
    }

})