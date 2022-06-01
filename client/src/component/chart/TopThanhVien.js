import React from "react";
import { Bar } from "@ant-design/plots";
import { Divider } from "antd";

export const TopThanhVien = ({ data: data }) => {
  const config = {
    data,
    xField: "luotThue",
    yField: "hoTen",
    seriesField: "luotThue",
    legend: {
      position: "top-left",
    },
  };
  return (
    <div>
      <Divider orientation="left">Top thành viên mua nhiều nhất</Divider>
      <Bar {...config} />
    </div>
  );
};
