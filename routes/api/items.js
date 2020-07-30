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

/* Make this work! error handler, for bad requests.   
  if (!Number.isInteger(req.body.time)) {
    console.log("req.body.time: " + req.body.time)
    return res.sendStatus(400).json({

    }) 
  }
  */

    const newItem = new Item({
      time: req.body.time,
      task: req.body.task,
      tags: req.body.tags
    })
    
    newItem.save().then((item) => res.json(item))

})

// @route   DELETE api/items/:id
// @desc    Delete An Item
// @access  Public
router.delete('/:id', (req, res) => {
  // :id placeholder for whatever we pass in as the ID

  // :id is going to be in the url,
  // the way we get it from the parameter
  // request.params will fetch it from the URI
  // gets us a promise back
  Item.findById(req.params.id).then((item) =>
    item.remove().then(() => res.json({ success: true }))
  ).catch(err => res.status(404).json({success: false}))
})


module.exports = router