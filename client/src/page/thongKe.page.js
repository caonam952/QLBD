import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { useStores } from "../stores";
import { TopTheLoai } from "../component/chart/topTheLoai";
import { DoanhThuTheoThang } from "../component/chart/doanhThu";
import { TopBangDia } from "../component/chart/topBangDia";
import { TopThanhVien } from "../component/chart/TopThanhVien";
import { Row, Col, Statistic } from "antd";
import "./style.css";

const tinhTong = (data) => {
  var sum = 0;
  var arr = [];
  arr = data;
  arr.forEach((e) => {
    sum += e.tongTien;
  });
  return sum;
};

export const ThongKePage = observer(() => {
  const { theLoaiStore, phieuThueStore, bangDiaStore, thanhVienStore } =
    useStores();
  const [topTheLoai, setTopTheLoai] = useState([]);
  const [doanhThu, setDoanhThu] = useState([]);
  const [topBangDia, setTopBangDia] = useState([]);
  const [topThanhVien, setTopThanhVien] = useState([]);
  const [tongDoanhThu, setTongDoanhThu] = useState(0);

  useEffect(() => {
    bangDiaStore.getData();
    phieuThueStore.getData();
    thanhVienStore.getData();
    theLoaiStore.getStatistic().then((data) => {
      setTopTheLoai(data);
      console.log(data);
    });
    phieuThueStore.getStatistic().then((data) => {
      setDoanhThu(data);
      setTongDoanhThu(tinhTong(data));
    });
    bangDiaStore.getStatistic().then((data) => {
      setTopBangDia(data);
    });
    thanhVienStore.getStatistic().then((data) => {
      setTopThanhVien(data);
    });
  }, []);

  return (
    <div className="powerbi-page site-layout-background">
      <Row className="row-quantity" justify="space-around">
        <Col span={5}>
          <Statistic
            className="sta tag1"
            title="SỐ LƯỢNG BĂNG ĐĨA"
            valueStyle={{ color: "#feffff" }}
            value={bangDiaStore.data ? bangDiaStore.data.length : 0}
          />
        </Col>
        <Col span={5}>
          <Statistic
            className="sta tag2"
            title="SỐ LƯỢNG THÀNH VIÊN"
            valueStyle={{ color: "#feffff" }}
            value={thanhVienStore.data ? thanhVienStore.data.length : 0}
          />
        </Col>
        <Col span={5}>
          <Statistic
            className="sta tag3"
            title="SỐ LƯỢT THUÊ BĂNG ĐĨA"
            valueStyle={{ color: "#feffff" }}
            value={phieuThueStore.data ? phieuThueStore.data.length : 0}
          />
        </Col>
        <Col span={5}>
          <Statistic
            className="sta tag4"
            title="TỔNG DOANH THU"
            valueStyle={{ color: "#feffff" }}
            value={tongDoanhThu}
            suffix="VND"
          />
        </Col>
      </Row>

      <Row
        className="row-chart"
        justify="space-around"
        align="middle"
        style={{ height: 500 }}
      >
        <Col span={11} className="col-chart">
          {topBangDia.length > 0 ? <TopBangDia data={topBangDia} /> : null}
        </Col>
        <Col span={11} className="col-chart">
          {doanhThu.length > 0 ? <DoanhThuTheoThang data={doanhThu} /> : null}
        </Col>
      </Row>
      <Row
        className="row-chart"
        justify="space-around"
        align="middle"
        style={{ height: 500 }}
      >
        <Col span={11} className="col-chart">
          {topTheLoai.length > 0 ? <TopTheLoai data={topTheLoai} /> : null}
        </Col>
        <Col span={11} className="col-chart">
          {topThanhVien.length > 0 ? (
            <TopThanhVien data={topThanhVien} />
          ) : null}
        </Col>
      </Row>
    </div>
  );
});
