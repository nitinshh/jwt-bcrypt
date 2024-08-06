const express = require('express');
const router = express.Router();
const controller = require('../controllers/index');


router.post('/insert', controller.userController.insert);
router.post('/profile', controller.userController.enterData);
router.post('/verify', controller.userController.verify);


module.exports = router;