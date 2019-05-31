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
            error: "the project with the specified ID does not exist"
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

  router.post("/", (req, res) => {
    const { name, description } = req.body;
    const newProject = req.body;
      if (!name || !description) {
      return res.status(400).json(
          {
        errorMessage: "name and description required"
      });
    }
      db.insert(newProject)
      .then(project => {
        res.status(201).json({
          success: true,
          project
        });
      })
      .catch(err => {
        res.status(500).json(
            {
          success: false,
          error: "There was an error while saving the project to the database"
        })
      });
  });

  //delete 

  router.delete("/:id", (req, res) => {
    const id = req.params.id
  
    db.remove(id)
    .then(project => {
      if (!project) {
        return res.status(404).json({
          success: false,
          message: "The project with the specified Id does not exist."
        })
      } else {
        res.status(202).json({success: true,
            message: `the project with an id=${id} is deleted`});
      }
    })
    .catch(err => {
      res.status(500).json({
        success: false, 
        error: "The project could not be removed"
      })
    })
  
  })

module.exports = router;