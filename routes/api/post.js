const express = require("express");
const router = express.Router();

//import post model
const Post = require("../../models/post");

//@routes GET api/post/
//@desc   get all the post
//@access Public
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then((posts) => res.json(posts))
    .catch((err) => res.status(404).json({ msg: "No post found" }));
});

module.exports = router;
