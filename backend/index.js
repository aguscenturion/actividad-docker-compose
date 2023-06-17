const express = require("express");
const { connection } = require("./connection/db");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hi there");
});

app.get("/getMysqlStatus", (req, res) => {
  connection.ping((err) => {
    if (err) return res.status(500).send("MySQL Server is Down");

    res.send("MySQL Server is Active");
  });
});

app.get("/productos", (req, res) => {
  connection.query("SELECT * FROM productos", (err, result) => {
    if (err) {
      console.error("Error al obtener los productos: " + err.stack);
      return res.status(500).json({ mensaje: "Error interno del servidor" });
    }

    return res.status(200).json(result);
  });
});

app.post("/productos", (req, res) => {
  const { nombre, precio } = req.body;

  if (!nombre || !precio) {
    return res
      .status(400)
      .json({ mensaje: "El nombre y el precio son requeridos" });
  }

  const nuevoProducto = { nombre, precio };

  connection.query(
    "INSERT INTO productos SET ?",
    nuevoProducto,
    (err, result) => {
      if (err) {
        console.error("Error al insertar el producto: " + err.stack);
        return res
          .status(500)
          .json({ mensaje: "Error interno del servidor", err });
      }

      return res
        .status(201)
        .json({ mensaje: "Producto insertado correctamente" });
    }
  );
});

app.listen(3000, () => {
  console.log("Listen on the port 3000...");
});
