const express = require ('express')
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth')

//models
const Post = require("../../models/Post")
const User = require("../../models/User")
const Profile = require("../../models/Profile")
const Motorcyles = require("../../models/Motorcycle")
//@router  GET api/posts
//@desc Test route
//@access Public

// router.post('/', (req, res) => {
//     res.json("Test post router")
// })


//@router Post api/post
router.post(
    '/',
    [auth, [check("text", "Text is required").not().isEmpty()]],
async (req,res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }

    try {
        const user = await User.findById(req.user.id).select("-password")
        const newPost =  new Post({
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        })
        
        const post = await newPost.save()
        res.json(post)
    }catch (err){
        console.error(err.message)
        res.status(500).send("Server Error")
    }
},
);

router.get('/', auth, async (req, res) => {
try{
    const post = await Post.find(req.params.id).sort({ date: -1});
     res.json(post);
}catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error')
}
})

router.get('/:id', auth, async (req,res) => {
    try {
        const post = await Post.findById(req.params.id).sort({ date: -1})
            if(!post){
                return res.status(404).json({ msg: 'There is no post found with id'})
            }
            res.json(post);
    }catch(err){
        console.error(err.message);
        if(err.kind === 'ObjectId'){
            return res.status(404).json({ msg: 'There is no post found with id'})
        }
        res.status(500).send('Server Error')
    }
})

router.delete('/:id', auth, async (req, res) => {
    try{
        const post = await Post.findById(req.params.id)

        if (!post){
            return res.status(404).json({msg: 'Post not found'})
        }
        if(post.user.toString() !== req.user.id){
            return res.status(401).json({
                msg: 'User not authorized to delete this post'
            })
        }

        await post.deleteOne({ _id: req.params.id})
        res.json({msg: 'Post has been deleted'})
    }catch(err) {
        console.error(err.message)
        if (err.kind === 'ObjectId'){
            return res.status(404).json({ msg: 'There is no post found with this id'})
        }
        res.status(500).send('Server Error')
    }
})

router.put('/like/:id', auth, async (req, res) => {
    try  {
        const post =  await Post.findById(req.params.id)

        if (
            post.likes.filter(like => like.user.toString() === req.user.id).length > 0
        ) {
            return res.status(400).json({msg: "User already liked this post."})
        }

        post.likes.unshift({user: req.user.id})

        await post.save()
        res.json(post.likes)
    }catch 
        (err) {
            console.error(err.message)
            res.status(500).send('Server Error')
        }
    }
)

router.put('/unlike/:id', auth, async (req, res) => {
    try  {
        const post =  await Post.findById(req.params.id)

        if (
            post.likes.filter(like => like.user.toString() === req.user.id).length == 0
        ) {
            return res.status(400).json({msg: "User has not liked this post."})
        }

        const removeIndex = post.likes.map(item => item.id).indexOf(req.params.id)
        post.likes.splice(removeIndex, 1)

        await post.save()
        res.json(post.likes)
    }catch 
        (err) {
            console.error(err.message)
            res.status(500).send('Server Error')
        }
    }
)





module.exports = router;