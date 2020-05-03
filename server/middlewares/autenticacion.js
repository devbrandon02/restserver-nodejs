const jwt = require("jsonwebtoken");

//==========================
// Verificar Token
//==========================

let verificaToken = (req, res, next) => {
  let token = req.get("token");

  jwt.verify(token, process.env.SEED, (err, decode) => {
    if (err) {
      return res.status(401).json({
        ok: false,
        err: {
          message: "token no valido",
        },
      });
    }

    req.usuario = decode.usuario;
    next();
  });
};

let verificaAdmin_Role = (req, res, next) => {
  let usuario = req.usuario;

  if (usuario.role === "ADMIN_ROLE") {
    next();
  } else {
    res.status(401).json({
      ok: false,
      err: "El usuario no es ADMIN",
    });
  }
};

module.exports = {
  verificaToken,
  verificaAdmin_Role,
};
