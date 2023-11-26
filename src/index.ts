import express from "express";
import cors from "cors";
import { routes } from "./routers";
import errorHandler from "./middlewares/errorHandler";

const app = express();

app.use(cors());
app.use(express.json());

app.use(errorHandler);

app.use(routes);

app.listen(9999, '0.0.0.0', () => console.log("server running on port 9999"));



