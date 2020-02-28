const express = require('express');
const users = require('../users/model');
const createJwt = require('./createJwt');
const bcrypt = require('bcryptjs');

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
                // hash pwd
                user.password = bcrypt.hashSync(user.password, 10);

                // create user
                const createdUser = await users.create(user);

                // create jwt
                const jwt = createJwt(createdUser);

                // respond
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

router.post('/login', async (req, res) => {
    const credentials = req.body;
    if(!credentials.username || !credentials.password) {
        res.status(400).json({ error: 'Username and password are required' });
    }
    else {
        try {
            // get user by username and confirm password
            const userWithThisUsername = await users.getByUsername(credentials.username);

            // verify credentials
            if(userWithThisUsername 
                && bcrypt.compareSync(credentials.password, userWithThisUsername.password)) {
                    
                    // create jwt
                    const jwt = createJwt(userWithThisUsername);

                    // respond
                    res.status(200).json({
                        message: 'Success',
                        token: jwt
                    });

            }
            else {
                res.status(401).json({ error: 'Invalid credentials' });
            }
        }
        catch(err) {
            console.log(err);
            res.status(500).json({ error: 'Something went wrong validating this user' });
        }
    }

});

module.exports = router;
