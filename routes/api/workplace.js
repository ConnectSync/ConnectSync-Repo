const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const auth = require('../../middleware/auth');
const WorkplaceController = require('../../Controller/WorkplaceController');

//@routes GET api/workplace/
//@desc   get all the Workplace
//@access private
router.get('/', auth, WorkplaceController.index);

//@routes POST api/workplace/
//@desc   create a new workplace
//@access Private
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('description', 'description is required').not().isEmpty(),
  ],
  auth,
  WorkplaceController.create
);

// update
router.put(
  '/:workplaceId',
  [
    check('description', 'description is required').not().isEmpty(),
    check('type', 'description is required').not().isEmpty(),
  ],
  auth,
  WorkplaceController.updateDetails
);

//@routes DELETE api/workplace/:workplaceId
//@desc   delete the workplace - (admin only)
//@access Private

router.delete('/:workplaceId', auth, WorkplaceController.delete);

//@routes GET api/workplace/
//@desc   only members can see this
//@access Private
router.get('/:workplaceId', auth, WorkplaceController.myworkplace);

//@routes GET api/workplace/:workplaceName
//@desc   get public Workplace details
//@access Public
router.get('/public/:workplaceName', WorkplaceController.getPublicWorkplace);

// @routes POST api/workplace/join
// @desc   join a existing workplace
// @access Private
router.post('/:workplaceId/join', auth, WorkplaceController.joinWorkplace);

module.exports = router;
