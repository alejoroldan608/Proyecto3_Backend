const bdatos = require("../conexion");

const crear = async (id_pedido, id_producto, cantidad) => {
  return await bdatos.sequelize.query(
    `INSERT INTO DESC_PEDIDOS (id_pedido, id_producto, cantidad) VALUES (${id_pedido}, ${id_producto}, ${cantidad});`,
    { type: bdatos.sequelize.QueryTypes.INSERT }
  );
};

module.exports = {
    crear
};