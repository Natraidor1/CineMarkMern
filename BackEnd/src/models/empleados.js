import { Schema, model } from "mongoose";


const empleadosSchema = new Schema ({

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
    puesto:{
        type: String
    },
    fechaContratacion:{
        type: Date
    },
    salario:{
        type: Number
    },
    activo:{
        type: Boolean
    },

},
{
    timestamps: true,
    strict: false
}
);


export default model("empleados", empleadosSchema);