const router = require("express").Router();

const { validateToken, validatePermissions } = require("../validaciones/validarusuario");

const { validarProducto } = require("../validaciones/validarproductos");


const access = require("../basesdatos/conexion/productos");
//const bdatos = require("../basesdatos/conexion/productos");

router.post("/", validateToken, validatePermissions, async (req, res) => {
    //res.send('ok Funcionó')
    try {
        await access.crearProducto(req.body);
        res.json(req.body);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    } 
);

router.get("/", validateToken, async (req, res) => {
  //res.send('ok Funcionó')
  try {
      let productos = await access.BuscarProducto();
      res.json(productos);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } 
);

router.put("/:id", validarProducto, validateToken, validatePermissions, async (req, res) => {
  try {
    const { id } = req.params;

    let producto = await access.BuscarUnid(id);
      if (!producto.length) {
        return res.status(404).json({ error: "El Producto buscado no existe!" });
      }
      await access.Actualizar(id, req.body);
      res.json(req.body);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

router.delete("/:id", validateToken, validatePermissions, async (req, res) => {
  try {
    const { id } = req.params;

    let producto = await access.BuscarUnid(id);
      if (!producto.length) {
        return res.status(404).json({ error: "El Producto buscado no existe!" });
      }
      await access.Remover(id);
      res.json({message: "Producto eliminado correctamente"});
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);



module.exports = router;