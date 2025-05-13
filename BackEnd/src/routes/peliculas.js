import express from "express";
import peliculasController from "../controllers/peliculasController.js";

const router = express.Router();


router
.route("/")
.get(peliculasController.getPeli)
.post(peliculasController.postPeli)

router
.route("/:id")
.put(peliculasController.updatePeli)
.delete(peliculasController.deletePeli)



export default router;