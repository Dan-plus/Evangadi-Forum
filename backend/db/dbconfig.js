const mysql2 = require('mysql2');

require('dotenv').config();

// Create a connection pool
const dbconnect = mysql2.createPool({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
    port:process.env.port,
    connectionLimit: 10
});
// Export promise-based pool
module.exports = dbconnect.promise();

// Test connection
// dbconnect.getConnection((err, connection) => {
//     if (err) {
//         console.error("DB connection failed:", err);
//     } else {
//         console.log("DB connected successfully!");
//         connection.release();
//     }
// });