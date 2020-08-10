const { validationResult } = require("express-validator");
const Workplace = require("../models/Workplace");
const User = require("../models/User");

exports.getAllWorkplaceMember = async (req, res) => {
  try {
    const userWorkplaces = JSON.parse(req.query.workplaces);
    const users = await Workplace.find({
      name: userWorkplaces,
    })
      .select("members.user")
      .populate("members.user", "name img");
    res.json(users);
  } catch (err) {
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
};

//An admin can add a member to workplace
exports.addMember = async (req, res) => {
  try {
    const workplace = await Workplace.findOne({
      _id: req.params.workplaceId,
    }).select("members");

    //check if workplace exists

    if (!workplace) {
      return res
        .status(404)
        .json({ errors: [{ msg: "This workplace does not exists!" }] });
    }

    const getUser = await User.findOne({
      email: req.body.member.trim().toLowerCase(),
    });

    if (!getUser) {
      return res.status(404).json({
        errors: [{ msg: "no account associated with this email id!" }],
      });
    }

    // member already exist or not
    if (
      workplace.members.find((member) => member.user.toString() == getUser._id)
    ) {
      return res
        .status(400)
        .json({ errors: [{ msg: "member already exist in the workplace!" }] });
    }

    //check if the requesting user admin or not
    if (
      !workplace.members.find(
        (member) =>
          member.user.toString() == req.user.id && member.role == "ADMIN"
      )
    ) {
      return res.status(400).json({
        errors: [{ msg: "Only admins can add other members to workplace!" }],
      });
    }

    workplace.members.push({
      user: getUser._id,
      status: "PENDING",
    });

    getUser.workplaces.push({
      workplace: workplace._id,
      status: "REQUESTED",
    });

    const data = await workplace.save();

    await getUser.save();

    return res.json(data);
  } catch (error) {
    return res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
};

//An admin can remove a user from that workplace, if the member is an admin then remove the user from admin as well
exports.removeMember = async (req, res) => {
  try {
    const workplace = await Workplace.findOne({
      _id: req.params.workplaceId,
    }).select("members");

    //check if workplace exists

    if (!workplace) {
      return res
        .status(404)
        .json({ errors: [{ msg: "This workplace does not exists!" }] });
    }

    // member already exist or not
    if (
      !workplace.members.find(
        (member) => member.user.toString() == req.params.userId
      )
    ) {
      return res.status(400).json({ errors: [{ msg: "member not found!" }] });
    }

    //check if the requesting user admin or not
    if (
      !workplace.members.find(
        (member) =>
          member.user.toString() == req.user.id && member.role == "ADMIN"
      )
    ) {
      return res.status(400).json({
        errors: [{ msg: "Only admins can remove other members!" }],
      });
    }

    //check if the requesting user admin or not
    if (req.user.id == req.params.userId) {
      return res.status(400).json({
        errors: [{ msg: "not allowed" }],
      });
    }

    //getting user index
    const removeIndexforMember = workplace.members
      .map((member) => member.user.toString())
      .indexOf(req.params.userId);

    workplace.members.splice(removeIndexforMember, 1);

    const data = await workplace.save();

    await User.updateOne(
      { _id: req.params.userId, "workplaces.workplace": data._id },
      {
        $set: {
          "workplaces.$.status": "REMOVED",
        },
      }
    );

    return res.json(data);
  } catch (error) {
    return res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
};
