const router = require("express").Router();

const { validateToken, validatePermissions } = require("../validaciones/validarusuario");

const { validarpedido } = require("../validaciones/validarpedido");

const conexionPedidos = require("../basesdatos/conexion/pedidos");
const conexionProductos = require("../basesdatos/conexion/productos");
const conexionDescPedido = require("../basesdatos/conexion/desc_pedidos");
const { crear } = require("../basesdatos/conexion/desc_pedidos");

const ADMIN_IDROLE = 2;

router.post("/crear", validateToken, validarpedido, async (req, res) => {
    try {
        const validarProductos = await detallesPedidosProductos(req.body.productos);
  
      if (validarProductos && validarProductos.error)
        return res.status(400).json({ error: 400, detailError: validarProductos.error });
  
      let guardarPedido = await conexionPedidos.crear(req.body);
      for (let i=0; i<req.body.productos.length; i++){
        await crear(guardarPedido[0], req.body.productos[i].id_producto, req.body.productos[i].cantidad);
      }

  
      res.json(req.body);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

const detallesPedidosProductos = async (productos) => {

    console.log(productos);

    const idsProductosPedido = productos.map((item) => item.id_producto);
  
    const idsProductosBdatos = (await conexionProductos.BuscarUnid(idsProductosPedido)).map((item) => item.id);
  
    console.log(idsProductosBdatos);

    if (idsProductosPedido.length != idsProductosBdatos.length) {
        let detallesError = idsProductosPedido.filter((item) => !idsProductosBdatos.includes(item)).map((item) => {
            return {
                id: item,
                message: "El Producto no existe"
            };
        });
        return { error: detallesError };
    }
};
/*
const crearDescPedido = async (id_pedido, productos) => {
    for (const item of productos) {
      const descPedido = {
        id_pedido,
        id_producto: item.id,
        cantidad: item.cantidad,
      };
  
      await accesoDescPedido.crear(descPedido);
    }
};

router.get("/", validateToken, async (req, res) => {
    try {
      const { roleId, id_usuario } = req.body;
      let pedidos = null;
  
      if (roleId === ADMIN_IDROLE) {
        pedidos = await accesoPedidos.encontrarTodos();
      } else {
        pedidos = await accesoPedidos.encontrarTodosPorId(id_usuario);
      }
  
      return res.json(pedidos);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
});

router.get("/:id", validateToken, async (req, res) => {
    try {
      const { id } = req.params;
      const { roleId, id_usuario } = req.body;
  
      let pedido = null;
  
      if (roleId === ADMIN_IDROLE) {
        pedido = await accesoPedidos.encontrarPorId(id);
      } else {
        pedido = await accesoPedidos.encontrarPorIdYidUsuario(id, id_usuario);
      }
  
      return res.json(pedido);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
});

router.put("/:id", validateToken, validarPermisos, async (req, res) => {
    try {
      const { id } = req.params;
      const { id_estado } = req.body;
  
      if (!id_estado) {
          return res.status(400).json({ error: "The resource status id is required." });
      }
        
      let pedido = await accesoPedidos.encontrarPorId(id);

      if (!pedido.length) {
          return res.status(404).json({ error: "Resource does not exist." });
      }
        
      await accesoPedidos.actualizarEstado(id, id_estado);
  
      res.json(req.body);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
});

router.delete("/:id", validateToken, validatePermissions, async (req, res) => {
    try {
      const { id } = req.params;
  
      let pedido = await accesoPedidos.encontrarPorId(id);
      if (!pedido.length)
        return res.status(404).json({ error: "Resource does not exist." });
  
      await accesoDescPedido.eliminar(id);
  
      await accesoPedidos.eliminar(id);
  
      res.json({ message: "Resource removed successfully." });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  */
module.exports = router;