const asyncHandler = require("express-async-handler")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/userModel")

//@desc register user
//@route POST /api/users/login
//@access public
const registerUser = asyncHandler(async (req,res) =>{
    // requirement to register
    const {username, email, password}= req.body;
    if (!username ||!email ||!password) {
        res.status(400);
        throw new Error("All fields are Mandatory")
    }
    const userAvailable = await User.findOne({email});
     if (userAvailable) {
        res.status(400);
        throw new Error ("User already registered")
     }

     //HASH PASSWORD
     const hashedPassword = await bcrypt.hash(password,10);
     console.log("Hashed Password:", hashedPassword);
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });
     console.log(`User created ${user}`);
     if (user) {
        //dont want to show the hashed password to the user(in the thunderclient)but the id and email
        res.status(201).json({_id: user.id, email: user.email})
     } else {
        res.status(400)
        throw new Error ("User data is not valid")
     }
    res.status(200).json({message:"Register The User"})
})
/*const registerUser = asyncHandler(async (req, res) => {
    console.log("Received request:", req.body);

    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        console.log("Missing fields");
        res.status(400).json({ error: "All fields are mandatory" });
        return;
    }

    const userAvailable = await user.findOne({ email });
    if (userAvailable) {
        console.log("User already registered");
        res.status(400).json({ error: "User already registered" });
        return;
    }

    try {
        console.log("Proceeding with password hashing");
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("Hashed Password:", hashedPassword);

        const newUser = await user.create({ username, email, password: hashedPassword });

        res.status(200).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
        console.error("Error during user registration:", error);
    }

   const hashedPassword = await bcrypt.hash(password, 10);
console.log("Hashed Password:", hashedPassword); // Log before sending response

    res.status(200).json({ message: "User registered successfully" });
});*/

 
//@desc login user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req,res) =>{
     // requirement to login
    const {email, password} = req.body 
        if(!email || !password) {
            res.status(400);
            throw new Error("All fields are mandatory")
        }
        const user = await User.findOne({email});
        //comapre password with hashed password
        if (user && (await bcrypt.compare(password, user.password))) {
            // user payload(information needed in the jwts token)we wanted just username,email and id
            const accessToken = jwt.sign({
                user: {
                    usename: user.username,
                    email: user.email,
                    id: user.id,
                },
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "40m"}

        );
            res.status(200).json({accessToken})
        }else{
            res.status(401);
            throw new Error("email, password or id is not valid")
        }
});

//@desc Current user
//@route POST /api/users/current
//@access private
const currentUser = asyncHandler(async (req,res) =>{
    res.status(200).json(req.user)
});


module.exports = {registerUser, loginUser, currentUser}