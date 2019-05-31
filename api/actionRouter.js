const express = require('express')
const db = require('../data/helpers/actionModel')
const router = express.Router();

//get all actions 
router.get('/', (req, res) => {
    db.get()
      .then(actions => {
        res.status(200).json({
          success: true,
          actions
        })
      })
      .catch(err => {
        res.status(500).json({
          success: false,
          error: "The actions does not exist or could not be retrived"
        })
      })
  })

  //get action by id 

  router.get('/:id', (req, res) => {
    const id = req.params.id
  
    db.get(id)
      .then(actions => {
        if (!actions) {
          return res.status(404).json({
            error: "The action with the specified ID does not exist"
          })
        } else {
          res.status(200).json({
            success: true,
            actions
          })
        }
      })
      .catch(err => {
        res.status(500).json({
          success: false,
          error: "The projects could not be retrieved"
        })
      })
  })


module.exports = router;