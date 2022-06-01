// import React from "react";
// import { WordCloud } from "@ant-design/plots";

// export const TopTheLoai = ({ data: data }) => {
//   const config = {
//     data,
//     wordField: "tenTheLoai",
//     weightField: "luotThue",
//     colorField: "tenTheLoai",
//     wordStyle: {
//       fontFamily: "Verdana",
//       fontSize: [8, 40],
//       rotation: 0,
//     },
//     // 返回值设置成一个 [0, 1) 区间内的值，
//     // 可以让每次渲染的位置相同（前提是每次的宽高一致）。
//     random: () => 0.5,
//   };
//   return <WordCloud {...config} />;
// };

import React from "react";
import { Bar } from "@ant-design/plots";
import { Divider } from "antd";

export const TopTheLoai = ({ data: data }) => {
  const config = {
    data,
    xField: "luotThue",
    yField: "tenTheLoai",
    seriesField: "luotThue",
    legend: {
      position: "top-left",
    },
  };
  return (
    <div>
      <Divider orientation="left">
        Top thể loại băng đĩa có lượt thuê nhiều nhất
      </Divider>
      <Bar {...config} />
    </div>
  );
};
