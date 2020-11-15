const jwt = require("jsonwebtoken");

const SECRET = "tok3n1d";
const ADMIN_IDROLE = 2;

const validarlogin = (req, res, next) => {
      try {
        const { usuario, contrasena } = req.body;
        if (!usuario || !contrasena)
            return res.status(400).json({ error: "Datos incompletos de Usuario o Contraseña" });
            next();
        } catch (error) {
            res.status(400).json({ error: error.message });
        }   
};

const validacionCrearUsuario = (req, res, next) => {
  const { usuario, nombre_apellido, email, telefono, direccion, password, roleId } = req.body;
  if(usuario && nombre_apellido && email && telefono && direccion && password && roleId) {
      if (typeof(usuario) === "string"
      && typeof(nombre_apellido) === "string"
      && typeof(email) === "string"
      && typeof(telefono) === "string"
      && typeof(direccion) === "string"
      && typeof(password) === "string"
      && typeof(roleId) === "number"){
          if (roleId !==1 && roleId !==2){
              return res.status(400).json('Los roles de creacion de usuario es 1 para Clientes o 2 para Administrador');
          }
          if (password.length < 6) {
              return res.status(400).json('La contraseña debe tener al menos 6 caracteres');
          }
          next();
      } else {
          res.status(400).json('Datos Erroneos');
      }
  } else {
      res.status(400).json('Datos Incompletos');
  };
};

const validateToken = async (req, res, next) => {
  try {
        const token = req.headers.authorization.split(' ')[1];
        console.log(token);
        if (!token) return res.status(401).json({ error: "Access denegado 1" });
      
        await jwt.verify(token, SECRET, (error, data) => {
            if (error) return res.status(401).json({ error: "Access denegado 2" });
                req.body.id = data.id;
                req.body.roleId = data.roleId;
                next();
            });
        } catch (error) {
          res.status(400).json({ error: error.message });
        }
    };

    const validatePermissions = (req, res, next) => {
        console.log(req.body.roleId);
        try {
          if (req.body.roleId !== ADMIN_IDROLE)
            return res.status(403).json({ error: "Acceso denegado" });
          next();
        } catch (error) {
          res.status(400).json({ error: error.message });
        }
      };

module.exports = {
    validarlogin,
    validacionCrearUsuario,
    validateToken,
    validatePermissions
};