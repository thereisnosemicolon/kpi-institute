const db = require('../models')
const Users = db.users

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};
  
exports.boardDashboard = (req, res) => {
    res.status(200).send("Board Content.");
};
  
exports.expertDashboard = (req, res) => {
    res.status(200).send("Expert Content.");
};
  
exports.trainerDashboard = (req, res) => {
    res.status(200).send("Trainer Content.");
};

exports.competitorDashboard = (req, res) => {
    res.status(200).send("Competitor Content.");
};