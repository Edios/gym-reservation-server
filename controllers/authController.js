const User=require('../models/User');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

/**
 * @api {post} /auth/register Register
 * @apiName Register
 * @apiGroup Auth
 * @apiParam {String} name User's name
 * @apiParam {String} email User's email
 * @apiParam {String} password User's password
 * @apiSuccess {String} token JSON Web Token for user
 */
exports.register=async(req,res)=>{
    const {name,email,password}=req.body;
    try{
        const userExists=await User.findOne({email});
        if(userExists){
            return res.status(400).json({message:"User already exists"});
        }
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);
        const newUser=new User({name,email,password:hashedPassword});
        await newUser.save();
        const token=jwt.sign({
                user_id:newUser._id,
            },
            process.env.JWT_SECRET,
            {expiresIn:'1h'});
            res.json({
                token,
                userId: newUser._id
            })
        }
        catch(error){
            console.error(error);
            res.status(500).json({message:"Server error",error});
    }
};

/**
 * @api {post} /auth/login Login
 * @apiName Login
 * @apiGroup Auth
 * @apiParam {String} email User's email
 * @apiParam {String} password User's password
 * @apiSuccess {String} token JSON Web Token for user
 * @apiError (Bad Request 400) InvalidCredentials User not found or password is incorrect
 * @apiError (Server Error 500) ServerError Server error
 */
exports.login=async(req,res)=>{
    const {email,password}=req.body;
    try{
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"Invalid credentials: User not found"});
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message:"Invalid credentials: Password is incorrect"});
        }
        const token=jwt.sign({
                id:user._id,
            },
            process.env.JWT_SECRET,
            {expiresIn:'1h'});
        res.json({
            token,
            userId: user._id
        })
    }
    catch(error){
        console.error(error);
        res.status(500).json({message:"Server error"});
    }
};