import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import ConnectionDb from "./database/dbconfig.js";
import router from "./Routes/UserRoute.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use(cors());

ConnectionDb()

app.use("/user",router)

app.listen(port, () => {
    console.log("My App Listen in",port);
})
