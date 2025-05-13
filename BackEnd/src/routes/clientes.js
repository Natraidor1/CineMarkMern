import express from "express";
import clientesController from "../controllers/clientesController.js";

const router = express.Router();

router
.route("/")
.get(clientesController.getClientes)


router
.route("/:id")
.put(clientesController.actualizarClien)
.delete(clientesController.deleteClientes)

export default router;