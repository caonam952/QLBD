const dirname = __dirname.replace("app\\controllers", "");
exports.home = function (req, res) {
  res.sendFile(dirname + "/index.html");
};
