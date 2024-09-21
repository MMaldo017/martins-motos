const express = require("express")
const router = express.Router()
const { check, validationResult } = require("express-validator")
const Motorcycle = require("../../models/Motorcycle")
const auth = require('../../middleware/auth')


const Post = require("../../models/Post")
const User = require("../../models/User")
const Profile = require("../../models/Profile")
const Motorcyles = require("../../models/Motorcycle")
// Endpoints:
 
// POST /api/motorcycles - Create or update a motorcycle.
 
// GET /api/motorcycles - Get all motorcycles.
 
// GET /api/motorcycles/:id - Get a motorcycle by its ID.
 
// DELETE /api/motorcycles/:id - Delete a motorcycle.
 
// PUT /api/motorcycles/maintenance/:id - Add a maintenance record to a motorcycle.
 
// @router    GET api/motorcycles
// @desc      Test route
// router.get('/', (req, res) => res.send('Motorcycles route'));
 
// @router GET /api/motorcycles
// @desc GET all motorcycles
router.get("/", async (req, res) => {
  try {
    const motorcycles = await Motorcycle.find()
    res.json(motorcycles)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})
 
// @route GET api/motorcycles/123
// @desc  GET a single motorcycle by ID
router.get("/:id", async (req, res) => {
  try {
    const motorcycle = await Motorcycle.findById(req.params.id)
    if (!motorcycle)
      return res.status(404).json({ message: "Motorcycle not found" })
    res.json(motorcycle)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})
 
// @router POST api/motorcycles
// @desc  Create or update a new motorcycle
 
router.post("/", [auth, [
  check('make', "Make is required").not().isEmpty(),
  check('model', "Model is required").not().isEmpty(),
  check('year', "Year is required").not().isEmpty()

]],
 async (req, res) => {

  const errors = validationResult(req)
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()})
  }

  try {

      const user = await User.findById(req.user.id).select('-password')

    const newMotorcycle = new Motorcycle({
      name: user.name,
      avatar: user.avatar,
      user: req.user.id,
      make: req.body.make,
      model: req.body.model,
      year: req.body.year,
      price: req.body.price,
      engineCapacity: req.body.engineCapacity, // Add engineCapacity
      type: req.body.type, // Add type
      status: req.body.status,
    })


    const motorcycle = await newMotorcycle.save()
    res.json(motorcycle)
  }catch (err) {
    console.error(err.message)
    res.status(500).send('Server')
  }
})
 
// @router PUT api/motorcycles
// @desc update a motorcycle by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedMotorcycle = await Motorcycle.findByIdAndUpdate(
      req.params.id,
      {
        make: req.body.make,
        model: req.body.model,
        year: req.body.year,
        price: req.body.price,
      },
      { new: true },
    )
    if (!updatedMotorcycle)
      return res.status(404).json({ message: "Motorcycle not found" })
    res.json(updatedMotorcycle)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})
 
// @router DELETE api/motorcycles/123
// @desc DELETE a motorcycle by ID
router.delete("/:id", auth, async (req, res) => {
  try {
    const motorcycle = await Motorcycle.findByIdAndDelete(req.params.id)
    if (!motorcycle)
      return res.status(404).json({ message: "Motorcycle not found" })

    if(motorcycle.user.toString() !== req.user.id){
      return res.status(401).json({msg: 'User not authorized to delete this motorcycle'})
    }
    await motorcycle.deleteOne({ _id: req.params.id})
    res.json({ message: "Motorcycle deleted successfully" })
  } catch (err) {
    console.error(err.message)
    if(err.kind === 'ObjectId'){
      return res.status(404).json({msg: 'There is no motorcycle found with this id'})
    }
    res.status(500).send('Server Error')
  }
})



 
module.exports = router