const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const UserController = require("../../Controller/UserController");

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

module.exports = router;
