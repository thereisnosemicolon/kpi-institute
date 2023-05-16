const jwt = require('jsonwebtoken')
const config = require('../config/auth.config')
const db = require('../models')
const Profile = db.profiles
const User = db.users

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"]
    if(!token){
        return res.status(403).send({message: "No token provided"})
    }
    jwt.verify(token, config.secret, (err, decoded) => {
        if(err){
            return res.status(401).send({message: "Unauthorized"})
        }
        req.userId = decoded.id
        next();
    })
};

isBoard = (req, res, next) => {
    console.log(req.userId)
    User.findById(req.userId).exec((err, user) => {
        if(err){
            res.status(500).send({message: err});
            return;
        } 
        Profile.find({
            _id: {$in: user.profile}
        },(err, profile) => {
            if(err){
                res.status(500).send({message: err})
                return;
            }
            for(let i = 0; i < profile.length; i++){
                if(profile[i].profile === 'Board'){
                    next();
                    return;
                }
            }

            res.status(400).send({message: "You are not Board Profile"})
            return;
        });
    })
};

isExpert = (req, res, next) => {
    console.log(req.userId)
    User.findById(req.userId).exec((err, user) => {
        if(err){
            res.status(500).send({message: err});
            return;
        } 
        Profile.find({
            _id: {$in: user.profile}
        },(err, profile) => {
            if(err){
                res.status(500).send({message: err})
                return;
            }
            for(let i = 0; i < profile.length; i++){
                if(profile[i].profile === 'Expert'){
                    next();
                    return;
                }
            }

            res.status(400).send({message: "You are not Expert Profile"})
            return;
        });
    })
};

isTrainer = (req, res, next) => {
    console.log(req.userId)
    User.findById(req.userId).exec((err, user) => {
        if(err){
            res.status(500).send({message: err});
            return;
        } 
        Profile.find({
            _id: {$in: user.profile}
        },(err, profile) => {
            if(err){
                res.status(500).send({message: err})
                return;
            }
            for(let i = 0; i < profile.length; i++){
                if(profile[i].profile === 'Trainer'){
                    next();
                    return;
                }
            }

            res.status(400).send({message: "You are not Trainer Profile"})
            return;
        });
    })
};

isCompetitor = (req, res, next) => {
    console.log(req.userId)
    User.findById(req.userId).exec((err, user) => {
        if(err){
            res.status(500).send({message: err});
            return;
        } 
        Profile.find({
            _id: {$in: user.profile}
        },(err, profile) => {
            if(err){
                res.status(500).send({message: err})
                return;
            }
            for(let i = 0; i < profile.length; i++){
                if(profile[i].profile === 'Competitor'){
                    next();
                    return;
                }
            }

            res.status(400).send({message: "You are not Competitor Profile"})
            return;
        });
    })
};

const authJwt = {
    verifyToken,
    isBoard,
    isExpert,
    isTrainer,
    isCompetitor
}

module.exports = authJwt