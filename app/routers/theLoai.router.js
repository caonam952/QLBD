module.exports = function (router) {
  const theLoaiController = require("../controllers/theLoai.controller");
  router.get("/theLoai", theLoaiController.getAll);
  router.get("/theLoai/statistics", theLoaiController.statistics);
  router.get("/theLoai/:id", theLoaiController.get);
  router.post("/theLoai", theLoaiController.insert);
  router.delete("/theLoai/:id", theLoaiController.delete);
  router.put("/theLoai", theLoaiController.update);
};
