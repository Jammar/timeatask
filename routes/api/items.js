const express = require('express')
const router = express.Router()

const Item = require('../../models/Item')

// @route   GET api/items
// @desc    Get All Items
// @access  Public
router.get('/', (req, res) => {
  Item.find()
    .then((items) => res.json(items))
})

// @route   POST api/items
// @desc    Create An Item
// @access  Public
router.post('/', (req, res) => {
  const newItem = new Item({
    time: req.body.time,
    task: req.body.task,
    tags: req.body.tags
  })

  newItem.save().then((item) => res.json(item))
})


module.exports = router