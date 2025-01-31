const app = require("./src/app");

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
    console.log(`Running server on port ${PORT}`);
});

const pool = require("./src/config/db");

pool.getConnection()
    .then(connection => {
        console.log("Database successfully connected!");
        connection.release();
    })
    .catch(err => {
        console.error("Error trying to connect to Database:", err);
    });

module.exports = server;