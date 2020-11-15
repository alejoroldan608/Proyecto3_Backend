# Delilah Resto - API

Esta API es sobre un restaurante de comidas que tiene usuarios, pedidos y productos. Los permisos que se trendrán para realizar acciones dependerán de sí el usuario es administrador o no lo es.

## Instalar Dependencias

Para instalar las dependencias, debes ejecutar en la terminal el comando:

```bash
npm install
```

## Conectarse a la base de datos

Iniciar sesión en MySQL Workbench las debidas credenciales. Las credenciales de entrada se deben configurar en el archivo index.js que se encuentra en la ruta:

```bash
..\PROYECTO3_BACKENDV3\js\basesdatos\conexion.js
```
En la linea 4 se configuran los parámetros de conexión a la base de datos. Se deben ingresar con las debidas credenciales, que para este caso se deja de manera general como usuario "root" y contraseña "CONFIGURAR_CONTRASEÑA".


## Crear base de datos y sus tablas

En el archivo "basederesto.sql", el cual se encuentra en la ruta:

```bash
..\PROYECTO3_BACKENDV3\js\basesdatos\sentencias\basederesto.sql
```
Se debe copiar todo su contenido, pegarlo en un nuevo SQL tab y ejecutarlo para obtener la base de datos y las respectivas tablas.

## Iniciar la aplicación

Desde la terminal, entrar a la carpeta js y ejecutar el comando:

```bash
node index.js
```

## Documentación swagger.yaml

Para crear, actualizar y / o eliminar usuarios, productos y pedidos en Postman, remitirse al archivo .yaml dentro de la carpeta PROYECTO3_BACKENDV3; allí encontrarás los requerimientos a enviar en el body.