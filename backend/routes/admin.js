const express = require('express');
const router = express.Router();
const passport = require('passport');
const uploadExam = require('../config/uploadExam');
const uploadMethod = require('../config/uploadMethod');
const uploadPhoto = require('../config/uploadPhoto');

const uploadContentPhoto = require('./../config/uploadContentPhoto');
const uploadContentVideo = require('./../config/uploadContentVideo');
const uploadContentFile = require('./../config/uploadContentFile');


const controller = require('./../controllers/admin');

router.post('/changeLogin',passport.authenticate('jwt', {session:false}), controller.changeLogin);
router.post('/changePassword',passport.authenticate('jwt', {session:false}), controller.changePassword);

router.post('/deletePhoto',passport.authenticate('jwt', {session:false}), controller.deletePhoto);
router.post('/deletePortfolio',passport.authenticate('jwt', {session:false}), controller.deletePortfolio);
router.post('/deleteMethod',passport.authenticate('jwt', {session:false}), controller.deleteMethod);
router.post('/deleteExam',passport.authenticate('jwt', {session:false}), controller.deleteExam);

router.post('/deletePhotoContent',passport.authenticate('jwt', {session:false}), controller.deletePhotoContent);
router.post('/deleteVideoContent',passport.authenticate('jwt', {session:false}), controller.deleteVideoContent);
router.post('/deleteFileContent',passport.authenticate('jwt', {session:false}), controller.deleteFileContent);

router.post('/uploadPhoto',passport.authenticate('jwt', {session:false}), uploadPhoto.array('photos'), controller.uploadFile);
router.post('/uploadMethod',passport.authenticate('jwt', {session:false}),uploadMethod.array('method'), controller.uploadFile);
router.post('/uploadExam',passport.authenticate('jwt', {session:false}),uploadExam.array('exam'), controller.uploadFile);

router.post('/uploadContentPhoto',passport.authenticate('jwt', {session:false}), uploadContentPhoto.array('photos'), controller.uploadFile);
router.post('/uploadContentVideo',passport.authenticate('jwt', {session:false}), uploadContentVideo.array('video'), controller.uploadFile);
router.post('/uploadContentFile', passport.authenticate('jwt', {session:false}), uploadContentFile.array('files'), controller.uploadFile);

router.post('/setAbout',passport.authenticate('jwt', {session:false}),controller.setAbout);

router.get('/getContentPhoto', passport.authenticate('jwt', {session:false}),  controller.getContentPhoto);
router.get('/getContentFile', passport.authenticate('jwt', {session:false}), controller.getContentFile);
router.get('/getContentVideo', passport.authenticate('jwt', {session:false}), controller.getContentVideo);

module.exports = router;