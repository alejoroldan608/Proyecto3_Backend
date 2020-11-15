const router = require("express").Router();

const { validateToken, validatePermissions } = require("../validaciones/validarusuario");

const { validarpedido } = require("../validaciones/validarpedido");

const conexionPedidos = require("../basesdatos/conexion/pedidos");
const conexionProductos = require("../basesdatos/conexion/productos");
const conexionDescPedido = require("../basesdatos/conexion/desc_pedidos");

const ADMIN_IDROLE = 2;

router.post("/crear", validateToken, validarpedido, async (req, res) => {
    try {
        const validarProductos = await detallesPedidosProductos(req.body.productos);
  
        if (validarProductos && validarProductos.error)
            return res.status(400).json({ error: 400, detailError: validarProductos.error });
          
            console.log(req.body);
  
        let guardarPedido = await conexionPedidos.crear(req.body);
        
  
        await DescPedido(guardarPedido[0], req.body.productos);
  
        res.json(req.body);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
});

const detallesPedidosProductos = async (productos) => {

    const idsProductosPedido = productos.map((item) => item.id_producto);
  
    const idsProductosbdatos = (await conexionProductos.BuscarPorIds(idsProductosPedido)).map((item) => item.id);

    if (idsProductosPedido.length != idsProductosbdatos.length) {
        let detallesError = idsProductosPedido.filter((item) => !idsProductosbdatos.includes(item)).map((item) => {
            return {
                id: item,
                message: "El Producto no existe"
            };
        });
        return { error: detallesError };
    }
};

const DescPedido = async (id_pedido, productos) => {
    for (const item of productos) {
      let descPedido = {
        id_pedido,
        id_producto: item.id_producto,
        cantidad: item.cantidad
      };
      console.log(descPedido);
      await conexionDescPedido.crear(descPedido);
    }
};

router.get("/", validateToken, async (req, res) => {
    try {
      const { roleId, id_usuario } = req.body;
      let pedidos = null;
  
      if (roleId === ADMIN_IDROLE) {
        pedidos = await conexionPedidos.BuscarTodos();
      } else {
        pedidos = await conexionPedidos.BuscarTodosPoridusuario(id_usuario);
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
        pedido = await conexionPedidos.BuscarPorId(id);
      } else {
        pedido = await conexionPedidos.BuscarPorIdYidusuario(id, id_usuario);
      }
  
      return res.json(pedido);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
});

router.put("/:id", validateToken, validatePermissions, async (req, res) => {
    try {
      const { id } = req.params;
      const { id_estado } = req.body;
  
      if (!id_estado) {
          return res.status(400).json({ error: "id del estado es requerido" });
      }
        
      let pedido = await conexionPedidos.BuscarPorId(id);

      if (!pedido.length) {
          return res.status(404).json({ error: "Recurso no existe" });
      }
        
      await conexionPedidos.ActualizarEstado(id, id_estado);
  
      res.json(req.body);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
});

router.delete("/:id", validateToken, validatePermissions, async (req, res) => {
    try {
      const { id } = req.params;
  
      let pedido = await accesoPedidos.BuscarPorId(id);
      if (!pedido.length)
        return res.status(404).json({ error: "Recurso no existe" });
  
      await conexionDescPedido.Remover(id);
  
      await conexionPedidos.Remover(id);
  
      res.json({ message: "Recurso eliminado correctamente" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

module.exports = router;