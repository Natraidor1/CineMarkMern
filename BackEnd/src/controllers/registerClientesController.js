import clientesModel from "../models/clientes.js";
import bcryptjs from "bcryptjs"; 
import jsonwebtoken from "jsonwebtoken"; 
import nodemailer from "nodemailer"; 
import crypto from "crypto"; 
import { config } from "../config.js";

const registerClientesController = {}

registerClientesController.postClientes = async (req,res)=>{

    const {nombre, correo, telefono, contrasena, direccion, activo}= req.body;

    try {
        const existClient = await clientesModel.findOne({correo})

        if (existClient) {
            return res.json({message: "El cliente ya existe"})
        }

        const passwordHash = await bcryptjs.hash(contrasena,10)

        const NuevCliente = new clientesModel({
            nombre, 
            correo, 
            telefono, 
            contrasena: passwordHash, 
            direccion, 
            activo
        });

        await NuevCliente.save();

        const verificationCode = crypto.randomBytes(3).toString("hex");

    
        const tokenCode = jsonwebtoken.sign(

          { correo, verificationCode },
          
          config.JWT.SECRET,
          
          { expiresIn: "2h" }
        );

        res.cookie("verificationToken", tokenCode, { maxAge: 2 * 60 * 60 * 1000 });

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: config.email.email_user,
              pass: config.email.email_password,
            },
          });

          const mailOptions = {
            from: config.email.email_user,
            to: correo,
            subject: "Verificación de correo",
            text:
              "Para verificar tu cuenta, utiliza el siguiente codigo: " +
              verificationCode +
              "\n expira en dos horas",
          };

          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              return res.json({ message: "Error sending email" + error });
            }
            console.log("Email sent" + info);
          });

          res.json({
            message: "Client registered, Please verify your email with the code sent",
          });
    

    } catch (error) {
        console.log("error: " + error)
    }


};

registerClientesController.verifyCodeEmail = async (req,res) =>{
    const { requireCode } = req.body;

    const token = req.cookies.verificationToken;


    try {
        
        const decoded = jsonwebtoken.verify(token, config.JWT.SECRET);
        const { correo, verificationCode: storedCode } = decoded;
    
 
        if (requireCode !== storedCode) {
          return res.json({ message: "Invalid code" });
        }
    
        
        const cliente = await clientesModel.findOne({ correo });
        cliente.isVerified = true;
        await cliente.save();
    
        res.clearCookie("verificationToken");
    
        res.json({ message: "correo enviado satisfactoriamente" });
      } catch (error) {
        console.log("error" + error);
      }
}

export default registerClientesController