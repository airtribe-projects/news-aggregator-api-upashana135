const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const validateUser = (req, res, next) => {
    const {name, email, password, preferences} = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!name || !email || !password || !preferences){
        return res.status(400).send({error: "Required parameter missing."});
    }
    if(!emailRegex.test(email)){
        return res.status(400).send({error: "Invalid email format."});
    }
    if(password.length < 6 || password.length > 10){
        return res.status(400).send({error: "Password must be between 6 and 10 characters long."});
    }
    if (!Array.isArray(preferences) || !preferences.every(item => typeof item === 'string')) {
        return res.status(400).json({ error: "Preferences must be an array of strings." });
    }
    next();
}

const isAuthorized = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    if (!token){
        return res.status(401).json({error: "Authorization token missing"});
    }
    let verifiedToken;
    try{
        verifiedToken = jwt.verify(token, JWT_SECRET);
        req.verifiedToken = verifiedToken;
        next();
    }catch(error){
        return res.status(401).json({error: "Invalid token!"})
    }
    
}

module.exports = {validateUser, isAuthorized}