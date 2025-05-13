import { Schema, model } from "mongoose";


const clientesSchema = new Schema({

    nombre:{
        type: String
    },
    correo:{
        type: String
    },
    telefono:{
        type: String
    },
    contrasena:{
        type: String
    },
    direccion:{
        type: String
    },
    activo:{
        type: Boolean
    },
},
    {   
        timestamps: false,
        strict: true
    }
);

export default model("clientes", clientesSchema);