const jwt = require("jsonwebtoken");

const SECRET = "tok3n1d";
const ADMIN_IDROLE = 2;

const validarlogin = (req, res, next) => {
    console.log('entra')
    try {
        const { usuario, contrasena } = req.body;
        if (!usuario || !contrasena)
            return res.status(400).json({ error: "Datos incompletos de Usuario o Contraseña" });
            next();
        } catch (error) {
            res.status(400).json({ error: error.message });
        }   
};

const validateToken = async (req, res, next) => {
  console.log('entroooo');  
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
    validateToken,
    validatePermissions
};