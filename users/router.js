const express = require('express');
const users = require('./model');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const users = await users.get();
        res.status(200).json(users);
    }
    catch(err) {
        console.log(err);
        res.status(500).json({ error: 'Something went wrong getting users' });
    }
});

module.exports = router;