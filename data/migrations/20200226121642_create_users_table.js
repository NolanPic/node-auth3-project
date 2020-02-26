
exports.up = function(knex) {
    return knex.schema.createTable('users', tbl => {
        tbl.increments();
        tbl.string('username', 50)
            .unique()
            .notNullable()
            .index();
        tbl.string('password', 500)
            .notNullable();
        tbl.string('department', 50)
            .notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users');
};
