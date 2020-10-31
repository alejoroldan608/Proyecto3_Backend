const bdatos = require("../conexion");

const buscarporusuario = async (body) => {
    console.log('Entró2');
    return await bdatos.sequelize.query(
        `SELECT * FROM USUARIOS WHERE USUARIO = "${body.usuario}";`,
        { type: bdatos.sequelize.QueryTypes.SELECT });
};

/* const createUser = async (body) => {
  return await bdatos.sequelize.query(
    `INSERT INTO USERS (email, password, username, fullname, cellphone, shippingAddress, roleId) 
     VALUES ("${body.email}","${body.password}","${body.username}","${body.fullname}", "${body.cellphone}", "${body.shippingAddress}", ${body.roleId});`,
    { type: bdatos.sequelize.QueryTypes.INSERT }
  );
}; */

module.exports = {
    buscarporusuario
};