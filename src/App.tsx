import "./styles.css";
import React from "react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

let data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100
  }
];

let avgUv = 0,
  avgPv = 0;
for (let i = 0; i < data.length; i++) {
  avgUv += data[i].uv;
  avgPv += data[i].pv;
}
let stddevUv = 0,
  stddevPv = 0;
avgUv /= data.length;
avgPv /= data.length;
for (let i = 0; i < data.length; i++) {
  stddevUv += Math.pow(data[i].uv - avgUv, 2);
  stddevPv += Math.pow(data[i].pv - avgPv, 2);
}
stddevUv = Math.sqrt(stddevUv / data.length - 1);
stddevPv = Math.sqrt(stddevPv / data.length - 1);
console.log("AvgUv:", avgUv);
console.log("AvgPv:", avgPv);
console.log("stddevUv:", stddevUv);
console.log("stddevPv:", stddevPv);

let inttopUv = avgUv + stddevUv,
  intbotUv = avgUv - stddevUv,
  inttopPv = avgPv + stddevPv,
  intbotPv = avgPv - stddevPv;

console.log("inttopUv:", inttopUv, "intbotUv", intbotUv);
console.log("inttopPv:", inttopPv, "intbotPv", intbotPv);

const bottomUv = intbotUv;
const topUv = inttopUv;

const dataMaxUv = Math.max(...data.map((i) => i.uv));
const dataMinUv = Math.min(...data.map((i) => i.uv));
//диапозон UV
const frameUv = dataMaxUv - dataMinUv;

//диапазон от вверха до верхней границы UV
const topGradientUv = Math.abs(dataMaxUv - topUv) / frameUv;
//диапазон от нижней границы UV
const bottomGradientUv = 1 - Math.abs(bottomUv - dataMinUv) / frameUv;

const bottomPv = intbotPv;
const topPv = inttopPv;

const dataMaxPv = Math.max(...data.map((i) => i.pv));
const dataMinPv = Math.min(...data.map((i) => i.pv));
//диапозон PV
const framePv = dataMaxPv - dataMinPv;

//диапазон от вверха до верхней границы PV
const topGradientPv = Math.abs(dataMaxPv - topPv) / framePv;
//диапазон от нижней границы PV
const bottomGradientPv = 1 - Math.abs(bottomPv - dataMinPv) / framePv;

const CustomizedDot = (props) => {
  const { cx, cy, stroke, payload, value, dataKey } = props;

  if (
    (value > intbotUv && value < inttopUv && dataKey === "uv") ||
    (value > intbotPv && value < inttopPv && dataKey === "pv")
  ) {
    return (
      <svg
        x={cx - 3}
        y={cy - 3}
        width={6}
        height={6}
        fill="green"
        viewBox="0 0 1024 1024"
      >
        {" "}
        <path d="M517 1009.984c-274.912 0-497.76-222.848-497.76-497.76s222.848-497.76 497.76-497.76c274.912 0 497.76 222.848 497.76 497.76s-222.848 497.76-497.76 497.76zM340.768 295.936c-39.488 0-71.52" />
      </svg>
    );
  }

  return (
    <svg
      x={cx - 3}
      y={cy - 3}
      width={6}
      height={6}
      fill="red"
      viewBox="0 0 1024 1024"
    >
      <path d="M517.12 53.248q95.232 0 179.2 36.352t145.92 98.304 98.304 145.92 36.352 179.2-36.352 179.2-98.304 145.92-145.92 98.304-179.2 36.352-179.2-36.352-145.92-98.304-98.304-145.92-36.352-179.2  " />
    </svg>
  );
};

export default function App() {
  return (
    <LineChart
      width={500}
      height={400}
      data={data}
      margin={{
        top: 10,
        right: 30,
        left: 0,
        bottom: 0
      }}
    >
      <CartesianGrid strokeDasharray="1 1" />
      <XAxis dataKey="name" />
      <YAxis />
      <Legend />
      <Tooltip />
      <defs>
        <linearGradient id="splitColorUv" x1="0" y1="0" x2="0" y2="1">
          <stop offset={0} stopColor="red" />
          <stop offset={topGradientUv} stopColor="red" />
          <stop offset={topGradientUv} stopColor="green" />
          <stop offset={bottomGradientUv} stopColor="green" />
          <stop offset={bottomGradientUv} stopColor="red" />
        </linearGradient>
        <linearGradient id="splitColorPv" x1="0" y1="0" x2="0" y2="1">
          <stop offset={0} stopColor="red" />
          <stop offset={topGradientPv} stopColor="red" />
          <stop offset={topGradientPv} stopColor="green" />
          <stop offset={bottomGradientPv} stopColor="green" />
          <stop offset={bottomGradientPv} stopColor="red" />
        </linearGradient>
      </defs>
      <Line
        type="monotone"
        dataKey="uv"
        stroke="url(#splitColorUv)"
        fill="transparent"
        activeDot={<CustomizedDot />}
        dot={<CustomizedDot />}
      />
      <Line
        type="monotone"
        dataKey="pv"
        stroke="url(#splitColorPv)"
        fill="transparent"
        activeDot={<CustomizedDot />}
        dot={<CustomizedDot />}
      />
      {}{" "}
    </LineChart>
  );
}
