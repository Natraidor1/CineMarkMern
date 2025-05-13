import modeloPeliculas from "../models/peliculas.js"

const peliculasController = {};


peliculasController.getPeli = async (req, res) =>{
    const pelicula = await modeloPeliculas.find();
    res.json(pelicula);
};

peliculasController.postPeli = async (req,res) =>{
    const {titulo, descripcion, director, genero, anio, duracion, imagen} = req.body;
    const newPeli = new modeloPeliculas({titulo, descripcion, director, genero, anio, duracion, imagen})
    await newPeli.save();
    res.json({message: "pelicula insertada"})

};


peliculasController.deletePeli = async (req,res)=>{

    const deletePelicula = await modeloPeliculas.findByIdAndDelete(req.params.id)

    if(!deletePelicula){
        return res.status(404).json({message : "pelicula no encontrada"})

    }
    res.json({message: "pelicula eliminada"})
};

peliculasController.updatePeli = async (req, res) =>{
    const {titulo, descripcion, director, genero, anio, duracion, imagen} = req.body;

    await modeloPeliculas.findByIdAndUpdate(
        req.params.id,
    {
        titulo, 
        descripcion, 
        director, 
        genero, 
        anio, 
        duracion, 
        imagen
    },

    {
        new:true
    }
    );
    res.json({message: "Pelicula actualizada"})
};

export default peliculasController;