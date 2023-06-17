// get the client
const mysql = require("mysql2");

let connection;

try {
  // create the connection to database
  connection = mysql.createConnection({
    host: "db",
    user: "root",
    database: "mydatabase",
    password: "12345",
  });

  console.log("Conexión a la base de datos establecida correctamente");
} catch (err) {
  console.log("No se puedo conectar a la base de datos establecida: ", err);
}

module.exports = { connection };
