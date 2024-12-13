const jwt = require("jsonwebtoken");
require('dotenv').config();

const verifyToken = (req, res, next)=> {
    token = req.headers['x-auth-token'];
    if(!token) {
        res.status(404).json("Here Token is required Bro");
    }
    try{const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
    }
    catch{
        res.status(500).json("Expired Token Please Generate Another");
    }
}

module.exports = verifyToken;
