// import React from "react";
// import { Treemap } from "@ant-design/plots";

// export const TopBangDia = ({ data: data }) => {
//   const _data = {
//     name: "root",
//     children: [data],
//   };
//   const config = {
//     _data,
//     colorField: "tenBangDia",
//   };
//   return <Treemap {...config} />;
// };

import React from "react";
import { WordCloud } from "@ant-design/plots";
import { Divider } from "antd";
export const TopBangDia = ({ data: data }) => {
  const config = {
    data,
    wordField: "tenBangDia",
    weightField: "luotThue",
    colorField: "tenBangDia",
    wordStyle: {
      fontFamily: "Verdana",
      fontSize: [8, 40],
      rotation: 0,
    },
    // 返回值设置成一个 [0, 1) 区间内的值，
    // 可以让每次渲染的位置相同（前提是每次的宽高一致）。
    random: () => 0.5,
  };
  return (
    <div>
      <Divider orientation="left">Top băng đĩa có lượt thuê nhiều nhất</Divider>
      <WordCloud {...config} />
    </div>
  );
};
