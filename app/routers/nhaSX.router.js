module.exports = function (router) {
    const nhaSXController = require("../controllers/nhaSX.controller");
    router.get("/nhaSX", nhaSXController.getAll);
    router.get("/nhaSX/:id", nhaSXController.get);
    router.post("/nhaSX", nhaSXController.insert);
    router.delete("/nhaSX/:id", nhaSXController.delete);
    router.put("/nhaSX", nhaSXController.update);
  };
  