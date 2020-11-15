CREATE SCHEMA IF NOT EXISTS basederesto;

use basederesto;

CREATE TABLE IF NOT EXISTS roles (
    id int NOT NULL AUTO_INCREMENT,
    description varchar(255) NOT NULL,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO roles (description) VALUES ('clientes'), ('administra');

CREATE TABLE IF NOT EXISTS usuarios (
    id int NOT NULL AUTO_INCREMENT,
    usuario varchar(255) NOT NULL,
    nombre_apellido varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    telefono varchar(255) NOT NULL,
    direccion varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    roleId int DEFAULT NULL,
    PRIMARY KEY (id),
    KEY roleId (roleId),
    CONSTRAINT users_ibfk_1 FOREIGN KEY (roleId) REFERENCES roles (id) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO usuarios
(usuario, nombre_apellido, email, telefono, direccion, password, roleId) 
VALUES ("Useradmin","Alejandro Roldan","alejoroldan@admin.com","3002949541","Calle siempre viva","Aleadmin", 2),
    ("user2","Camilo Serna","Camiloserna@qmail.com","3002009921","carrera alegre","camiloserna", 1);

CREATE TABLE IF NOT EXISTS productos (
    id int NOT NULL AUTO_INCREMENT,
    description varchar(255) NOT NULL,
    precio decimal(10,0) NOT NULL,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO productos
(description, precio) 
VALUES ("Arroz", 3500), ("Carne", 7000);

CREATE TABLE IF NOT EXISTS estados (
  id int NOT NULL AUTO_INCREMENT,  descripcion varchar(255) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO estados (descripcion) VALUES ('Nuevo'), ('Confirmado'), ('Preparando'), ('Enviado'), ('Entregado'), ('Cancelado');

CREATE TABLE IF NOT EXISTS metodos_pago (
  id int NOT NULL AUTO_INCREMENT,
  descripcion varchar(255) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO metodos_pago (descripcion) VALUES ('Efectivo'), ('Tarjeta de Credito');

CREATE TABLE IF NOT EXISTS pedidos (
  id int NOT NULL AUTO_INCREMENT,
  id_usuario int DEFAULT NULL,
  id_estado int DEFAULT NULL,
  id_met_pago int DEFAULT NULL,
  PRIMARY KEY (id),
  KEY id_usuario (id_usuario),
  KEY id_estado (id_estado),
  KEY id_met_pago (id_met_pago),
  CONSTRAINT fk_pedidos_usuario FOREIGN KEY (id_usuario) REFERENCES usuarios (id) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT fk_pedidos_estado FOREIGN KEY (id_estado) REFERENCES estados (id) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT fk_pedidos_met_pago FOREIGN KEY (id_met_pago) REFERENCES metodos_pago (id) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS desc_pedidos (
  cantidad int NOT NULL,
  id_pedido int DEFAULT NULL,
  id_producto int DEFAULT NULL,
  KEY id_pedido (id_pedido),
  KEY id_producto (id_producto),
  CONSTRAINT fk_desc_pedi FOREIGN KEY (id_pedido) REFERENCES pedidos (id) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT fk_desc_producto FOREIGN KEY (id_producto) REFERENCES productos (id) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;