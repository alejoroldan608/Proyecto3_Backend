const router = require("express").Router();

const { validarlogin, validacionCrearUsuario } = require("../validaciones/validarusuario");

const jwt = require("jsonwebtoken");
const conexion = require("../basesdatos/conexion/conexionusuario");

const SECRET = "tok3n1d";

router.post("/login", validarlogin, async (req, res) => {
  try {
      const usuario = await conexion.buscarporusuario(req.body);

      console.log(usuario);

      const { contrasena } = req.body;

      if (!usuario.length) {
        return res.status(401).json({ error: "Datos de usuario no validados" });
      }
    
      if (usuario[0].password == contrasena) {
        const payload = {
          id: usuario[0].id,
          nombre: usuario[0].nombre,
          roleId: usuario[0].roleId
        }

        const token = jwt.sign(payload, SECRET);
        console.log(token);
        return res.header("auth-token", token).json({ token });
      } else {
        return res.status(401).json({ error: "credenciales erroneas" });
      } 
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
});

router.post('/crear', validacionCrearUsuario, async (req, res)=>{
  try {
    const usuario = await conexion.buscarporusuario(req.body);
    if (usuario.length) {
      return res.status(409).json({ error: "El usuario ya existe" });
    }
    await acceso.crear(req.body);
    res.json(req.body);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;