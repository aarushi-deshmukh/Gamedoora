import mysql from "mysql2/promise";

const pool = mysql.createPool({
  database: 'testDB',
  users: "root",
  password: "Gamedoora123",
  host: "localhost",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool;