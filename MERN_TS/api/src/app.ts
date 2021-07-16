import config from "./config";
import videoRoutes from "./routes/videos.routes";
import morgan from "morgan";
import cors from "cors";
import express from "express";
const app = express();

app.set('port', config.SERVER_PORT);

//The server will recognize request data like this:
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

app.use(morgan('dev')); //Shows the requests on Console!
app.use(cors());
app.use(videoRoutes);

export default app;