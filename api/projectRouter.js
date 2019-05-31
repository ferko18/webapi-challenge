const express = require("express");
const db = require("../data/helpers/projectModel");
const router = express.Router();

//get all projects 
router.get('/', (req, res) => {
    db.get()
      .then(projects => {
        res.status(200).json({
          success: true,
          projects
        })
      })
      .catch(err => {
        res.status(500).json({
          success: false,
          error: "The projects does not exist or could not be retrived"
        })
      })
  })


  //get project by id 

  router.get('/:id', (req, res) => {
    const id = req.params.id
  
    db.get(id)
      .then(project => {
        if (!project) {
          return res.status(404).json({
            error: "The action with the specified ID does not exist"
          })
        } else {
          res.status(200).json({
            success: true,
            project
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