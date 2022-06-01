const db = require("../common/connect");

const TheLoai = (theLoai) => {
  this.id = theLoai.id;
  this.tenTheLoai = theLoai.tenTheLoai;
  this.ghiChu = theLoai.ghiChu;
};

TheLoai.get = (id, callback) => {
  const sqlString = "SELECT * FROM theLoai WHERE id = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

TheLoai.getAll = (callback) => {
  const sqlString = "SELECT * FROM theLoai ";
  db.query(sqlString, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

TheLoai.insert = (theLoai, callBack) => {
  const sqlString = "INSERT INTO theLoai SET ?";
  db.query(sqlString, theLoai, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack({ id: res.insertId, ...theLoai });
  });
};

TheLoai.update = (theLoai, callBack) => {
  const sqlString =
    "UPDATE theLoai SET tenTheLoai = ?, ghiChu = ?  WHERE id = ?";
  db.query(
    sqlString,
    [theLoai.tenTheLoai, theLoai.ghiChu, theLoai.id],
    (err, res) => {
      if (err) {
        callBack(err);
        return;
      }
      callBack(theLoai);
    }
  );
};

TheLoai.delete = (id, callBack) => {
  db.query(`DELETE FROM theLoai WHERE id = ?`, id, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("xóa thành công!");
  });
};

TheLoai.statistics = (callBack) => {
  db.query(`SELECT * FROM toptheloai`, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack(res);
  });
};


module.exports = TheLoai;
