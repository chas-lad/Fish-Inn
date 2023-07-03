const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "5vWbA7zHh7zMH6", //password for this user
    host: "localhost",
    port: 5432,
    database: "fish_shop"
});

module.exports = pool