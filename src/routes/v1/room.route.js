const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const roomValidation = require('../../validations/room.validation');
const roomController = require('../../controllers/room.controller');

const router = express.Router();

router.route('/').post(auth(), validate(roomValidation.createRoom), roomController.createRoom);

router.route('/create-token').post(auth(), validate(roomValidation.createToken), roomController.createToken);
router.route('/webhook').post(express.text({ type: '*/*' }), roomController.webhook);

module.exports = router;
