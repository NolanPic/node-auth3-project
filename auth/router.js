const express = require('express');
const users = require('../users/model');
const createJwt = require('./createJwt');

const router = express.Router();

router.post('/register', async (req, res) => {
    const user = req.body;
    if(!user.username || !user.password || !user.department) {
        res.status(400).json({ error: 'Username, password, and department are required' });
    }
    else {
        // 1. Check if username is taken
        const userWithThisUsername = await users.getByUsername(user.username);
        if(userWithThisUsername) {
            // there is already a user with this username
            res.status(409).json({ error: 'This username is taken' }); // 409 = Resource already exists / Conflict
        }
        // 2. Create user & respond with jwt
        else {
            try {
                const createdUser = await users.create(user);
                const jwt = createJwt(createdUser);
                res.status(201).json({
                    message: 'User successfully created',
                    token: jwt
                });
            }
            catch(err) {
                console.log(err);
                res.status(500).json({ error: 'Something went wrong creating this user' });
            }
        }
    }
});

router.post('/login', (req, res) => {

});

module.exports = router;
