const db = require('../models')
const Profile = db.profiles

exports.findAll = (req,res) => {
    Profile.find()
    .then((res) => {
        res.send(res)
    }).catch((err) => {
        res.status(500).send({message: err})
    }) 
}