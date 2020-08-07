const express = require("express");
const router = express.Router();

const user = require("./routes/api/user");
const post = require("./routes/api/post");
const workplace = require("./routes/api/workplace");
const auth = require("./routes/api/auth");

router.get("/", (req, res) => {
  res.json({ msg: "Hello World" });
});

//use routes
router.use("/api/post", post);
router.use("/api/user", user);
router.use("/api/auth", auth);
router.use("/api/workplace", workplace);

// for 404
router.use((req, res, next) => {
  res.status(404).send("<h2 align=center>Page Not Found!</h2>");
});

module.exports = router;
