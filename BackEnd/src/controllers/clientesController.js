import clientesModel from "../models/clientes.js";

const clientesController ={}

clientesController.getClientes = async (req,res) =>{
    const clienteget = await clientesModel.find()
    res.json(clienteget)
}