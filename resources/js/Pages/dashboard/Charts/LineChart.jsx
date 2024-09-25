import * as React from "react";

import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import { dataset, valueFormatter } from "../Data/wheather";

const chartSetting = {
  yAxis: [
    {
      label: "rainfall (mm)",
    },
  ],
  series: [{ dataKey: "seoul", label: "Seoul rainfall", valueFormatter }],
  height: 300,
  sx: {
    [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
      transform: "translateX(-10px)",
    },
  },
};

export default function LineChart() {
  return (
    <div style={{ width: "100%" }} className="line-chart _chart">
      <BarChart
        dataset={dataset}
        xAxis={[
          {
            scaleType: "band",
            dataKey: "month",
          },
        ]}
        {...chartSetting}
      />
    </div>
  );
}
