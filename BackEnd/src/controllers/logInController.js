import bcryptjs from "bcryptjs"; 
import jsonwebtoken from "jsonwebtoken"; 
import { config } from "../config.js";
import clientesModel from "../models/clientes.js";
import empleadosModel from "../models/empleados.js";

const loginController = {};


loginController.login = async (req, res) => {
    const { correo, contrasena } = req.body;
  
    try {
      let userFound; 
      let userType; 
  
    
      if (
        email === config.emailAdmin.emailAdmin &&
        password === config.emailAdmin.passwordAdmin
      ) {
        (userType = "admin"), (userFound = { _id: "admin" });
      } else {
      
        userFound = await empleadosModel.findOne({ correo });
        userType = "empleado";
  
        if (!userFound) {
          userFound = await clientesModel.findOne({ correo });
          userType = "cliente";
        }
      }
  
      
      if (!userFound) {
        console.log("A pesar de buscar en todos lados, no existe");
        return res.json({ message: "User not found" });
      }
  
     
      if (userType !== "admin") {

        const isMatch = await bcryptjs.compare(contrasena, userFound.contrasena);
        if (!isMatch) {
          console.log("no matchea");
          return res.json({ message: "Contraseña incorrecta" });
        }
      }
  
  
      jsonwebtoken.sign(
       
        { id: userFound._id, userType },
 
        config.JWT.SECRET,
       
        { expiresIn: config.JWT.EXPIRES },
     
        (error, token) => {
          if (error) console.log(error);
  
          res.cookie("authToken", token);
          res.json({ message: "login successful" });
        }
      );
    } catch (error) {
      res.json({ message: "error" });
    }
  };

  export default loginController;
