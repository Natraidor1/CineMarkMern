import e from "express";
import empleados from "../models/empleados.js";
import empleadosModel from "../models/empleados.js";


const empleadosController ={};


empleadosController.get = async(req,res)=>{
    const empleados = await empleadosModel.find()
    res.json(empleados)
};

empleadosController.delete = async (req,res)=>{
    const empleadoDelete = await empleadosModel.findByIdAndDelete(req.params.id)

    if (!empleadoDelete) {
        return res.status(404).json({message: "empleado no encontrado"})
        
    }
    res.json({message: "empleado eliminado"})
}

empleadosController.empleadosUpdate = async (req,res)=>{
    const {nombre, correo, telefono, contrasena, direccion, puesto, fechaContratacion, salario, activo} = req.body;

     await empleadosModel.findByIdAndUpdate(
        req.params.id,
    {
        nombre, 
        correo, 
        telefono, 
        contrasena, 
        direccion, 
        puesto, 
        fechaContratacion, 
        salario, 
        activo
    },
    {
        new:true
    }
    )

    res.json({message: "empleado actualizado"})
};

export default empleadosController;