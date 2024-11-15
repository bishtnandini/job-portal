import users from "../module/userdatabase.js";
import bcrypt from "bcrypt";
import jwt  from "jsonwebtoken";
import { body, validationResult } from 'express-validator';


//form signup
export const reg = async(req,res)=>{
    try{
        res.render("rform.ejs");
    }
    catch(err){
        res.status(500).json({error:"error"});

    }
};

//creating

export const create=[
    body('email').trim().isEmail(),
    body('username').trim().isLength({min :5}),
    body('password').trim().isLength({min :3}),
    async(req,res)=>{
    const errors=validationResult(req);

    if(!errors.isEmpty()){
        return res.status(500).json({error:errors.array()});
    }
    try{
       
        
        const { email, username, password } = req.body;

       
        const existUser = await users.findOne({ email });
        if (existUser) {
            return res.status(409).json({ message: "User already exists with this email" });  // 409 Conflict
        }
          const saltround=10;
        const hashPassword= await bcrypt.hash(password,saltround);

        
        const newUser = new users({ 
            email, 
            username, 
            password : hashPassword
         });

        // Save the user to the database
        const savedUser = await newUser.save();

        // Return the saved user data with a success response
        res.status(201).json(savedUser); 

    }
    catch(err){
        res.status(500).json({ error: "Internal server error" });
    }
    
}
];

//form login page
export const login = async(req,res)=>{
    try{
        res.render("lform.ejs");
    }
    catch(err){
        res.status(500).json({error:"error"});

    }
};

//checking login details

export const checkingL= [
    body('email').trim().isEmail(),
    body('password').trim().isLength({min :3}),
    async(req,res)=>{
        const errors= validationResult(req);
        if(!errors.isEmpty()){
            return res.status().json({error:errors.array()});
        }
        try{
            const {email,password}=req.body;
            const user=await users.findOne({
                email:email
            })
            if(!user){
                return res.status(400).json({message:"username or pass incorrect"});

            }
            const isMatch=await bcrypt.compare(password,user.password); //body and userpass
            if(!isMatch){
                return res.status(400).json({message:"username or pass incorrect"});
            }

            //user login  ek baar hea karega

            const token =jwt.sign({
                userId:user._id,
                email:user.email,
                username:user.username

            },

            process.env.JWT_SECRET,

        
        
            )
            res.cookie('token',token)
            res.send("logged in");


        }
        catch(err){
            res.status(500).json({ error: "Internal server error" });

        }

    }

];
