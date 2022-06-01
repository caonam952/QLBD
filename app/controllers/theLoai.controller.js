const TheLoai = require("../models/theLoai.model");

exports.getAll = (req, res) => {
  TheLoai.getAll((result) => {
    res.send(result);
  });
};

exports.get = (req, res) => {
  const id = req.params.id;
  TheLoai.get(id, (result) => {
    res.send(result);
  });
};

exports.insert = (req, res) => {
  const theLoai = req.body;
  TheLoai.insert(theLoai, (result) => {
    res.send(result);
  });
};

exports.update = (req, res) => {
  const theLoai = req.body;
  TheLoai.update(theLoai, (result) => {
    res.send(result);
  });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  TheLoai.delete(id, (result) => {
    res.send(result);
  });
};

exports.statistics = (req, res) => {
  TheLoai.statistics((result) => {
    res.send(result);
  });
};
