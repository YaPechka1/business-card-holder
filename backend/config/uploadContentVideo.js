const multer = require('multer');
const moment=require('moment');

const storage = multer.diskStorage({
    destination(req,file,cb){
        let path = 'content/video/';
        // console.log('\n'+'\n'+'\n'+'\n'+15+'\n'+'\n'+'\n'+'\n');

        cb(null, 'upload/'+path);
    },
    filename(req,file,cb){
        file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8') 
        const date = moment().format('DDMMYYYY-HHmmsss_SSS')
        cb(null,file.originalname)
    }
})

const fileFilter= (req,file,cb)=>{
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'video/mp4'){
        cb(null,true)
    }
    else{
        cb(null,false)
    }
}
const limits={
    fileSize:1024*1024*500
}

module.exports = multer({
    storage:storage,
    // fileFilter:fileFilter,
    limits:limits
})