import express from "express";
import peliculasController from "../controllers/peliculasController.js";
import multer from "multer";

const router = express.Router();


const upload = multer({dest: "public/"})

router
.route("/")
.get(peliculasController.getAllPelicula)
.post(upload.single("imagen"),peliculasController.createPelicula)




export default router;