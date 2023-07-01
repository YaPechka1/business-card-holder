const mysql = require("mysql2/promise");
const config = require("./../config/db_config");

module.exports.uploadFile = async function (req, res) {
    res.json({
        message: 'OK'
    })
}
module.exports.deletePortfolio = async function (req, res) {
    let fs = require('fs');
    let filePath = './upload/portfolio/' + req.body.fileName;
    fs.unlinkSync(filePath);
    res.json({
        message: 'OK'
    })
}
module.exports.deleteExam = async function (req, res) {
    let fs = require('fs');
    let filePath = './upload/exam/' + req.body.fileName;
    fs.unlinkSync(filePath);
    res.json({
        message: 'OK'
    })
}
module.exports.deletePhoto = async function (req, res) {
    let fs = require('fs');
    let filePath = './upload/photo/' + req.body.fileName;
    fs.unlinkSync(filePath);
    res.json({
        message: 'OK'
    })
}
module.exports.deleteMethod = async function (req, res) {
    let fs = require('fs');
    let filePath = './upload/method/' + req.body.fileName;
    fs.unlinkSync(filePath);
    res.json({
        message: 'OK'
    })
}

module.exports.deletePhotoContent = async function (req, res) {
    let fs = require('fs');
    let filePath = './upload/content/photo/' + req.body.fileName;
    fs.unlinkSync(filePath);
    res.json({
        message: 'OK'
    })
}
module.exports.deleteFileContent = async function (req, res) {
    let fs = require('fs');
    let filePath = './upload/content/files/' + req.body.fileName;
    fs.unlinkSync(filePath);
    res.json({
        message: 'OK'
    })
}

module.exports.deleteVideoContent = async function (req, res) {
    let fs = require('fs');
    let filePath = './upload/content/video/' + req.body.fileName;
    fs.unlinkSync(filePath);
    res.json({
        message: 'OK'
    })
}

module.exports.getContentFile = function (req, res) {
    const Folder = './upload/content/files/';
    const fs = require('fs');
    fs.readdir(Folder, (err, files) => {
        console.log(files + " <> " + Folder);
        res.json({ files: files })
    })
}
module.exports.getContentPhoto = function (req, res) {
    const Folder = './upload/content/photo/';
    const fs = require('fs');
    fs.readdir(Folder, (err, files) => {
        console.log(files + " <> " + Folder);
        res.json({ files: files })
    })
}
module.exports.getContentVideo = function (req, res) {
    const Folder = './upload/content/video/';
    const fs = require('fs');
    fs.readdir(Folder, (err, files) => {
        console.log(files + " <> " + Folder);
        res.json({ files: files })
    })
}
module.exports.setAbout = function (req, res) {
    const path = './config/about.json';

    const fs = require('fs');
    fs.writeFile(path, JSON.stringify(req.body.page), err => {
        res.json({
            message:'OK'
        })
    });
}

module.exports.changeLogin = async function(req,res){
    const connection = await mysql.createConnection(config);
    const [rows, fields] = await connection.execute('SELECT * FROM `user` where `login` = "' + req.body.login+'"');
    if (rows.length==0) {
        connection.destroy();
        res.json({
        message:'Неверный логин'
    })}
    else{
        const [rows1, fields1] = await connection.execute("UPDATE `user` SET `login` = '"+req.body.loginNew+"' WHERE `user`.`login` = '"+req.body.login+"';");
        connection.destroy();
        res.json({
            message:'Успешно'
        })
    }

}
module.exports.changePassword = async function(req,res){
    const connection = await mysql.createConnection(config);
    console.log('SELECT * FROM `user` where `password` = MD5("' + req.body.password+'")');
    console.log("UPDATE `user` SET `password` = MD5('"+req.body.passwordNew+"') WHERE `user`.`password` = MD5('"+req.body.password+"');")
    const [rows, fields] = await connection.execute('SELECT * FROM `user` where `password` = MD5("' + req.body.password+'")');
    if (rows.length==0){
        connection.destroy();
        res.json({
        message:'Неверный пароль'
    })}
    else{
        const [rows1, fields1] = await connection.execute("UPDATE `user` SET `password` = MD5('"+req.body.passwordNew+"') WHERE `user`.`password` = MD5('"+req.body.password+"');");
        connection.destroy();
        res.json({
            message:'Успешно'
        })
    }

}