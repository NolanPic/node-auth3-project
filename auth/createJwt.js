const jwt = require('jsonwebtoken');

module.exports = user => {
    const payload = {
        subject: user.id,
        username: user.username,
        department: user.department
    }

    const secret = process.env.JWT_SECRET;

    const options = {
        expiresIn: '1h'
    }

    return jwt.sign(payload, secret, options);
};
