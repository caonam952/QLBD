import { makeAutoObservable } from "mobx";
import { API } from "../common/request";

class TheLoaiStore {
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
    await API.get("/theLoai", config)
      .then((result) => {
        this.setData(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  insertData = async (data) => {
    let theLoai = JSON.stringify({
      tenTheLoai: data.tenTheLoai,
      ghiChu: data.ghiChu,
    });
    let result = null;
    await API.post("/theLoai", theLoai)
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
    API.delete("/theLoai/" + id)
      .then((res) => {
        if (res.data.code === "ER_ROW_IS_REFERENCED_2") {
          alert("không thể xóa thể loại này");
        }
        result = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
    return result;
  };

  updateData = async (data) => {
    let theLoai = JSON.stringify({
      id: data.id,
      tenTheLoai: data.tenTheLoai,
      ghiChu: data.ghiChu,
    });
    let result = null;
    await API.put("/theLoai", theLoai)
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
    await API.get("/theLoai/statistics",config)
      .then((res) => {
        result = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
    return result;
  };
}

export default TheLoaiStore;
