const db = require('../data/db-config');

module.exports = {
    get,
    getById,
    getByUsername,
    create
}

async function get() {
    return db('users');
}

async function getById(id) {
    return db('users')
        .where({ id })
        .first();
}

async function getByUsername(username) {
    return db('users')
        .where({ username })
        .first();
}

async function create(user) {
    const [id] = await db('users').insert(user);
    return await getById(id);
} 