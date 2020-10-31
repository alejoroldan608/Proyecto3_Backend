const jwt = require("jsonwebtoken");

const SECRET = "tok3n1d";
const ADMIN_IDROLE = 2;

const validarlogin = (req, res, next) => {
    console.log('entra');
    try {
        const { usuario, contrasena } = req.body;
        if (!usuario || !contrasena)
            return res.status(400).json({ error: "Datos incompletos de Usuario o Contraseña" });
            next();
        } catch (error) {
            res.status(400).json({ error: error.message });
        }   
};



module.exports = {
    validarlogin
};