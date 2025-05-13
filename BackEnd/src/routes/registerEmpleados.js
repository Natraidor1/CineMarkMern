import express from "express";
import registerEmpleadosController from "../controllers/registerEmpleadosController.js";

const router = express.Router();

router
.route("/")
.post(registerEmpleadosController.registrarEmpleados)



export default router;