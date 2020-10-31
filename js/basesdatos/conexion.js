const Sequelize = require("sequelize");
const bdatos = {};

const sequelize = new Sequelize("basederesto", "root", "Jacobo608", {
  dialect: "mysql",
  host: "127.0.0.1"
});

sequelize.authenticate().then(() => {
  console.log('Conexion exitosa');
}).catch(error => {
  console.log(error);
});

bdatos.sequelize = sequelize;
//database.Sequelize = Sequelize;

module.exports = bdatos;