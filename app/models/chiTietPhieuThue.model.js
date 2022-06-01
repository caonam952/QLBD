const db = require("../common/connect");

const ChiTietPhieuThue = (chiTietphieuThue) => {
  this.id = chiTietphieuThue.id;
  this.idPhieuThue = chiTietphieuThue.idPhieuThue;
  this.idBangDia = chiTietphieuThue.idBangDia;
  this.soLuong = chiTietphieuThue.soLuong;
};

ChiTietPhieuThue.get = (id, callback) => {
  const sqlString = "SELECT * FROM chiTietphieuThue WHERE id = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

ChiTietPhieuThue.getAll = (callback) => {
  const sqlString = "SELECT * FROM chiTietphieuThue LIMIT 2 OFFSET 0 ";
  db.query(sqlString, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

ChiTietPhieuThue.insert = (chiTietphieuThue, callBack) => {
  const sqlString = "INSERT INTO chiTietphieuThue SET ?";
  db.query(sqlString, chiTietphieuThue, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack({ id: res.insertId, ...chiTietphieuThue });
  });
};

ChiTietPhieuThue.update = (chiTietphieuThue, callBack) => {
  const sqlString =
    "UPDATE chiTietphieuThue SET idPhieuThue = ?, idBangDia = ?, soLuong = ? WHERE id = ?";
  db.query(
    sqlString,
    [
      chiTietphieuThue.idPhieuThue,
      chiTietphieuThue.idBangDia,
      chiTietphieuThue.soLuong,
      chiTietphieuThue.id,
    ],
    (err, res) => {
      if (err) {
        callBack(err);
        return;
      }
      callBack(chiTietphieuThue);
    }
  );
};

ChiTietPhieuThue.delete = (id, callBack) => {
  db.query(`DELETE FROM chiTietphieuThue WHERE id = ?`, id, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("xóa thành công!");
  });
};

module.exports = ChiTietPhieuThue;
