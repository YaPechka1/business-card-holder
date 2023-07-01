const express = require('express');
const router = express.Router();

const controller = require('./../controllers/MIfunction');


router.get('/getMethod', controller.getMethod);
router.get('/getPhoto', controller.getPhoto);
router.get('/getExam', controller.getExam);
router.get('/getAbout', controller.getAbout);


module.exports = router;