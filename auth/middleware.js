const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/secrets');

const restricted = (req, res, next) => {
    const token = req.headers.authorization;

    jwt.verify(token, jwtSecret, (err) => {
        if(!err) {
            next();
        }
        else {
            res.status(401).json({ error: 'User is not authenticated' });
        }
    });
};

const department = role => {
    return (req, res, next) => {
        const token = req.headers.authorization;
        jwt.verify(token, jwtSecret, (err, decoded) => {
            if(!err && decoded.department === role) {
                next();
            }
            else {
                res.status(403).json({ error: 'User is not authorized' });
            }
        })
    };
}

module.exports = {
    restricted,
    department
};
