const express = require('express');
const users = require('./model');
const { restricted, department } = require('../auth/middleware');

const router = express.Router();

router.get('/', restricted, async (req, res) => {
    try {
        const allUsers = await users.get();
        res.status(200).json(allUsers);
    }
    catch(err) {
        console.log(err);
        res.status(500).json({ error: 'Something went wrong getting users' });
    }
});

router.get('/board-member-secrets', department('board member'), (req, res) => {
    res.status(200).json({
        message: "Welcome to the super secret board member endpoint."
    });
});

module.exports = router;