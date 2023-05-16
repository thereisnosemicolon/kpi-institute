const db = require('../models')
const Users = db.users

exports.findAll = (req, res) => {
    Users.find()
        .then((result) => {
            res.send(result)
        }).catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occured when retrieving data"
            })
        })
}

exports.create = (req,res) => {
    const user = new Users({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        profile: req.body.profile,
        skill: req.body.skill
    })
    
}

exports.findOne = (req, res) => {
    const id = req.params.id

    Users.findById(id)
        .then((result) => {
            res.send(result)
        }).catch((err) => {
            res.status(409).send({
                message: err.message
            })
        })
}

exports.update = (req, res) => {
    const id = req.params.id

    Users.findByIdAndUpdate(id, req.body)
        .then((result) => {
            if(!result) {
                res.status(404).send({
                    messages: "User not found"
                })    
            } else {
                res.send({messages: "Users updated"})
            }
        }).catch((err) => {
            res.status(409).send({
                message: err.message
            })
        })
}

exports.delete = (req, res) => {
    const id = req.params.id
    
    Users.findByIdAndRemove(id)
        .then((result) => {
            if(!result){
                res.status(404).send({
                    messages: "Users not found"
                })
            } else {
                res.send({
                    messages: "Users was deleted"
                })
            }
        }).catch((err) => {
            res.status(409).send({
                message: err.message
            })
        })
}