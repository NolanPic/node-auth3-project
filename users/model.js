const db = require('../data/db-config');

module.exports = {
    get,
    getById,
    create
}

async function get() {
    return db('users')
        .select('*'); 
}

async function getById(id) {
    return db('users')
        .where({ id })
        .first();
}

async function create(user) {
    const [id] = await db.insert(user);
    return await getById(id);
} 