import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import path from 'path'; //new
import ejsMate from "ejs-mate";
import route from "../backend dev/routes/userroute.js";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";



dotenv.config();
const app=express();

//ejs
const __filename=fileURLToPath(import.meta.url);
const __dirname = decodeURIComponent(path.dirname(__filename))
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname,'public')));
app.engine("ejs",ejsMate);

//cookie
app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port= process.env.PORT || 5000;
const MongoUrl=process.env.MONGO_URL;


main()
     .then(()=>{
        console.log("connected to db");
        app.listen(port,()=>{
            console.log(`server is running at port ${port}`);

        });
     })
     .catch((err)=>{
        console.log("error");

     });

async function main(){
    await mongoose.connect(MongoUrl);
}


app.use("/api/users",route);
