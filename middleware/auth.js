const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/User');

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header('jwt-auth-token');

  // Check if token exists
  if (!token) {
    return res.status(401).json({ msg: 'No token, access denied' });
  }

  // Verify token
  try {
    jwt.verify(token, config.get('jwtSecretKey'), async (error, decoded) => {
      if (error) {
        return res.status(401).json({ msg: 'Invalid Token' });
      } else {
        // console.log("decoded.user =", decoded.user);
        const user = await User.findOne({ _id: decoded.user.id }).select(
          '-password -updatedAt -createdAt -method -profile'
        );
        //console.log("user=", user);
        req.user = user;
        next();
      }
    });
  } catch (err) {
    res.status(500).json({ errors: [{ msg: 'Server Error' }] });
  }
};
