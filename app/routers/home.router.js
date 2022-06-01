module.exports = function (router) {
  const homeController = require("../controllers/home.controller");
  router.get("/", homeController.home);
};
