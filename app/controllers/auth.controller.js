const config = require('../config/auth.config')
const db = require('../models')
const User = db.users
const Profile = db.profiles

var jwt = require('jsonwebtoken')
var bcrypt = require('bcryptjs')


exports.signup = (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 8),
        profile: req.body.profile,
        skill: req.body.skill
    });
    user.save((err, user) => {
        if(err){
            res.status(500).send({message: err.message})
            return
        }
        if(req.body.profile){
            Profile.find({
                name: {$in: req.body.profile}
            },
            (err, profile) => {
                if(err){
                    res.status(500).send({'message': err.message})
                }

                user.profile = profile.map(profile => profile._id);
                user.save(err => {
                    if(err){
                        res.status(500).send({message: err});
                    }
                    res.send({message:"User registered successfully"})
                })
            })
        } else {
            Profile.findOne({name: "user" } , (err, role) => {
                if(err){
                    res.status(500).send({message: err});
                    return;
                }
                user.profile = [profile._id]
                user.save(err => {
                    if(err){
                        res.status(500).send({message: err});
                        return;
                    }
                    res.send({message: "User was registered succesfully"})
                })
            });
        }
    });
};

exports.signin = (req, res) => {
    User.findOne({
        username: req.body.username
    })
    .populate("profile", "-__v")
    .exec((err, user) => {
        if(err){
            res.status(500).send({message: err})
            return;
        }
        if(!user){
            return res.status(400).send({message: "User not found"})
        }

        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if(!passwordIsValid){
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password"
            });
        }

        var token = jwt.sign({id: user.id}, config.secret , {
            expiresIn: 86400
        });

        var authorities = [];

        for(let i = 0; i < user.profile.length; i++){
            authorities.push("PROFILE_" + user.profile[i].name.toUpperCase())
        }

        res.status(200).send({
            id: user.id,
            username: user.username,
            email: user.email,
            profile: authorities,
            accessToken: token
        });
    });
}