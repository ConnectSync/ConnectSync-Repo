const cloudinary = require("cloudinary").v2;
const Post = require("../models/Post");
const { deleteFile } = require("../cloudinary/cloudinary");

exports.index = async (req, res) => {
  try {
    const workplaces = JSON.parse(req.query.workplaces);
    const posts = await Post.find({ workplaces: { $in: workplaces } })
      .populate("user", "name img")
      .populate("likes.user", "name img")
      .populate("comments.user", "name img")
      .sort({
        createdAt: -1,
      });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
};

exports.addPost = async (req, res) => {
  try {
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
    }

    return res.json(post);
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
};

exports.addLike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ errors: [{ msg: "No post found!" }] });
    } else {
      if (
        post.likes.filter((like) => like.user.toString() === req.user.id)
          .length > 0
      ) {
        return res.status(400).json({ msg: "User already liked this post..." });
      } else {
        post.likes.push({
          user: req.user.id,
        });
        await post.save();
        return res.status(200).json(post);
      }
    }
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
};

exports.unLike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ errors: [{ msg: "No post found!" }] });
    } else {
      if (
        post.likes.filter((like) => like.user.toString() === req.user.id)
          .length === 0
      ) {
        return res
          .status(400)
          .json({ msg: "User have not liked this post yet..." });
      } else {
        const removeIndex = post.likes
          .map((item) => item.user.toString())
          .indexOf(req.user.id);
        post.likes.splice(removeIndex, 1);
        await post.save();
        return res.status(200).json(post);
      }
    }
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
};

exports.addComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ errors: [{ msg: "No post found!" }] });
    } else {
      const newComment = {
        user: req.user.id,
        text: req.body.text,
      };
      post.comments.push(newComment);
      await post.save();
      return res.status(200).json(post);
    }
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
};

exports.removeComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    if (!post) {
      return res.status(404).json({ errors: [{ msg: "No post found!" }] });
    } else {
      // Pull out comment
      const requiredComment = post.comments.find(
        (comment) => comment.id === req.params.commentId
      );
      if (!requiredComment) {
        return res.status(404).json({ msg: "Comment doesnot exist" });
      } else {
        if (requiredComment.user.toString() !== req.user.id) {
          return res
            .status(401)
            .json({ msg: "You are not authorized to delete this comment!" });
        }

        post.comments = post.comments.filter(
          ({ id }) => id !== req.params.commentId
        );
        await post.save();
        return res.json(post);
      }
    }
  } catch (err) {
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
};

exports.getPostByID = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId)
      .populate("user", "name img")
      .populate("likes.user", "name img")
      .populate("comments.user", "name img");
    if (!post) {
      return res.status(404).json({ errors: [{ msg: "No post found!" }] });
    }
    return res.json(post);
  } catch (err) {
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
};
