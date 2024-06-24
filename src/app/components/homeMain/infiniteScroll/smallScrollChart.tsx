"use client";
// we need an array of objects
import React from "react";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from "recharts";

const SmallScrollChart: React.FC<{ chartData: any; isMarketUp7d: any }> = ({
  chartData,
  isMarketUp7d,
}) => {
  return (
    <div className="h-full w-2/3">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={100}
          height={100}
          data={chartData}
          margin={{
            top: 5,
            right: 0,
            left: 0,
            bottom: 5,
          }}
        >
          <YAxis hide={true} scale="log" domain={["auto", "auto"]} />
          <XAxis hide={true} />
          <Area
            type="monotone"
            dataKey="price"
            stroke={`${isMarketUp7d ? "#01F1E3" : "#FE2264"}`}
            fill={`${isMarketUp7d ? "#01F1E350" : "#FE226450"}`}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SmallScrollChart;
