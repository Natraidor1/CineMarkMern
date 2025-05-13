import empleadosModel from "../models/empleados.js";
import bcryptjs from "bcryptjs"; 
import jsonwebtoken from "jsonwebtoken"; 
import { config } from "../config.js";


const registerEmpleadosController = {}

registerEmpleadosController.registrarEmpleados = async (req, res) =>{
    const {nombre, correo, telefono, contrasena, direccion, puesto, fechaContratacion, salario, activo} = req.body;

    try {
        const existEmpleado = await empleadosModel.findOne({correo})

        if(existEmpleado){
            return res.json({message : "el empleado ya existe"})
        }
        const passwordHash = await bcryptjs.hash(contrasena, 10);

        const empleadoNuevo = new empleadosModel({
            nombre, 
            correo, 
            telefono, 
            contrasena: passwordHash, 
            direccion, 
            puesto, 
            fechaContratacion, 
            salario, 
            activo
        });

        await empleadoNuevo.save();
    
        jsonwebtoken.sign(
           
            { id: empleadoNuevo._id },
          
            config.JWT.SECRET,
          
            { expiresIn: config.JWT.EXPIRES },
        
            (error, token) => {
              if (error) console.log(error);
              res.cookie("authToken", token);
              res.json({message: "Empleado registrado"})
            }
          );
    



    } 
    
    catch (error) {
        console.log(error)
    }

};

export default registerEmpleadosController;