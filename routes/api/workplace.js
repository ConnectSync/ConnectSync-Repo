const express = require("express");
const router = express.Router();

//import post model
const Workplace = require("../../models/workplace");

//@routes GET api/workplace/
//@desc   get all the workplace
//@access Public
router.get("/", (req, res) => {
  Workplace.find()
    .sort({ date: -1 })
    .then((workplaces) => res.json(workplaces))
    .catch((err) => res.status(404).json({ msg: "No Workplace found" }));
});

module.exports = router;
