import { LogIn } from "../component/logIn";
import { ThongKePage } from "../page/thongKe.page";
import { BangDiaPage } from "../page/bangDia.page";
import { ThanhVienPage } from "../page/thanhvien.page";
import { PhieuThuePage } from "../page/phieuThue.page";
import { TheLoaiPage } from "../page/theLoai.page";
import { NhaSanXuatPage } from "../page/nhaSanXuat.page";
export const MyRouter = [
  {
    path: "/",
    component: ThongKePage,
  },
  {
    path: "/login",
    component: LogIn,
  },
  {
    path: "/bangDia",
    component: BangDiaPage,
  },
  {
    path: "/thanhvien",
    component: ThanhVienPage,
  },
  {
    path: "/phieuThue",
    component: PhieuThuePage,
  },
  {
    path: "/theLoai",
    component: TheLoaiPage,
  },
  {
    path: "/nhaSanXuat",
    component: NhaSanXuatPage,
  },
];
