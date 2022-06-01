const NhaSX = require("../models/nhaSX.model");

exports.getAll = (req, res) => {
  NhaSX.getAll((result) => {
    res.send(result);
  });
};

exports.get = (req, res) => {
  const id = req.params.id;
  NhaSX.get(id, (result) => {
    res.send(result);
  });
};

exports.insert = (req, res) => {
  const nhaSX = req.body;
  NhaSX.insert(nhaSX, (result) => {
    res.send(result);
  });
};

exports.update = (req, res) => {
  const nhaSX = req.body;
  NhaSX.update(nhaSX, (result) => {
    res.send(result);
  });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  NhaSX.delete(id, (result) => {
    res.send(result);
  });
};
