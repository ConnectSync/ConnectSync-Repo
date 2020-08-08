const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const PostController = require("../../Controller/PostController");
const { upload } = require("../../cloudinary/cloudinary");

//@routes GET api/post/
//@desc   get all the posts that conatains the workplaces that the user is in
//@access Private
//the auth middleware is used to protect the route so that only logged in user can see posts
router.get("/", auth, PostController.index);

//@routes POST api/post/addPost
//@desc   add post
//@access Private
router.post("/addPost", auth, PostController.addPost);

//@routes POST api/post/addPostWithImage
//@desc   add post
//@access Private
router.post(
  "/addPostWithImage",
  auth,
  upload.single("postImg"),
  PostController.addPostWithImage
);

//@routes GET api/post/:postId
//@desc   get post by id
//@access Private
router.get("/:postId", auth, PostController.getPostByID);

module.exports = router;
