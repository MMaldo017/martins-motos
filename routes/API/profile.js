const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @router    GET api/profile/me
// @desc      Get current users profile
// @access    Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/profile
// @desc     Create or update user profile
// @access   Private
router.post(
  '/',
  [
    auth,
    [
      check('status', 'Status is required').not().isEmpty(),
      check('skills', 'Skills are required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //fields
    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin,
    } = req.body;

    // Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills) {
      profileFields.skills = skills.split(',').map(skill => skill.trim());
    }

    // Build social object
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (facebook) profileFields.social.facebook = facebook;
    if (twitter) profileFields.social.twitter = twitter;
    if (instagram) profileFields.social.instagram = instagram;
    if (linkedin) profileFields.social.linkedin = linkedin;

    try {
      let profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        // Update existing profile
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );

        return res.json(profile);
      }

      // Create new profile
      profile = new Profile(profileFields);
      await profile.save(); // Save the profile
      res.json(profile); // Send the created profile as the response
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route     GET api/profile
// @desc      Get all profiles
// @accesss   Public

router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ['name', 'avatar']);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
})


//@route Get api/profile/user/user:id
//desc Get profile by user Id
// public

router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.params.user_id }).populate("user", ['name', 'avatar']);
    if(!profile)
      return res.status(400).json({ msg: 'Profile not found'})
    
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if(err.kind == "ObjectId"){
      return res.status(400).json({ msg: 'Profile not found'})
    }
    res.status(500).send('Server Error');
  }
})


//@route DELETE api/profile
//desc Get profile, user and posts
// private

router.delete('/', auth, async (req, res) => {
  try {
    //remove profile
    await Profile.findOneAndDelete({ user: req.user.id });

    //remove user
    await User.findOneAndDelete({ _id: req.user.id});
    res.json({msg: "User deleted"});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
})


//@ route PUT api/profile/experience
//@Desc add profile experience
//@Public

router.put(
  '/experience',
  [
    auth,
    [
      check('title', 'Job title is required').not().isEmpty(),
      check('company', 'Company name is required').not().isEmpty(),
      check('from', 'Start date of employment is required').not().isEmpty(),
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
//job fields for work experience
    const  {
      title,
      company,
      current,
      from,
      to,
      description
      
    } = req.body;

    const otherExperience = {
      title,
      company,
      from,
      to,
      current,
      description
      
    } 
    try {
      const profile = await Profile.findOne({user: req.user.id});
      profile.experience.unshift(otherExperience);
      profile.save();
      res.json(profile);
    }catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }


    // const jobFields = {};
    // jobFields.user = req.user.id;
    // if (title) jobFields.title = title;
    // if (company) jobFields.company = company;
    // if (to) jobFields.to = to;
    // if (current) jobFields.current = current;
    // if (from) jobFields.from = from

    
  }
 
  
  )


module.exports = router;