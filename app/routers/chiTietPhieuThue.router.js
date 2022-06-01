module.exports = function (router) {
    const chiTietPhieuThueController = require("../controllers/chiTietPhieuThue.controller");
    router.get("/chiTietPhieuThue", chiTietPhieuThueController.getAll);
    router.get("/chiTietPhieuThue/:id", chiTietPhieuThueController.get);
    router.post("/chiTietPhieuThue", chiTietPhieuThueController.insert);
    router.delete("/chiTietPhieuThue/:id", chiTietPhieuThueController.delete);
    router.put("/chiTietPhieuThue", chiTietPhieuThueController.update);
  };