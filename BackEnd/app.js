import express from "express";
import cookieParser from "cookie-parser";
import peliculasRoute from "./src/routes/peliculas.js"
import empleadosRegisterRoute from "./src/routes/registerEmpleados.js";
import empleadosRoute from "./src/routes/empleados.js";
import clientesRegister from "./src/routes/registerClientes.js"




const app = express();


app.use(express.json());
app.use(cookieParser());


app.use("/api/Peliculas",peliculasRoute)
app.use("/api/registerEmpleados",empleadosRegisterRoute)
app.use("/api/Empleados",empleadosRoute)






export default app;