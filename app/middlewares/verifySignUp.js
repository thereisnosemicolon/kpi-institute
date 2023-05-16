const db = require('../models')
const PROFILES = db.PROFILES
const User = db.users

checkDuplicateUsernameOrEmail = (req, res, next) => {
    User.findOne({
        username: req.body.username
    }).then((result) => {
        if(result){
            res.status(400).send({ message: "Username is already taken" })
            return;
        }
        // Email
        User.findOne({
            email: req.body.email
        }).then((result) => {
            res.status(200).send({message:result})
        }).catch((err) => {
            res.status(500).send({message: err})
        });

    }).catch((err) => {
        res.status(500).send({message: err})
    });

};

checkRoleExisted = (req, res, next) => {
    if(req.body.profile){
        for(let i = 0; i<req.body.profile.length; i++ ){
            if(!PROFILES.includes(req.body.profile[i])) {
                res.status(400).send({
                    message: 'Failed, role is not exist'
                });
                return;
            }
        }
    }
    next();
};

const verifySignUp = {
    checkDuplicateUsernameOrEmail,
    checkRoleExisted
};

module.exports = verifySignUp