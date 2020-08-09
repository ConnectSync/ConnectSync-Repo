const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const auth = require("../../middleware/auth");
const UserController = require("../../Controller/UserController");

//@routes GET api/user/
//@desc   get current user's info
//@access private

router.get("/", auth, UserController.index);

//@routes GET api/user/:userId
//@desc   get current user's info
//@access private

router.get("/:userId", auth, UserController.getUserById);

//@routes POST api/user/register
//@desc   register a new user
//@access Public
router.post(
  "/register",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  UserController.create
);

router.post("/signInWithGoogle", UserController.signInWithGoogle);

router.post("/addSocialLinks", auth, UserController.addSocialLinks);
router.post("/addBio", auth, UserController.addBio);
router.post("/addResidence", auth, UserController.addResidence);

module.exports = router;
