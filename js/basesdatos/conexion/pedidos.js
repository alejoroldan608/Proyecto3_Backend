const basesdatos = require("../conexion");

const crear = async (body) => {
  return await basesdatos.sequelize.query(
    `INSERT INTO PEDIDOS (id_usuario, id_estado, id_met_pago) VALUES (${body.id_usuario}, 1, ${body.id_met_pago});`,
    { type: basesdatos.sequelize.QueryTypes.INSERT }
  );
};

const BuscarOrdenDetalle = `SELECT PEDIDOS.id AS id_pedido,
ESTADOS.id AS estadoid_pedido, ESTADOS.descripcion AS descripcion_estado,
METODOS_PAGO.id AS id_met_pago, METODOS_PAGO.descripcion AS descripcion_metodopago,
DESC_PEDIDOS.cantidad AS cantidad_producto,
PRODUCTOS.ID AS id_producto, PRODUCTOS.description AS descripcion_producto, PRODUCTOS.precio as precio_producto,
USUARIOS.id AS id_usuario, USUARIOS.email AS email_usuario, USUARIOS.usuario AS nombreusuario_usuario, USUARIOS.nombre_apellido AS nombrecompleto_usuario, USUARIOS.telefono AS telefono_usuario, USUARIOS.direccion AS direccion_usuario,
ROLES.id AS roleId, ROLES.description AS descripcion_rol
FROM PEDIDOS PEDIDOS
INNER JOIN ESTADOS ESTADOS
ON PEDIDOS.id_estado = ESTADOS.id
INNER JOIN METODOS_PAGO METODOS_PAGO
ON PEDIDOS.id_met_pago = METODOS_PAGO.ID
INNER JOIN DESC_PEDIDOS DESC_PEDIDOS
ON PEDIDOS.ID = DESC_PEDIDOS.ID_PEDIDO
INNER JOIN PRODUCTOS PRODUCTOS
ON DESC_PEDIDOS.id_producto = PRODUCTOS.ID
INNER JOIN USUARIOS USUARIOS
ON PEDIDOS.id_usuario = USUARIOS.id
INNER JOIN ROLES ROLES
ON USUARIOS.roleId = ROLES.id`;

const BuscarTodos = async () => {
  return await basesdatos.sequelize.query(BuscarOrdenDetalle, {
    type: basesdatos.sequelize.QueryTypes.SELECT,
  });
};


const BuscarTodosPoridusuario = async (id_usuario) => {
  return await basesdatos.sequelize.query(
    `${BuscarOrdenDetalle} WHERE USUARIOS.id = ${id_usuario};`,
    {
      type: basesdatos.sequelize.QueryTypes.SELECT,
    }
  );
};


const BuscarPorId = async (id) => {
  return await basesdatos.sequelize.query(
    `${BuscarOrdenDetalle} WHERE PEDIDOS.id = ${id};`,
    {
      type: basesdatos.sequelize.QueryTypes.SELECT,
    }
  );
};


const BuscarPorIdYidusuario = async (id, id_usuario) => {
  return await basesdatos.sequelize.query(
    `${BuscarOrdenDetalle} WHERE PEDIDOS.id = ${id} AND USUARIOS.id = ${id_usuario}`,
    {
      type: basesdatos.sequelize.QueryTypes.SELECT,
    }
  );
};



const ActualizarEstado = async (id, id_estado) => {
  return await basesdatos.sequelize.query(
    `UPDATE PEDIDOS SET ESTADOS.id = ${id_estado}  WHERE ID = ${id};`,
    { type: basesdatos.sequelize.QueryTypes.UPDATE }
  );
};


const Remover = async (id) => {
  return await basesdatos.sequelize.query(
    `DELETE FROM PEDIDOS WHERE ID = ${id};`,
    { type: basesdatos.sequelize.QueryTypes.DELETE }
  );
};


module.exports = {
    crear,
    BuscarTodos,
    BuscarTodosPoridusuario,
    BuscarPorId,
    BuscarPorIdYidusuario,
    ActualizarEstado,
    Remover
};