const bdatos = require("../conexion");

const crear = async (body) => {
    return await bdatos.sequelize.query(
      `INSERT INTO PEDIDOS (id_usuario, id_estado, id_met_pago) VALUES (${body.id_usuario}, 1, ${body.id_met_pago});`,
      { type: bdatos.sequelize.QueryTypes.INSERT }
    );
};

module.exports = {
    crear
};