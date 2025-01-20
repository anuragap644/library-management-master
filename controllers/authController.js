const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const { generateToken } = require("../utils/generateToken");

let createAdmin = async (req,res)=>{
    try {
        let { name, email, password } = req.body;
        let existingOwner = await userModel.findOne({role:"admin"});
        if(existingOwner)
            return res.status(400).send("Admin Already exist");
        let admin = await userModel.findOne({ email });
        if (admin)
            return res.status(400).send("This user already exist");

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                if (err) return res.send(err.message);
                else {
                    let createdAdmin = await userModel.create({
                        name,
                        password: hash,
                        email,
                        role: "admin"
                    });
                    let token = generateToken(createdAdmin);
                    res.cookie("token", token);
                    res.send("owner created succesfully");
                }
            })
        })
    }
    catch (err) {
        res.send(err.message);
    }
}
let registerUser = async (req, res) => {
    try {
        let { name, email, password } = req.body;
        let user = await userModel.findOne({ email });
        if (user)
            return res.status(400).send("This user already exist");

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                if (err) return res.send(err.message);
                else {
                    let createdUser = await userModel.create({
                        name,
                        password: hash,
                        email,
                    });
                    let token = generateToken(createdUser);
                    res.cookie("token", token);
                    res.send("user created succesfully");
                }
            })
        })
    }
    catch (err) {
        res.send(err.message);
    }
}

let loginUser = async (req, res) => {
    try {
        let { email, password } = req.body;
        let user = await userModel.findOne({ email });
        if (!user) {
            req.flash("error", "Email or passowrd Incorrect");
            return res.redirect("/");
        }
        bcrypt.compare(password, user.password, (err, result) => {
            if (!result) {
                req.flash("error", "email or password Incorrect");
                return res.redirect("/");
            }
            else {
                let token = generateToken(user);
                res.cookie("token", token);
                res.send("login successfull");
            }
        });


    }
    catch (err) {
        res.send(err.message);
    }
}
module.exports = {registerUser,loginUser,createAdmin};