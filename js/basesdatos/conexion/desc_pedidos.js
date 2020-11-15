const bdatos = require("../conexion");

const crear = async (body) => {
  return await bdatos.sequelize.query(
    `INSERT INTO DESC_PEDIDOS (id_pedido, id_producto, cantidad) VALUES (${body.id_pedido}, ${body.id_producto}, ${body.cantidad});`,
    { type: bdatos.sequelize.QueryTypes.INSERT }
  );
};

const Remover = async (id_pedido) => {
  return await bdatos.sequelize.query(
    `DELETE FROM DESC_PEDIDOS WHERE ORDERID = ${id_pedido};`,
    { type: bdatos.sequelize.QueryTypes.DELETE }
  );
};

module.exports = {
    crear,
    Remover
};