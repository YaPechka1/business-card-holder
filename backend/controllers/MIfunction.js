module.exports.getPortfolio = function (req, res) {
        const Folder = './upload/portfolio/';
        const fs = require('fs');
        fs.readdir(Folder, (err, files) => {
            console.log(files + " <> " + Folder);
            res.json({ files: files })
        })
}
module.exports.getPhoto = function (req, res) {
    const Folder = './upload/photo/';
    const fs = require('fs');
    fs.readdir(Folder, (err, files) => {
        console.log(files + " <> " + Folder);
        res.json({ files: files })
    })
}
module.exports.getMethod = function (req, res) {
    const Folder = './upload/method/';
    const fs = require('fs');
    fs.readdir(Folder, (err, files) => {
        console.log(files + " <> " + Folder);
        res.json({ files: files })
    })
}
module.exports.getExam = function (req, res) {
    const Folder = './upload/exam/';
    const fs = require('fs');
    fs.readdir(Folder, (err, files) => {
        console.log(files + " <> " + Folder);
        res.json({ files: files })
    })
}

module.exports.getAbout = function(req,res){
    const content = './config/about.json';
    const fs = require('fs');
    const obj = JSON.parse(fs.readFileSync(content, 'utf8'));
    res.json({page:obj});
}