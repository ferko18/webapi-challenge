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

//post 

router.post("/", (req, res) => {
    const { project_id, notes, description  } = req.body;
    const newAction = req.body;
  
    if (!project_id || !description || !notes) {
      return res.status(400).json({
        errorMessage: "Please provide a project id, notes, and description "
      });
    }
  
    db.insert(newAction)
      .then(action => {
        res.status(201).json({
          success: true,
          action
        });
      })
      .catch(err => {
        res.status(500).json({
          success: false,
          error: "could not be saved to the database"
        })
      });
  });

//delete 

router.delete("/:id", (req, res) => {
    const id = req.params.id
  
    db.remove(id)
      .then(action => {
        if (!action) {
          return res.status(204).json({
            success: false,
            message: "The action with the specified Id could not be found"
          })
        } else { res.status(202).json({
            success: true,
            message: `the action with an id=${id} is deleted`
        });
        }
      })
      .catch(err => {res.status(500).json({
          success: false,
          error: "The action could not be removed"
        })
      })
  
  })

  //edit 
  router.put('/:id', (req, res) => {
    const id = req.params.id
    const { project_id, notes, description } = req.body;
    const changes = req.body
  
    if (!project_id || !description || !notes) {
      return res.status(400).json({
        errorMessage: "Please provide a project id, notes, and description "
      });
    }
      db.update(id, changes).then(updatedAction => {
        if (!updatedAction) {
          return res.status(404).json({
            success: false,
            message: "The post with the specified Id does not exist."
          })
        } else {
        res.status(201).json({
            success: true,
            updatedAction
          })
        }
      })
      .catch(err => {
        res.status(500).json({
          error: err,
          errorMessage: "The project could not be updated."
        })
      })
  
  })


module.exports = router;