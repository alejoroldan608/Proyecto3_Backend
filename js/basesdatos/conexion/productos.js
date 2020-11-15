const bdatos = require("../conexion");



const crearProducto = async (body) => {
  return await bdatos.sequelize.query(
    `INSERT INTO PRODUCTOS (description, precio) VALUES ("${body.description}", ${body.precio});`,
    { type: bdatos.sequelize.QueryTypes.INSERT }
  );
};

const BuscarProducto = async () => {
    return await bdatos.sequelize.query(`SELECT * FROM PRODUCTOS`, {
      type: bdatos.sequelize.QueryTypes.SELECT,
    });
  };

  const BuscarPorIds = async (arrayIdsProducts) => {
    return await bdatos.sequelize.query(
      `SELECT * FROM PRODUCTOS WHERE ID IN (${arrayIdsProducts});`,
      {
        type: bdatos.sequelize.QueryTypes.SELECT,
      }
    );
  };
  
  const BuscarUnid = async (id) => {
    return await bdatos.sequelize.query(
      `SELECT * FROM PRODUCTOS WHERE ID IN (${id});`,
      {
        type: bdatos.sequelize.QueryTypes.SELECT,
      }
    );
  };

  const Actualizar = async (id, body) => {
    return await bdatos.sequelize.query(
      `UPDATE PRODUCTOS SET DESCRIPTION = "${body.description}", PRECIO = ${body.precio} WHERE ID = ${id};`,
      { type: bdatos.sequelize.QueryTypes.UPDATE }
    );
  };
  
  const Remover = async (id) => {
    return await bdatos.sequelize.query(
      `DELETE FROM PRODUCTOS WHERE ID = ${id};`,
      { type: bdatos.sequelize.QueryTypes.DELETE }
    );
  };

module.exports = {
    crearProducto,
    BuscarProducto,
    BuscarPorIds,
    BuscarUnid,
    Actualizar,
    Remover
}

