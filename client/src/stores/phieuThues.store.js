import { makeAutoObservable } from "mobx";
import { API } from "../common/request";
import { getDateToday, convertYMD } from "../common/index";
class PhieuThueStore {
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
    await API.get("/phieuThue", config)
      .then((result) => {
        this.setData(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  insertData = async (data) => {
    let phieuThue = JSON.stringify({
      ngayThue: convertYMD(data.ngayThue),
      ngayHenTra: convertYMD(data.ngayHenTra),
      idNguoiThue: parseInt(data.idNguoiThue),
    });
    let result = null;
    let config = {
      headers: {
        "Content-Type": "application/json",
        authorization: window.sessionStorage.getItem("token"),
      },
    };
    await API.post("/phieuThue", phieuThue, config)
      .then((res) => {
        result = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
    return result;
  };

  deleteData = async (id) => {
    let result = null;
    await API.delete("/phieuThue/" + id)
      .then((res) => {
        if (res.data.code === "ER_ROW_IS_REFERENCED_2") {
          alert("không thể xóa phiếu thuê này");
        }
        result = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
    return result;
  };

  updateData = async (data) => {
    let phieuThue = JSON.stringify({
      id: data.id,
      ngayThue: convertYMD(data.ngayThue),
      ngayHenTra: convertYMD(data.ngayHenTra),
      ngayTra: convertYMD(data.ngayTra),
      ngaySua: getDateToday(),
      idNguoiThue: data.idNguoiThue,
    });
    console.log(phieuThue);
    let result = null;
    await API.put("/phieuThue", phieuThue)
      .then((data) => {
        result = data;
      })
      .catch((err) => {
        console.log(err);
      });
    return result;
  };

  detailData = async (id) => {
    let chiTietPhieuThue = [];
    await API.get("/phieuThue/detail/" + id)
      .then((result) => {
        chiTietPhieuThue = result.data;
      })
      .catch((err) => {
        console.log(err);
      });
    return chiTietPhieuThue;
  };

  insertDetailData = async (data) => {
    let ctpt = JSON.stringify({
      idPhieuThue: data.idPhieuThue,
      idBangDia: data.idBangDia,
      soLuong: data.soLuong,
    });
    let result = null;
    await API.post("/chiTietPhieuThue", ctpt)
      .then((res) => {
        result = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
    return result;
  };

  updateDetailData = async (data) => {
    let ctpt = JSON.stringify({
      id: data.id,
      idPhieuThue: data.idPhieuThue,
      idBangDia: data.idBangDia,
      soLuong: data.soLuong,
    });
    let result = null;
    await API.put("/chiTietPhieuThue", ctpt)
      .then((data) => {
        result = data;
      })
      .catch((err) => {
        console.log(err);
      });
    return result;
  };

  deleteDetailData = async (id) => {
    let result = null;
    await API.delete("/chiTietPhieuThue/" + id)
      .then((res) => {
        result = res.data;
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
    await API.get("/phieuThue/statistics", config)
      .then((res) => {
        result = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
    return result;
  };
}

export default PhieuThueStore;
