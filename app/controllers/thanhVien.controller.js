const ThanhVien = require("../models/thanhVien.model");

exports.getAll = (req, res) => {
  ThanhVien.getAll((result) => {
    res.send(result);
  });
};

exports.get = (req, res) => {
  const id = req.params.id;
  ThanhVien.get(id, (result) => {
    res.send(result);
  });
};

exports.insert = (req, res) => {
  const thanhVien = req.body;
  ThanhVien.insert(thanhVien, (result) => {
    res.send(result);
  });
};

exports.update = (req, res) => {
  const thanhVien = req.body;
  ThanhVien.update(thanhVien, (result) => {
    res.send(result);
  });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  ThanhVien.delete(id, (result) => {
    res.send(result);
  });
};

exports.statistics = (req, res) => {
  ThanhVien.statistics((result) => {
    res.send(result);
  });
};
