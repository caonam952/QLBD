const BangDia = require("../models/bangDia.model");

exports.getAll = (req, res) => {
  BangDia.getAll((result) => {
    res.send(result);
  });
};

exports.get = (req, res) => {
  const id = req.params.id;
  BangDia.get(id, (result) => {
    res.send(result);
  });
};

exports.insert = (req, res) => {
  const bangDia = req.body;
  BangDia.insert(bangDia, (result) => {
    res.send(result);
  });
};

exports.update = (req, res) => {
  const bangDia = req.body;
  BangDia.update(bangDia, (result) => {
    res.send(result);
  });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  BangDia.delete(id, (result) => {
    res.send(result);
  });
};

exports.statistics = (req, res) => {
  BangDia.statistics((result) => {
    res.send(result);
  });
};