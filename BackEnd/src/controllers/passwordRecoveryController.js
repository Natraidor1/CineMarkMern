import { config } from "../config.js";
import { sendMail, HTMLRecoveryEmail } from "../utils/MailPasswordRecovery.js";
import jsonwebtoken from "jsonwebtoken"; 
import bcryptjs from "bcryptjs"; 
import clientesModel from "../models/clientes.js";
import empleadosModel from "../models/empleados.js";


const passwordRecoveryController = {};

passwordRecoveryController.requestcode = async(req, res)=>{
    const { correo } = req.body;

    try {
        let userFound;
        let userType;
    
        
        userFound = await clientesModel.findOne({ correo });
        if (userFound) {
          userType = "cliente";
        } else {
          userFound = await empleadosModel.findOne({ correo });
          if (userFound) {
            userType = "empleado";
          }
        }
    
       
        if (!userFound) {
          return res.json({ message: "User not found" });
        }
    
       
        const code = Math.floor(10000 + Math.random() * 90000).toString();
    
        
        const token = jsonwebtoken.sign(
          
          { correo, code, userType, verfied: false },
          
          config.JWT.SECRET,
          
          { expiresIn: "20m" }
        );
    
        res.cookie("tokenRecoveryCode", token, { maxAge: 20 * 60 * 1000 });
    
        
        await sendMail(
          correo,
          "Password recovery code", //Asunto
          `Your verification code is: ${code}`, //Texto
          HTMLRecoveryEmail(code) //
        );
    
        res.json({ message: "Verification code send" });
      } 
      catch (error) 
      {
        console.log(error)
      }
}

passwordRecoveryController.verifyCode = async (req, res) => {
    const { code } = req.body;
  
    try {
      
      const token = req.cookies.tokenRecoveryCode;
  
      
      const decoded = jsonwebtoken.verify(token, config.JWT.SECRET);
  
      
      if (decoded.code !== code) {
        return res.json({ message: "Invalid Code" });
      }
  
      
      const newToken = jsonwebtoken.sign(
        
        {
          correo: decoded.email,
          code: decoded.code,
          userType: decoded.userType,
          verified: true,
        },
        
        config.JWT.SECRET,
        
        { expiresIn: "20m" }
      );
      res.cookie("tokenRecoveryCode", newToken, { maxAge: 20 * 60 * 1000 });
  
      res.json({ message: "Code verified successfully" });
    } catch (error) {
      console.log("error" + error);
    }
  };


  passwordRecoveryController.newPassword = async (req, res) => {
    const { newPassword } = req.body;
  
    try {
      
      const token = req.cookies.tokenRecoveryCode;
  
      if (!token) {
        return res.json({ message: "Not token provided" });
      }
  
      
      const decoded = jsonwebtoken.verify(token, config.JWT.SECRET);
  
      
      if (!decoded.verified) {
        return res.json({ message: "Code not verified, cannot reset password" });
      }
  
      
      const { correo, userType } = decoded;
  
      let user;
  
      // Buscamos al usuario dependiendo del userType
      if (userType === "cliente") {
        user = await clientesModel.findOne({ correo });
      } else if (userType === "empleado") {
        user = await empleadosModel.findOne({ correo });
      }
  
      
      const hashPassword = await bcryptjs.hash(newPassword, 10);
  
     
  
      let updatedUser;
      if (userType === "clientes") {
        updatedUser = await clientesModel.findOneAndUpdate(
          { correo },
          { password: hashPassword },
          { new: true }
        );
      } else if (userType === "empleado") {
        updatedUser = await empleadosModel.findOneAndUpdate(
          { correo },
          { password: hashPassword },
          { new: true }
        );
      }
  
      res.clearCookie("tokenRecoveryCode");
  
      res.json({ message: "Password updated successfully" });
    } catch (error) {
      console.log("error" + error);
    }
  };

  export default passwordRecoveryController;