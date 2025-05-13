import dotenv from "dotenv";


dotenv.config();

export const config = {

    db:{
        URI: process.env.DB_URI
    },

    server:{
        PORT: process.env.PORT
    },

    JWT:{
        SECRET: process.env.JWT_SECRET,
        EXPIRES: process.env.JWT_EXPIRES
    },
}