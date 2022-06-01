module.exports = function (router) {
  const thanhVienController = require("../controllers/thanhVien.controller");
  router.get("/thanhVien", thanhVienController.getAll);
  router.get("/thanhVien/statistics", thanhVienController.statistics);
  router.get("/thanhVien/:id", thanhVienController.get);
  router.post("/thanhVien", thanhVienController.insert);
  router.delete("/thanhVien/:id", thanhVienController.delete);
  router.put("/thanhVien", thanhVienController.update);
};
