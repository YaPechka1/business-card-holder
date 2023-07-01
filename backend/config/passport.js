const jwtStrategy = require('passport-jwt').Strategy;
const extractJWT = require('passport-jwt').ExtractJwt;
const secret = require('./json_config');

const mysql = require('mysql2/promise');
const config = require('./db_config');

const optoins = {
    jwtFromRequest: extractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret.jwt
}
module.exports = async (passport) => {

    passport.use(new jwtStrategy(optoins, async (payload, done) => {
        try {
            const connection = await mysql.createConnection(config);
            const [rows, fields] = await connection.execute('SELECT * FROM `user` where `id_user` = "' + payload.id_user + '"');
            const user = {
                id_user: rows[0]['id_user'],
            }
            connection.destroy();
            if (rows.length > 0) {
                done(null, user);
            }
            else {
                done(null, false);
            }
        }
        catch (e) {
            console.log(e);
        }

    }));

}