const cloudinary = require("cloudinary").v2;
const Post = require("../models/post");
const { deleteFile } = require("../cloudinary/cloudinary");

exports.index = async (req, res) => {
  try {
    const workplaces = JSON.parse(req.query.workplaces);
    const posts = await Post.find({ workplaces: { $in: workplaces } }).sort({
      date: -1,
    });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
};

exports.addPost = async (req, res) => {
  try {
    console.log(req.body);
    const workplaces = JSON.parse(req.query.workplaces);

    const newPost = new Post({
      user: req.user.id,
      text: req.body.text,
      workplaces: workplaces,
    }).populate("user");
    const post = await newPost.save();
    return res.json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
};

exports.addPostWithImage = async (req, res) => {
  try {
    const workplaces = JSON.parse(req.query.workplaces);
    const result = await cloudinary.uploader.upload(req.file.path);
    const newPost = new Post({
      user: req.user.id,
      text: req.body.text,
      postImg: result.secure_url,
      workplaces: workplaces,
    });
    const post = await newPost.save();
    if (result.secure_url) {
      deleteFile(req.file.filename);
      console.log("deleting");
    }

    return res.json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
};

exports.getPostByID = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ errors: [{ msg: "No post found!" }] });
    }
    return res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
};
