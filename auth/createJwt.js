const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/secrets');

module.exports = user => {
    const payload = {
        sub: user.id,
        username: user.username,
        department: user.department
    }

    const options = {
        expiresIn: '1h'
    }

    return jwt.sign(payload, jwtSecret, options);
};
