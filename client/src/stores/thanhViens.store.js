import { makeAutoObservable } from "mobx";
import { API } from "../common/request";
import { getDateToday } from "../common/index";
class ThanhVienStore {
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
    await API.get("/thanhVien", config)
      .then((result) => {
        this.setData(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  insertData = async (data) => {
    let thanhVien = JSON.stringify({
      maTTV: data.maTTV,
      hoTen: data.hoTen,
      diaChi: data.diaChi,
      soCMT: data.soCMT,
      phanQuyen: data.phanQuyen,
      userName: data.userName,
      password: data.password,
    });
    let result = null;
    await API.post("/thanhVien", thanhVien)
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
    API.delete("/thanhVien/" + id)
      .then((res) => {
        if (res.data.code === "ER_ROW_IS_REFERENCED_2") {
          alert("không thể xóa thành viên này");
        }
        result = res;
      })
      .catch((err) => {
        console.log(err);
      });
    return result;
  };

  updateData = async (data) => {
    let thanhVien = JSON.stringify({
      id: data.id,
      hoTen: data.hoTen,
      maTTV: data.maTTV,
      diaChi: data.diaChi,
      soCMT: data.soCMT,
      ngaySua: getDateToday(),
      phanQuyen: data.phanQuyen,
      userName: data.userName,
      password: data.password,
    });
    let result = null;
    await API.put("/thanhVien", thanhVien)
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
    await API.get("/thanhVien/statistics",config)
      .then((res) => {
        result = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
    return result;
  };
}

export default ThanhVienStore;
