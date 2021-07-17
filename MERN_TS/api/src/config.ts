import dotenv from "dotenv";
dotenv.config();

//console.log(process.env);

export default {
    MONGO_DATABASE: process.env.MONGO_DATABASE || 'mern-videos-db',
    MONGO_USER: process.env.MONGO_USER || 'admin',
    MONGO_PASSWORD: process.env.MONGO_PASSWORD || 'admin',
    MONGO_HOST: process.env.MONGO_HOST || 'localhost',
    SERVER_PORT: process.env.SERVER_PORT || 4001
}