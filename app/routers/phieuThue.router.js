module.exports = function (router) {
    const phieuThueController = require("../controllers/phieuThue.controller");
    router.get("/phieuThue", phieuThueController.getAll);
    router.get("/phieuThue/statistics", phieuThueController.statistics);
    router.get("/phieuThue/:id", phieuThueController.get);
    router.get("/phieuThue/detail/:id", phieuThueController.getDetail);
    router.post("/phieuThue", phieuThueController.insert);
    router.delete("/phieuThue/:id", phieuThueController.delete);
    router.put("/phieuThue", phieuThueController.update);
  };