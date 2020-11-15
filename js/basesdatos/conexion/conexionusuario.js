const bdatos = require("../conexion");

const buscarporusuario = async (body) => {
    return await bdatos.sequelize.query(
        `SELECT * FROM USUARIOS WHERE USUARIO = "${body.usuario}";`,
        { type: bdatos.sequelize.QueryTypes.SELECT });
};

 const crear = async (body) => {
  return await bdatos.sequelize.query(
    `INSERT INTO USUARIOS (usuario, nombre_apellido, email, telefono, direccion, password, roleId)    

     VALUES ("${body.usuario}","${body.nombre_apellido}","${body.email}","${body.telefono}", "${body.direccion}", "${body.password}", ${body.roleId});`,
    { type: bdatos.sequelize.QueryTypes.INSERT }
  );
};

module.exports = {
    buscarporusuario,
    crear
};