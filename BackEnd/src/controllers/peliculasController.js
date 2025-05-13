import modeloPeliculas from "../models/peliculas.js"
import { v2 as cloudinary } from "cloudinary";

import { config } from "../config.js";


cloudinary.config({
    cloud_name: config.cloudinary.cloudinary_name,
    api_key: config.cloudinary.cloudinary_api_key,
    api_secret: config.cloudinary.cloudinary_api_secret,
  });

const peliculasController = {};


peliculasController.getAllPelicula = async (req, res) => {
    const peli = await modeloPeliculas.find();
    res.json(peli);
  };


  peliculasController.createPelicula = async (req, res) => {
    try {
      const { titulo, descripcion, director, genero, anio, duracion } = req.body;
      let imageUrl = "";
  
      if (req.file) {
        
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: "public",
          allowed_formats: ["jpg", "png", "jpeg"],
        });
        imageUrl = result.secure_url;
      }
  
      const newPeli = new modeloPeliculas({ titulo, descripcion, director, genero, anio, duracion, imagen: imageUrl });
      newPeli.save();
  
      res.json({ message: "peli saved" });
    } catch (error) {
      console.log("error" + error);
    }
  };


export default peliculasController;