const mysql = require("mysql2/promise");

const config = require("./../config/db_config");
const jwt = require("jsonwebtoken");
const secret = require("./../config/json_config");


module.exports.login = async function (req, res) {

  const connection = await mysql.createConnection(config);
  const [rows, fields] = await connection.execute('SELECT * FROM `user` where `login` = "' + req.body.login + '" and `password`= MD5("' + req.body.password + '");');
  console.log(rows)
  if (rows.length == 0) res.json({ token: "false" });
  else {
    const token = jwt.sign(
      {
        id_user: rows[0]["id_user"],
        type: "access",
      },
      secret.jwt,
      { expiresIn: '10s' }
    );
    const token1 = jwt.sign(
      {
        id_user: rows[0]["id_user"],
        type: "refresh",
      },
      secret.jwt,
      { expiresIn: 60 * 60 * 24 * 7 }
    );
    console.log(token);
    const [rows1, fields1] = await connection.execute("INSERT INTO `tokens`(`id_user`, `token`) VALUES ('" + rows[0]["id_user"] + "', MD5('" + token1 + "'))");
    connection.destroy();
    res.json({
      token: `Bearer ${token}`,
      id_user: rows[0]["id_user"],
      tokenUpdate: token1,
    });
  }
};
module.exports.loginOnToken = async function (req, res) {

  const connection = await mysql.createConnection(config);
  console.log('SELECT * FROM `tokens` where `token` = MD5("' + req.body.token + '") and `id_user`= ' + req.body.id_user + ';');
  const [rows, fields] = await connection.execute('SELECT * FROM `tokens` where `token` = MD5("' + req.body.token + '") and `id_user`= ' + req.body.id_user + ';');
  if (rows.length > 0) {
    const [rows2, fields] = await connection.execute('DELETE FROM `tokens` where `token` = MD5("' + req.body.token + '") and `id_user`= ' + req.body.id_user + ';');

    const token = jwt.sign(
      {
        id_user: req.body.id_user,
        type: "access",
      },
      secret.jwt,
      { expiresIn: 60*60 }
    );
    const token1 = jwt.sign(
      {
        id_user: req.body.id_user,
        type: "refresh",
      },
      secret.jwt,
      { expiresIn: 60 * 60 * 24 }
    );
    const [rows1, fields1] = await connection.execute("INSERT INTO `tokens`(`id_user`, `token`) VALUES ('" + req.body.id_user + "', MD5('" + token1 + "'))");
    connection.destroy();
    res.json({
      token: `Bearer ${token}`,
      id_user: rows[0]["id_user"],
      tokenUpdate: token1,
    });
  }
  else {
    res.json({
      token: null,
      id_user: null,
      tokenUpdate: null,
    });
  }

}
module.exports.exit = async function (req, res) {

  const connection = await mysql.createConnection(config);
  const [rows2, fields] = await connection.execute('DELETE FROM `tokens` where `token` = MD5("' + req.body.token + '") and `id_user`= ' + req.body.id_user + ';');
  console.log('DELETE FROM `tokens` where `token` = MD5("' + req.body.token + '") and `id_user`= ' + req.body.id_user + ';')
  connection.destroy();
  res.json({
    message: 'OK'
  });
}



