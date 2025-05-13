import express from "express";
import empleadosController from "../controllers/empleadosController.js";


const router = express.Router();


router
.route("/")
.get(empleadosController.get)


router
.route("/:id")
.put(empleadosController.empleadosUpdate)
.delete(empleadosController.delete)

export default router;