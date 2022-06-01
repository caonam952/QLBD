const ChiTietPhieuThue = require("../models/chiTietPhieuThue.model");

exports.getAll = (req, res) => {
  ChiTietPhieuThue.getAll((result) => {
    res.send(result);
  });
};

exports.get = (req, res) => {
  const id = req.params.id;
  ChiTietPhieuThue.get(id, (result) => {
    res.send(result);
  });
};

exports.insert = (req, res) => {
  const chiTietPhieuThue = req.body;
  ChiTietPhieuThue.insert(chiTietPhieuThue, (result) => {
    res.send(result);
  });
};

exports.update = (req, res) => {
  const chiTietPhieuThue = req.body;
  ChiTietPhieuThue.update(chiTietPhieuThue, (result) => {
    res.send(result);
  });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  ChiTietPhieuThue.delete(id, (result) => {
    res.send(result);
  });
};

