const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const cloudinary = require('cloudinary').v2;
const { deleteFile } = require('../cloudinary/cloudinary');

exports.index = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id })
      .populate('workplaces.workplace', 'name img description')
      .select('-password -updatedAt -createdAt');

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errors: [{ msg: 'Server Error' }] });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
      .populate('workplaces.workplace', 'name img')
      .select('-password -updatedAt -createdAt');
    console.log(user);
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errors: [{ msg: 'Server Error' }] });
  }
};

exports.create = async (req, res) => {
  // console.log("creating user...");
  // console.log(req.header);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
    }

    user = new User({
      name,
      email,
      password,
    });
    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      config.get('jwtSecretKey'),
      { expiresIn: '7 days' },
      (err, token) => {
        if (err) throw err;
        console.log('token==', token);
        res.json({ token });
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ errors: [{ msg: 'Server Error' }] });
  }
};

exports.signInWithGoogle = async (req, res) => {
  console.log(req.body);
  const { name, email } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      console.log('user already exists...logging user in...');
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecretKey'),
        { expiresIn: '7 days' },
        (err, token) => {
          if (err) throw err;
          console.log('success');
          return res.json({ token });
        }
      );
    } else {
      user = new User({
        name,
        email,
        method: 'GOOGLE',
      });

      console.log('creating new user with google data', user);
      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecretKey'),
        { expiresIn: '7 days' },
        (err, token) => {
          if (err) throw err;
          console.log('token==', token);
          res.json({ token });
        }
      );
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ errors: [{ msg: 'Server Error' }] });
  }
};

exports.addBio = async (req, res) => {
  try {
    console.log(req.body);
    const { bio } = req.body;

    const profile = await User.findOneAndUpdate(
      { _id: req.user.id },
      { $set: { 'profile.bio': bio } },
      { new: true }
    ).select('-password -updatedAt -createdAt');
    return res.json(profile);
  } catch (error) {
    res.status(500).json({ errors: [{ msg: 'Server Error' }] });
  }
};

//add user bio
exports.addResidence = async (req, res) => {
  try {
    const { residence } = req.body;

    const profile = await User.findOneAndUpdate(
      { _id: req.user.id },
      { $set: { 'profile.residence': residence } },
      { new: true }
    ).select('-password -updatedAt -createdAt');
    return res.json(profile);
  } catch (error) {
    res.status(500).json({ errors: [{ msg: 'Server Error' }] });
  }
};

//add social links
exports.addSocialLinks = async (req, res) => {
  try {
    console.log(req.body);
    const { twitter, website, linkedin, instagram } = req.body;

    const socialLinks = {};
    if (twitter) socialLinks.twitter = twitter;
    if (website) socialLinks.website = website;
    if (linkedin) socialLinks.linkedin = linkedin;
    if (instagram) socialLinks.instagram = instagram;

    console.log(socialLinks);
    const profile = await User.findOneAndUpdate(
      { _id: req.user.id },
      { $set: { 'profile.social': socialLinks } },
      { new: true }
    ).select('-password -updatedAt -createdAt');
    return res.json(profile);
  } catch (error) {
    res.status(500).json({ errors: [{ msg: 'Server Error' }] });
  }
};

exports.addProfileImage = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    const user = await User.findOneAndUpdate(
      { _id: req.user.id },
      { $set: { img: result.secure_url } },
      { new: true }
    ).select('-password -updatedAt -createdAt');
    if (result.secure_url) {
      deleteFile(req.file.filename);
      console.log('deleting');
    }
    return res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: [{ msg: 'Server Error' }] });
  }
};
