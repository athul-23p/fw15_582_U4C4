const jwt  = require("jsonwebtoken");
require('dotenv').config();
const verifyToken = (token) => jwt.verify(token,process.env.SECRET); 
const authenticate = async (req,res,next) => {
    try {
        // console.log(req.headers.authorization.startsWith("Bearer "));
        if(!req.headers.authorization ){
            return res.status(400).send('no token or invalid token');
        }

        console.log(req.body);
        let token = req.headers.authorization.split('Bearer ')[1];
        let decoded = verifyToken(token);
        req.user = decoded.user;
        // console.log(req.user);
        next();
    } catch (error) {
        return res.status(500).send({ error });
        
    }
}

module.exports = authenticate;