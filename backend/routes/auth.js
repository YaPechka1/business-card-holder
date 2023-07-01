const express = require('express');
const router = express.Router();
const passport = require('passport');



const controller = require('./../controllers/auth');

router.post('/login', controller.login);
router.post('/loginOnToken',controller.loginOnToken);
router.post('/exit',passport.authenticate('jwt', {session:false}),controller.exit);
router.get('/test',passport.authenticate('jwt', {session:false}),(req,res)=>{
    res.json({
        message: 'тестовый тест'
    })
})

module.exports = router;