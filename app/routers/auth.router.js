module.exports = function (router) {
  const authController = require("../controllers/auth.controller");
  router.post("/logIn", authController.login);
};
