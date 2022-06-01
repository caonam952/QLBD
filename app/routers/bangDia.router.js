module.exports = function (router) {
    const bangDiaController = require("../controllers/bangDia.controller");
    router.get("/bangDia", bangDiaController.getAll);
    router.get("/bangDia/statistics", bangDiaController.statistics);
    router.get("/bangDia/:id", bangDiaController.get);
    router.post("/bangDia", bangDiaController.insert);
    router.delete("/bangDia/:id", bangDiaController.delete);
    router.put("/bangDia", bangDiaController.update);
  };
  