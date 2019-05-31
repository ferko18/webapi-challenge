const express = require("express");
const db = require("../data/helpers/projectModel");
const router = express.Router();

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


module.exports = router;