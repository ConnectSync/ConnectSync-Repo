const { validationResult } = require('express-validator');
const Workplace = require('../models/Workplace');
const User = require('../models/User');

// @desc get all workplaces
exports.index = async (req, res) => {
  try {
    const workplaces = await Workplace.find({ type: 'PUBLIC' }).select(
      'name description img'
    );

    return res.json(workplaces);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ errors: [{ msg: 'Server Error' }] });
  }
};

// @desc get selected workplaces
exports.myworkplace = async (req, res) => {
  try {
    const workplaces = await Workplace.findOne({
      _id: req.params.workplaceId.trim(),
      'members.user': req.user.id,
    })
      .populate('members.user', 'name -_id')
      .select('name description img members.user');

    if (!workplaces) {
      return res
        .status(500)
        .json({ errors: [{ msg: 'Only members can see this workplace' }] });
    }

    return res.json(workplaces);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ errors: [{ msg: 'Server Error' }] });
  }
};

// @desc get public workplace
exports.getPublicWorkplace = async (req, res) => {
  try {
    console.log('params=', req.params.workplaceName);
    const workplaces = await Workplace.findOne({
      name: req.params.workplaceName.trim().toLowerCase(),
      type: 'PUBLIC',
    })
      .populate('members.user', 'name -_id')
      .select('name description img members.user');

    return res.json(workplaces);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ errors: [{ msg: 'Server Error' }] });
  }
};

// @desc create workplace
exports.create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    //check if the workplace already exists or not:
    const workplace = await Workplace.findOne({
      name: req.body.name.trim().toLowerCase(),
    });

    if (workplace) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'This workplace already exists.' }] });
    }

    const { name, description, type } = req.body;

    //if workplace doesnot already exists then create one:
    let newWorkplace = new Workplace({
      name: name.trim().toLowerCase(),
      description: description,
      type: type && type.trim().toUpperCase(),
      members: [
        {
          user: req.user.id,
          role: 'ADMIN',
          by: req.user.id,
        },
      ],
      createdBy: req.user.id,
    });

    newWorkplace = await newWorkplace.save();

    await User.updateOne(
      { _id: req.user.id },
      { $push: { workplaces: { workplace: newWorkplace._id } } }
    );

    return res.json(newWorkplace); // return the workplace details
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ errors: [{ msg: 'Server Error' }] });
  }
};

// @desc delete workplace
exports.delete = async (req, res) => {
  try {
    const workplace = await Workplace.findById(req.params.workplaceId);

    if (!workplace) {
      return res.status(404).json({ msg: 'workplace not found' });
    }

    //Check if the user is an admin or not
    if (
      !workplace.members.find(
        (member) =>
          member.user.toString() == req.user.id || member.role === 'ADMIN'
      )
    ) {
      return res.status(401).json({
        msg: 'You are not authorized to delete a workplace',
      });
    }
    //remove the workplace if the request was coming from an admin
    await workplace.remove();

    await User.update(
      { _id: req.user.id },
      { $pull: { workplaces: { workplace: workplace._id } } }
    );

    return res.json({ msg: 'workplace removed' });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ errors: [{ msg: 'Server Error' }] });
  }
};

//
// @desc Update Details of workplace
//

exports.updateDetails = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const workplace = await Workplace.findById(req.params.workplaceId);

    if (!workplace) {
      return res.status(404).json({ msg: 'workplace not found' });
    }

    //Check if the user is an admin or not
    if (
      !workplace.members.find(
        (member) =>
          member.user.toString() == req.user.id || member.role === 'ADMIN'
      )
    ) {
      return res.status(401).json({
        msg: 'You are not authorized to update a workplace',
      });
    }

    // destructing body
    const { description, type } = req.body;

    workplace.description = description && description;
    workplace.type = type && type;

    await workplace.save();

    return res.json({ workplace });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ errors: [{ msg: 'Server Error' }] });
  }
};

exports.joinWorkplace = async (req, res) => {
  try {
    //after signing up, when user enters a workplace name, check if already exists, if exists, then make the
    //user a member of the workplace
    const workplace = await Workplace.findOne({
      _id: req.params.workplaceId,
      type: 'PUBLIC',
    }).select('members');

    if (!workplace) {
      return res
        .status(404)
        .json({ errors: [{ msg: 'This workplace does not exists.' }] });
    }

    //check if the user already a member a not
    if (
      workplace.members.find((member) => member.user.toString() === req.user.id)
    ) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'You are already a member' }] });
    }

    //if user is not already a member then push user to the member array.

    workplace.members.push({
      user: req.user.id,
    });

    const data = await workplace.save();

    await User.updateOne(
      { _id: req.user.id },
      {
        $push: {
          workplaces: { workplace: data._id, status: 'JOINED' },
        },
      }
    );

    return res.json(data);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ errors: [{ msg: 'Server Error' }] });
  }
};
