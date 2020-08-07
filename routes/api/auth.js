const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const AuthController = require("../../Controller/AuthController");

//@routes POST api/auth/login
//@desc   login a user
//@access Public
router.post(
  "/login",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").notEmpty(),
  ],
  AuthController.login
);

module.exports = router;
