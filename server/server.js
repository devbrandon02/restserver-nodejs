require("./config/config");

const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const express = require("express");
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//CONFIGURACION GLOBAL DE RUTAS
app.use(require("./rutas/index"));
mongoose
  .connect(process.env.URLDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })

  .then(() => {
    console.log("Base de datos Online");
  })
  .catch((err) => {
    console.log("No se pudo conectar a la base de datos", err);
  });

app.listen(process.env.PORT, () => {
  console.log("Escuchando el puerto 3000");
});
