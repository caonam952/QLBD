import { makeAutoObservable } from "mobx";
import { API } from "../common/request";

class NhaSanXuatStore {
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
    await API.get("/nhaSX", config)
      .then((result) => {
        this.setData(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  insertData = async (data) => {
    let nhaSanXuat = JSON.stringify({
      tenNhaSX: data.tenNhaSX,
      diaChi: data.diaChi,
    });
    let config = {
      headers: {
        "Content-Type": "application/json",
        authorization: window.sessionStorage.getItem("token"),
      },
    };
    let result = null;
    await API.post("/nhaSX", nhaSanXuat, config)
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
    API.delete("/nhaSX/" + id)
      .then((res) => {
        if (res.data.code === "ER_ROW_IS_REFERENCED_2") {
          alert("không thể xóa nhà sản xuất này");
        }
        result = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
    return result;
  };
  updateData = async (data) => {
    let nhaSanXuat = JSON.stringify({
      id: data.id,
      tenNhaSX: data.tenNhaSX,
      diaChi: data.diaChi,
    });
    let result = null;
    await API.put("/nhaSX", nhaSanXuat)
      .then((data) => {
        result = data;
      })
      .catch((err) => {
        console.log(err);
      });
    return result;
  };
}

export default NhaSanXuatStore;
