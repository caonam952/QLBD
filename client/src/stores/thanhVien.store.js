import { makeAutoObservable } from "mobx";
//import { API } from '../common/request';
import axios from "axios";

class ThanhVien {
  userName = "";
  passW = "";
  token = window.sessionStorage.getItem("token");
  tokenFailed = false;

  constructor(rootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  refreshToken() {
    this.token = window.sessionStorage.getItem("token");
  }

  async logIn(userName, passW) {
    let data = JSON.stringify({
      userName: userName,
      passW: passW,
    });
    let config = {
      method: "POST",
      url: process.env.REACT_APP_BASE_URL + "/logIn",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    await axios(config)
      .then((response) => {
        console.log(response);
        if (response.data.token != null) {
          window.sessionStorage.setItem("token", response.data.token);
        } else {
          alert("sai tai khoan hoac mat khau");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("dang nhap that bai");
      });
  }
  LogOut() {
    window.sessionStorage.setItem("token", null);
    this.token = null;
  }
}

export default ThanhVien;
