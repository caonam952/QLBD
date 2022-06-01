const db = require("../common/connect");

const BangDia = (bangDia) => {
  this.id = bangDia.id;
  this.hinhAnh = bangDia.hinhAnh;
  this.idTheLoai = bangDia.idTheLoai;
  this.tenBangDia = bangDia.tenBangDia;
  this.idNhaSX = bangDia.idNhaSX;
  this.tinhTrang = bangDia.tinhTrang;
  this.ngayTao = bangDia.ngayTao;
  this.ngaySua = bangDia.ngaySua;
  this.giaThue = bangDia.giaThue;
  this.ghiChu = bangDia.ghiChu;
};

BangDia.get = (id, callback) => {
  const sqlString = "SELECT * FROM bangDia WHERE id = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

BangDia.getAll = (callback) => {
  const sqlString = "SELECT * FROM bangDia ";
  db.query(sqlString, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(result);
  });
};

BangDia.insert = (bangDia, callBack) => {
  const sqlString = "INSERT INTO bangDia SET ?";
  db.query(sqlString, bangDia, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack({ id: res.insertId, ...bangDia });
  });
};

BangDia.update = (bangDia, callBack) => {
  const sqlString =
    "UPDATE bangDia SET hinhAnh = ?,tenBangDia = ?,idTheLoai = ?,  idNhaSX = ?, tinhTrang = ?, ngayTao = ?, ngaySua = ?,giaThue =?, ghiChu = ?  WHERE id = ?";
  db.query(
    sqlString,
    [
      bangDia.hinhAnh,
      bangDia.tenBangDia,
      bangDia.idTheLoai,
      bangDia.idNhaSX,
      bangDia.tinhTrang,
      bangDia.ngayTao,
      bangDia.ngaySua,
      bangDia.giaThue,
      bangDia.ghiChu,
      bangDia.id,
    ],
    (err, res) => {
      if (err) {
        callBack(err);
        return;
      }
      callBack(bangDia);
    }
  );
};

BangDia.delete = (id, callBack) => {
  db.query(`DELETE FROM bangDia WHERE id = ?`, id, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack("xóa thành công!");
  });
};

BangDia.statistics = (callBack) => {
  db.query(`SELECT * FROM luotthuebangdiafull`, (err, res) => {
    if (err) {
      callBack(err);
      return;
    }
    callBack(res);
  });
};

module.exports = BangDia;
