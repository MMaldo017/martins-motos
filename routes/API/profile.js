const express = require ('express')
const router = express.Router();

//@router  GET api/profile/me
//@desc Test route
//@access Private

router.get('/', (req, res) => res.send('Profiles route'));

module.exports = router;