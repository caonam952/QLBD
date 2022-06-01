const ThanhVien = require("../models/thanhVien.model");
const jwt = require("../common/jwt");

exports.login = (req, res) => {
  const { userName, passW } = req.body;
  if (userName != "" && passW != "") {
    ThanhVien.checkLogin(req.body, async (result) => {
      if (result) {
        const _token = await jwt.make(result);
        res.send({ token: _token });
      } else {
        res.send({ token: null });
      }
    });
  } else {
    res.send({ token: null });
  }
};
