import express from "express";
import {reg,create,login,checkingL} from "../controller/usercont.js";
const route= express.Router();


// signup fprm
route.get("/register",reg);

//crete user sinup 
route.post("/register",create)

//login from
route.get("/login", login)

//logining credential
route.post("/login",checkingL)


export default route;