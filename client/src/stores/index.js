import React from "react";
import NhaSanXuatStore from "./nhaSanXuats.store";
import ThanhVien from './thanhVien.store';
import ThanhVienStore from "./thanhViens.store";
import PhieuThueStore from "./phieuThues.store";
import TheLoaiStore from "./theLoais.store";
import BangDiaStore from "./bangDias.store";
class RootStore {
    constructor(){
        this.thanhVien = new ThanhVien(this);
        this.thanhVienStore = new ThanhVienStore(this);
        this.nhaSanXuatStore = new NhaSanXuatStore(this);
        this.phieuThueStore = new PhieuThueStore(this); 
        this.theLoaiStore = new TheLoaiStore(this); 
        this.bangDiaStore = new BangDiaStore(this);
    }
}

const StoresContext = React.createContext(new RootStore());

// this will be the function available for the app to connect to the stores
export const useStores = () => React.useContext(StoresContext);
