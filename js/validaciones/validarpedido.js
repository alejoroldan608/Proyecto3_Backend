const validarpedido = (req, res, next) => {
    console.log('validar pedido');
    const { id_usuario, id_met_pago } = req.body;
    //const { id, cantidad } = req.body.productos;

    if(id_usuario && id_met_pago){
        if (typeof(id_usuario) === "number" && typeof(id_met_pago) === "number") {
            
            next();
        } else {
            res.status(404).json('Datos no corresponden al tipo de dato');
        }
    } else {
        res.status(404).json('Datos incorrectos');
    };
};

module.exports = {
    validarpedido
}