const express = require("express");
const app = express();
const Usuario = require("../modelos/usuario");
const bcrypt = require("bcrypt");
const _ = require("underscore");
const { verificaToken, verificaAdmin_Role } = require("../middlewares/autenticacion");

//PETICION GET
app.get("/usuario", verificaToken, (req, res) => {
  // return res.json({
  //   usuario: req.usuario,
  //   nombre: req.usuario.nombre,
  //   email: req.usuario.email,
  // });

  let desde = req.query.desde || 0;
  desde = Number(desde);

  let limite = req.query.limite || 13;
  limite = Number(limite);

  Usuario.find({ estado: true }, "nombre email role estado google img")
    .skip(desde)
    .limit(limite)
    .exec((err, usuarios) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err,
        });
      }

      res.json({
        ok: true,
        usuarios,
      });
    });
});

//PETICION POST
app.post("/usuario", [verificaToken, verificaAdmin_Role], function (req, res) {
  let body = req.body;
  let usuario = new Usuario({
    nombre: body.nombre,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10),
    role: body.role,
  });

  usuario.save((err, usuarioDb) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }

    //usuarioDb.password = null;

    res.json({
      ok: true,
      usuario: usuarioDb,
    });
  });
});

//PETICION PUT
app.put("/usuario/:id", [verificaToken, verificaAdmin_Role], (req, res)  => {
  let id = req.params.id;
  let body = _.pick(req.body, ["nombre", "email", "img", "role", "estado"]);

  Usuario.findByIdAndUpdate(
    id,
    body,
    { new: true, runValidators: true },
    (err, usuarioDb) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err,
        });
      }
      res.json({
        ok: true,
        usuario: usuarioDb,
      });
    }
  );
});

// //PETICION DELETE
// app.delete('/usuario/:id', function (req, res) {

//   let id = req.params.id

//   Usuario.findByIdAndRemove(id, (err, usuarioBorrado) =>{
//     if(err){
//       return res.status(400).json({
//         ok: false,
//         err
//       })
//     };

//     if(!usuarioBorrado){
//       return res.status(400).json({
//         ok:false,
//         err: 'Usuario no encontrado'

//       })

//     }

//     res.json({
//       ok: true,
//       usuario: usuarioBorrado

//     })
//   });
// })

//CAMBIAR EL ESTADO
app.delete("/usuario/:id", verificaToken, function (req, res) {
  let id = req.params.id;
  let cambiaEstado = {
    estado: false,
  };

  Usuario.findByIdAndUpdate(
    id,
    cambiaEstado,
    { new: true },
    (err, UsuarioUpdate) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err,
        });
      }

      if (!UsuarioUpdate) {
        return res.status(400).json({
          ok: false,
          err: {
            message: "Usuario no encontrado",
          },
        });
      }

      res.json({
        ok: true,
        usuario: UsuarioUpdate,
      });
    }
  );
});

module.exports = app;
