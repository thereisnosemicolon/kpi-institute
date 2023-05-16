const {authJwt}  = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  app.get(
    "/api/test/board",
    [authJwt.verifyToken, authJwt.isBoard],
    controller.boardDashboard
  );


  app.get(
    "/api/test/expert",
    [authJwt.verifyToken, authJwt.isExpert],
    controller.expertDashboard
  );

  app.get(
    "/api/test/trainer",
    [authJwt.verifyToken, authJwt.isTrainer],
    controller.trainerDashboard
  );

  app.get(
    "/api/test/competitor",
    [authJwt.verifyToken, authJwt.isCompetitor],
    controller.competitorDashboard
  );
};
