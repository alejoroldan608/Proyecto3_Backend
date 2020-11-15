const router = require("express").Router();

const { validateToken, validatePermissions } = require("../validaciones/validarusuario");

const { validarProducto } = require("../validaciones/validarproductos");

const bdatos = require("../basesdatos/conexion/productos");

router.post("/", validateToken, validatePermissions, async (req, res) => {
    try {
        await bdatos.crearProducto(req.body);
        res.json(req.body);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    } 
);

router.get("/", validateToken, async (req, res) => {

  try {
      let productos = await bdatos.BuscarProducto();
      res.json(productos);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } 
);

router.put("/:id", validarProducto, validateToken, validatePermissions, async (req, res) => {
  try {
    const { id } = req.params;

    let producto = await bdatos.BuscarUnid(id);
      if (!producto.length) {
        return res.status(404).json({ error: "El Producto buscado no existe!" });
      }
      await bdatos.Actualizar(id, req.body);
      res.json(req.body);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

router.delete("/:id", validateToken, validatePermissions, async (req, res) => {
  try {
    const { id } = req.params;

    let producto = await bdatos.BuscarUnid(id);
      if (!producto.length) {
        return res.status(404).json({ error: "El Producto buscado no existe!" });
      }
      await bdatos.Remover(id);
      res.json({message: "Producto eliminado satisfactoriamente"});
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);



module.exports = router;