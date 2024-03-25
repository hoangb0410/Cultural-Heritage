const jwt = require("jsonwebtoken");

const middlewareController = {
    // verify token
    verifyToken: async(req, res, next) =>{
        const token = req.headers.token;
        if (token) {
            // Bearer 123456 => accessToken: 123456
            const accessToken = token.split(" ")[1];
            jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err,user)=>{
                if (err){
                    return res.status(403).json("Token is not valid");
                }
                req.user = user;
                next();
            });
        } else {
            return res.status(401).json("You're not authenticated");
        }
    },
    // verify Token and admin
    verifyTokenAndAdminAuth: (req, res, next) =>{
        middlewareController.verifyToken(req, res, ()=>{
            if (req.user.id == req.params.id || req.user.isAdmin){
                next();
            }
            else {
                return res.status(403).json("You're not allowed to delete");
            }
        });
    }
}

module.exports = middlewareController;