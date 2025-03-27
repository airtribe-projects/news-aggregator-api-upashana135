const bcrypt = require("bcrypt");
const saltRound = 10;
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const usersModel = require("../models/usersModel");

const getAllUsers = (req, res) => {
    res.send(req.app.locals.users);
}

const registerUser = async (req, res) =>{
    const user = req.body;
    const tempUser = {...user};
    tempUser.password = bcrypt.hashSync(user.password, saltRound);
    const existingUser = await usersModel.findOne({ email: tempUser.email});
    if(existingUser){
        return res.status(409).json({error: "User already exist!"});
    }
    const dbUser = await usersModel.create(tempUser);
    return res.status(200).json(dbUser);
}

const loginUser = async (req, res) =>{
    const {email, password} = req.body;
    const body = { email: email};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)){
        return res.status(400).send({error: "Invalid email format."});
    }
    const user = await usersModel.findOne(body);
    if(!user) {
        return res.status(401).json({error: "User not found"});
    }
    const isCorrectPassword = bcrypt.compareSync(password, user.password);
    if(!isCorrectPassword) {
        return res.status(401).json({error: "Invalid Password"});
    }
    const token = jwt.sign({email: user.email}, JWT_SECRET, {expiresIn: "1h"});
    return res.status(200).json({token: token});
}

const usersPreferences = async (req, res) => {
    const email = req.verifiedToken.email;
    const body = { email: email};
    const user = await usersModel.findOne(body);
    return res.status(200).json({preferences: user.preferences});
}

const updateUsersPreferences = async (req, res) => {
    const preferences = req.body.preferences;
    const email = req.verifiedToken.email;
    const body = { email: email};
    if (!Array.isArray(preferences) || !preferences.every(item => typeof item === 'string')) {
        return res.status(400).json({ error: "Preferences must be an array of strings." });
    }
    const user = await usersModel.findOneAndUpdate(body, { $set: {preferences:preferences}});
    if(!user) {
        return res.status(401).json({error: "User not found!"});
    }
    user.preferences = preferences;
    return res.status(200).json({user: user});
}

module.exports = {registerUser, loginUser, usersPreferences, updateUsersPreferences, getAllUsers} ;