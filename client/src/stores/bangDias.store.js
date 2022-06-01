import { makeAutoObservable } from "mobx";
import { API } from "../common/request";
import { getDateToday } from "../common/index";
class BangDiaStore {
  data = [];

  constructor(rootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  setData = (data) => {
    if (data) {
      this.data = Array.from(data).reverse();
    }
  };

  clearData = () => {
    this.data = [];
  };

  getData = async () => {
    let config = {
      headers: {
        "Content-Type": "application/json",
        authorization: window.sessionStorage.getItem("token"),
      },
    };
    await API.get("/bangDia", config)
      .then((result) => {
        this.setData(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  insertData = async (data) => {
    let bangDia = JSON.stringify({
      hinhAnh: data.hinhAnh,
      tenBangDia: data.tenBangDia,
      idTheLoai: parseInt(data.idTheLoai),
      idNhaSX: parseInt(data.idNhaSX),
      tinhTrang: data.tinhTrang,
      giaThue: data.giaThue,
      ghiChu: data.ghiChu,
    });
    let result = null;
    await API.post("/bangDia", bangDia)
      .then((data) => {
        result = data;
      })
      .catch((err) => {
        console.log(err);
      });
    return result;
  };

  deleteData = (id) => {
    let result = null;
    API.delete("/bangDia/" + id)
      .then((res) => {
        if (res.data.code === "ER_ROW_IS_REFERENCED_2") {
          alert("không thể xóa băng đĩa này");
        }
        result = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
    return result;
  };

  updateData = async (data) => {
    let bangDia = JSON.stringify({
      id: data.id,
      hinhAnh: data.hinhAnh,
      tenBangDia: data.tenBangDia,
      idTheLoai: parseInt(data.idTheLoai),
      idNhaSX: parseInt(data.idNhaSX),
      tinhTrang: data.tinhTrang,
      giaThue: data.giaThue,
      ngaySua: getDateToday(),
      ghiChu: data.ghiChu,
    });

    let result = null;
    await API.put("/bangDia", bangDia)
      .then((data) => {
        result = data;
      })
      .catch((err) => {
        console.log(err);
      });
    return result;
  };

  getStatistic = async () => {
    let config = {
      headers: {
        "Content-Type": "application/json",
        authorization: window.sessionStorage.getItem("token"),
      },
    };
    let result = null;
    await API.get("/bangDia/statistics", config)
      .then((res) => {
        result = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
    return result;
  };
}

export default BangDiaStore;
