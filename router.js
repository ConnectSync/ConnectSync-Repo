const express = require('express');
const router = express.Router();
const path = require('path');

const user = require('./routes/api/user');
const post = require('./routes/api/post');
const workplace = require('./routes/api/workplace');
const auth = require('./routes/api/auth');

//use routes
router.use('/api/post', post);
router.use('/api/user', user);
router.use('/api/auth', auth);
router.use('/api/workplace', workplace);

if (process.env.NODE_ENV == 'production') {
  app.use(express.static('connectsync_client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

module.exports = router;
