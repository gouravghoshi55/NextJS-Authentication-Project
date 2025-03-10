import mysql from "mysql2/promise";

const database = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "auth_db",
  port: 3307,
});

export default database;
