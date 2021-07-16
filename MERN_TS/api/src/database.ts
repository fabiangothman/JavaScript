import mongoose, { ConnectOptions } from "mongoose";
import config from "./config";

//Function executes automatically
(async () => {
    try{
        const moongoseOptions: ConnectOptions = {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useFindAndModify:true,
            useCreateIndex: true,
            /*user: config.MONGO_USER,
            pass: config.MONGO_PASSWORD*/
        };
        const db = await mongoose.connect(`mongodb://${config.MONGO_HOST}/${config.MONGO_DATABASE}`, moongoseOptions);
        console.log(`Database connected to ${db.connection.name}.`);
    }catch(err){
        console.log(err);
    }    
})();