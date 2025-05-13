import express from "express";
import cookieParser from "cookie-parser";
import peliculasRoute from "./src/routes/peliculas.js"
import empleadosRegisterRoute from "./src/routes/registerEmpleados.js";
import empleadosRoute from "./src/routes/empleados.js";
import clientesRegister from "./src/routes/registerClientes.js"
import clientesRoute from "./src/routes/clientes.js"
import passwordRecovery from "./src/routes/passwordRecovery.js"
import loginRoute from "./src/routes/login.js"
import logoutRoute from "./src/routes/logout.js"




const app = express();


app.use(express.json());
app.use(cookieParser());



app.use("/api/Peliculas",peliculasRoute)
app.use("/api/registerEmpleados",empleadosRegisterRoute)
app.use("/api/Empleados",empleadosRoute)
app.use("/api/registerClients",clientesRegister)
app.use("/api/Clientes",clientesRoute)
app.use("/api/passwordRecovery",passwordRecovery)
app.use("/api/logIn",loginRoute)
app.use("/api/logOut", logoutRoute)








export default app;