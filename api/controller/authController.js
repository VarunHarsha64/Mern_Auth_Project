import User from "../models/UserModel.js";
import bcryptjs from "bcryptjs";


export const signup = async (req,res)=>{
    const {username, email, password} = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({
        username,
        email,
        password: hashedPassword,
    });

    try {
        await newUser.save();
        res.status(201).json({
            message: "User created successfully"
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
            message: "Failed to create user"
        });
        console.log(error);
    }

}

export const login = (req,res)=>{
    res.json({
        message: "working!!"
    });
} 