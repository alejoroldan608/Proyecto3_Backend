const validarProducto = (req, res, next) => {
    console.log('validar peticion');
    const { description, precio } = req.body;
    if(description && precio){
        if (typeof(description) === "string" && typeof(precio) === "number"){
            next();
        } else {
            res.status(404).json('Datos no corresponden al tipo de dato');
        }
    } else {
        res.status(404).json('Datos incorrectos');
    };
};

module.exports = {
    validarProducto
}