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

    email:{
        email_user: process.env.EMAIL_USER,
        email_password: process.env.EMAIL_PASS
    },
}