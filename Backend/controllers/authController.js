//register

//login 

// sypher Theory and way
// rajat Singh is a teacher and is from up
// -> a-> &
// -> space-> _
// -> aa-> '/'

// r&j&t_Singh->
// '/'->

import jwt from 'jsonwebtoken';
import User from "../models/user.js";
import bcrypt from 'bcrypt';


export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.json(
                {
                    Success: false,
                    Message: "You have to provide all 3 Details to Register"
                }
            )
        }
        const userFromDb = await User.findOne({ email });
        if (userFromDb) {
            return res.json(
                {
                    Success: false,
                    Message: "Email is already Used"
                }
            )
        }

        const hassedPassword = await bcrypt.hash(password, 10);

        await User.create({ name, email, password: hassedPassword });

        return res.status(201).json({
            Success: true,
            Message: "You are now registered"
        });

    }
    catch (error) {
        return res.json({
            Success: false,
            Message: error.Message,
        });
    }
}


export const login = async (req, res) => {
    try {

        console.log("Yes we are reaching inside login function");

        const { email, password } = req.body;
        if (!email || !password) {
            return res.json(
                {
                    Success: false,
                    Message: "Email or Password is Missing"
                }
            )
        }

        console.log("Yes we are reaching inside login function", email);

        const userFromDb = await User.findOne({ email });
        if (!userFromDb) {
            return res.json(
                {
                    Success: false,
                    Message: "Wrong Credention Unable to login"
                }
            )
        }

        const isMatch = await bcrypt.compare(password, userFromDb?.password);
        if (!isMatch) {
            return res.json(
                {
                    Success: false,
                    Message: "Wrong Password"
                }
            )
        }

        const payload = {
            id: userFromDb._id,
            role: userFromDb.role,
        }
        
        const token = jwt.sign(payload, process.env.SECRET_KEY)

        // here now we will try to creat a token of JWT type and then we can send this token to the logged in user  and user will send it with new requests and we will verify the token with our secreaet key and see if the users is sedning correct Token or not. once verified we came to knwo teh detils of user taht we can use for autherisation purpose


        return res.json({
            Success: true,
            Message: "Sucessfully Logged In ",
            data: {
                id: userFromDb._id,
                name: userFromDb.name,
                email: userFromDb.email,
                role: userFromDb.role
            },
            token
        });

    }
    catch (error) {
        return res.json({
            Success: false,
            Message: error.Message,
        });
    }
}




