var jwt = require('jsonwebtoken');


const expireToken =60 * 60 * 24 * 5; // 5 days in seconds
module.exports =function createToken(id) {
    return jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: expireToken } );
}
