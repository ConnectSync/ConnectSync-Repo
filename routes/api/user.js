const express = require("express");
const router = express.Router();

//import post model
const User = require("../../models/user");

//@routes GET api/user/
//@desc   get all the post
//@access Public
router.get("/", (req, res) => {
  User.find()
    .sort({ date: -1 })
    .then((users) => res.json(users))
    .catch((err) => res.status(404).json({ msg: "No user found" }));
});

module.exports = router;
