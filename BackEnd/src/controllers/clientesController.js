import clientesModel from "../models/clientes.js";

const clientesController ={}

clientesController.getClientes = async (req,res) =>{
    const clienteget = await clientesModel.find()
    res.json(clienteget)
};


clientesController.deleteClientes = async (req,res)=>{
    const deleteClien = await clientesModel.findByIdAndDelete(req.params.id)

    if(!deleteClien){
        return res.status(404).json({message: "El cliente no existe"})
    }

    res.json({message: "cliente eliminado"})
};

clientesController.actualizarClien = async (req, res)=>{
    const {nombre, correo, telefono, contrasena, direccion, activo} = req.body;

    await clientesModel.findByIdAndUpdate(
        req.params.id,
        {
            nombre, correo, telefono, contrasena, direccion, activo
        },
        {
            new: true
        });
        res.json({message :"cliente actualizado"})
};

export default clientesController;