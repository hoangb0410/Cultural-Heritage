const jwt = require("jsonwebtoken");
const Post = require("../models/Post");

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
    // verify Token, user or admin
    verifyTokenAndUserOrAdminAuth: (req, res, next) =>{
        middlewareController.verifyToken(req, res, ()=>{
            if (req.user.id == req.params.id || req.user.isAdmin){
                next();
            }
            else {
                return res.status(403).json("You're not allowed");
            }
        });
    },
    // verify Token and Admin
    verifyTokenAndAdminAuth: (req, res, next) =>{
        middlewareController.verifyToken(req, res, ()=>{
            if (req.user.isAdmin){
                next();
            }
            else {
                return res.status(403).json("You're not allowed, only admin has permission!");
            }
        });
    },
    // verifyTokenAndAuthor: middleware to restrict post updates to author
    verifyTokenAndAuthorOrAdminPost: async (req, res, next) => {
        try {
        // Call verifyToken middleware to ensure valid JWT
        await middlewareController.verifyToken(req, res, () => {
            // Extract post ID from request parameters
            const { id } = req.params;
            // Find the post by ID
            Post.findById(id)
            .then((post) => {
                // Check if post exists and user is the author (or admin)
                if (post && (post.author.toString() == req.user.id || req.user.isAdmin)){
                    next();
                } else {
                    return res.status(403).json("You're not authorized to update this post.");
                }
            })
            .catch((err) => {
                console.error(err);
                res.status(500).json("Server error. Please try again later.");
            });
        });
        } catch (err) {
        // Handle errors from verifyToken if necessary (already handled in verifyToken)
        console.error(err);
        }
    },
}

module.exports = middlewareController;