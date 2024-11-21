import express from 'express';
import cors from 'cors';
import dotenv from "dotenv"
import connectDB from './db/index.js'; 
import playerRouter from "./routes/player.route.js";
import authRoute from "./routes/auth.route.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;

connectDB().then(()=>{
    app.listen(port,()=>{
        console.log(`Server running on port ${port}`);
    });
}).catch((err)=>{
    console.log(err);
    process.exit(1);
})

app.use("/api/v1",playerRouter);
app.use("/api/v1",authRoute);